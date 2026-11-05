import { Redis } from "@upstash/redis";

// Ma'lumotlarni saqlash.
// Vercel'da: Upstash Redis (Storage bo'limidan ulanadi, kalitlar avtomatik qo'shiladi).
// Kompyuterda sinashda: kalitlar bo'lmasa, vaqtincha xotira ishlatiladi (server qayta ishga tushsa o'chadi).

const PREFIX = process.env.QUIZ_KEY_PREFIX || "kiberquiz:";
const KEYS = {
  results: PREFIX + "results",
  names: PREFIX + "names",
  closed: PREFIX + "closed",
  attempt: (id) => PREFIX + "attempt:" + id,
};

function createRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token, automaticDeserialization: false });
}

const redis = createRedis();
export const storageKind = redis ? "redis" : "memory";

const mem =
  globalThis.__kiberQuizMemory ||
  (globalThis.__kiberQuizMemory = { attempts: new Map(), results: [], names: new Set(), closed: false });

function parse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// ---- Urinishlar (boshlangan, hali topshirilmagan testlar) ----

export async function saveAttempt(attempt, ttlSec) {
  const value = JSON.stringify(attempt);
  if (redis) {
    await redis.set(KEYS.attempt(attempt.id), value, { ex: ttlSec });
  } else {
    mem.attempts.set(attempt.id, { value, expiresAt: Date.now() + ttlSec * 1000 });
  }
}

export async function getAttempt(id) {
  if (redis) {
    const value = await redis.get(KEYS.attempt(id));
    return value ? parse(value) : null;
  }
  const entry = mem.attempts.get(id);
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    mem.attempts.delete(id);
    return null;
  }
  return parse(entry.value);
}

// Urinishni bir martalik qilib "yopadi": ikkinchi marta topshirib bo'lmaydi
export async function consumeAttempt(id) {
  if (redis) {
    const removed = await redis.del(KEYS.attempt(id));
    return removed === 1;
  }
  return mem.attempts.delete(id);
}

// ---- Natijalar ----

export async function isNameTaken(key) {
  if (redis) return (await redis.sismember(KEYS.names, key)) === 1;
  return mem.names.has(key);
}

// Bitta ism-familiya bilan faqat bitta natija saqlanadi
export async function addResult(result) {
  const value = JSON.stringify(result);
  if (redis) {
    const added = await redis.sadd(KEYS.names, result.nameKey);
    if (added !== 1) return false;
    await redis.lpush(KEYS.results, value);
    return true;
  }
  if (mem.names.has(result.nameKey)) return false;
  mem.names.add(result.nameKey);
  mem.results.unshift(value);
  return true;
}

async function rawResults() {
  if (redis) return (await redis.lrange(KEYS.results, 0, -1)) || [];
  return mem.results.slice();
}

export async function listResults() {
  return (await rawResults()).map(parse).filter(Boolean);
}

export async function deleteResult(id) {
  for (const value of await rawResults()) {
    const r = parse(value);
    if (!r || r.id !== id) continue;
    if (redis) {
      await redis.lrem(KEYS.results, 0, value);
      await redis.srem(KEYS.names, r.nameKey);
    } else {
      mem.results = mem.results.filter((x) => x !== value);
      mem.names.delete(r.nameKey);
    }
    return true;
  }
  return false;
}

export async function clearResults() {
  if (redis) {
    await redis.del(KEYS.results, KEYS.names);
  } else {
    mem.results = [];
    mem.names = new Set();
  }
}

// ---- Testni ochish / yopish ----

export async function isClosed() {
  if (redis) return (await redis.get(KEYS.closed)) === "1";
  return mem.closed;
}

export async function setClosed(closed) {
  if (redis) {
    if (closed) await redis.set(KEYS.closed, "1");
    else await redis.del(KEYS.closed);
  } else {
    mem.closed = closed;
  }
}
