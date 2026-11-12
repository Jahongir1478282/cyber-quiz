import { Redis } from "@upstash/redis";

// Ma'lumotlarni saqlash.
// Vercel'da: Upstash Redis (Storage bo'limidan ulanadi, kalitlar avtomatik qo'shiladi).
// Redis bo'lmasa: default holatda stateless rejim ishlaydi.
// Faqat lokal diagnostika uchun QUIZ_STORAGE_MODE=memory qo'yilsa, xotira fallback yoqiladi.

const PREFIX = process.env.QUIZ_KEY_PREFIX || "kiberquiz:";
const KEYS = {
  results: PREFIX + "results",
  names: PREFIX + "names",
  closed: PREFIX + "closed",
  activeNames: PREFIX + "active-names",
  activeName: (nameKey) => PREFIX + "active-name:" + encodeURIComponent(nameKey),
  attempt: (id) => PREFIX + "attempt:" + id,
};

function createRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token, automaticDeserialization: false });
}

const redis = createRedis();
const STORAGE_MODE = String(process.env.QUIZ_STORAGE_MODE || "").toLowerCase();
const useMemoryFallback = STORAGE_MODE === "memory";
const forceRedis = process.env.QUIZ_FORCE_REDIS === "1";

export const storageKind = redis ? "redis" : forceRedis ? "redis-required" : useMemoryFallback ? "memory" : "stateless";
const useMemory = storageKind === "memory";

const mem =
  globalThis.__kiberQuizMemory ||
  (globalThis.__kiberQuizMemory = {
    attempts: new Map(),
    results: [],
    names: new Set(),
    activeNames: new Map(),
    closed: false,
  });

function parse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function isMemNameActive(nameKey) {
  const expiresAt = mem.activeNames.get(nameKey);
  if (!expiresAt) return false;
  if (expiresAt < Date.now()) {
    mem.activeNames.delete(nameKey);
    return false;
  }
  return true;
}

function reserveMemName(nameKey, ttlSec) {
  if (mem.names.has(nameKey) || isMemNameActive(nameKey)) return false;
  mem.activeNames.set(nameKey, Date.now() + ttlSec * 1000);
  return true;
}

// ---- Urinishlar (boshlangan, hali topshirilmagan testlar) ----

export async function saveAttempt(attempt, ttlSec) {
  const value = JSON.stringify(attempt);
  if (redis) {
    await redis.set(KEYS.attempt(attempt.id), value, { ex: ttlSec });
  } else if (useMemory) {
    mem.attempts.set(attempt.id, { value, expiresAt: Date.now() + ttlSec * 1000 });
  }
}

export async function getAttempt(id) {
  if (redis) {
    const value = await redis.get(KEYS.attempt(id));
    return value ? parse(value) : null;
  }

  if (!useMemory) return null;

  const entry = mem.attempts.get(id);
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    mem.attempts.delete(id);
    const staleAttempt = parse(entry.value);
    if (staleAttempt?.nameKey) mem.activeNames.delete(staleAttempt.nameKey);
    return null;
  }
  return parse(entry.value);
}

// Urinishni bir martalik qilib "yopadi": ikkinchi marta topshirib bo'lmaydi
export async function consumeAttempt(id, nameKey) {
  if (redis) {
    const removed = await redis.del(KEYS.attempt(id));
    if (removed === 1 && nameKey) {
      await redis.del(KEYS.activeName(nameKey));
      await redis.srem(KEYS.activeNames, nameKey);
    }
    return removed === 1;
  }

  if (!useMemory) return false;

  const removed = mem.attempts.delete(id);
  if (removed && nameKey) mem.activeNames.delete(nameKey);
  return removed;
}

// Ism-familiyani aktiv urinish uchun band qilish (parallel dublikatlarni oldini oladi)
export async function reserveName(nameKey, ttlSec) {
  if (redis) {
    const lockKey = KEYS.activeName(nameKey);
    const locked = await redis.set(lockKey, "1", { ex: ttlSec, nx: true });
    if (locked !== "OK") return false;

    await redis.sadd(KEYS.activeNames, nameKey);
    const alreadySubmitted = (await redis.sismember(KEYS.names, nameKey)) === 1;
    if (alreadySubmitted) {
      await redis.del(lockKey);
      await redis.srem(KEYS.activeNames, nameKey);
      return false;
    }
    return true;
  }

  if (!useMemory) return true;

  return reserveMemName(nameKey, ttlSec);
}

// ---- Natijalar ----

export async function isNameTaken(nameKey) {
  if (redis) {
    const [submitted, active] = await Promise.all([redis.sismember(KEYS.names, nameKey), redis.get(KEYS.activeName(nameKey))]);
    return submitted === 1 || active === "1";
  }

  if (!useMemory) return false;

  return mem.names.has(nameKey) || isMemNameActive(nameKey);
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

  if (!useMemory) return false;

  if (mem.names.has(result.nameKey)) return false;
  mem.names.add(result.nameKey);
  mem.results.unshift(value);
  return true;
}

async function rawResults() {
  if (redis) return (await redis.lrange(KEYS.results, 0, -1)) || [];
  if (!useMemory) return [];
  return mem.results.slice();
}

export async function listResults() {
  return (await rawResults()).map(parse).filter(Boolean);
}

export async function deleteResult(id) {
  if (!redis && !useMemory) return false;

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
    const activeNameKeys = (await redis.smembers(KEYS.activeNames)) || [];
    const keysToDelete = [KEYS.results, KEYS.names, KEYS.activeNames, ...activeNameKeys.map(KEYS.activeName)];
    await redis.del(...keysToDelete);
  } else if (useMemory) {
    mem.results = [];
    mem.names = new Set();
    mem.activeNames = new Map();
    mem.attempts = new Map();
  }
}

// ---- Testni ochish / yopish ----

export async function isClosed() {
  if (redis) return (await redis.get(KEYS.closed)) === "1";
  if (!useMemory) return false;
  return mem.closed;
}

export async function setClosed(closed) {
  if (redis) {
    if (closed) await redis.set(KEYS.closed, "1");
    else await redis.del(KEYS.closed);
  } else if (useMemory) {
    mem.closed = closed;
  }
}
