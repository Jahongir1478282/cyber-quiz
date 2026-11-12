import crypto from "node:crypto";

const VERSION = "v1";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DEV_FALLBACK_SECRET = "kiber-quiz-dev-secret";

function resolveSecret() {
  if (process.env.ATTEMPT_SECRET) return process.env.ATTEMPT_SECRET;
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV !== "production") return DEV_FALLBACK_SECRET;
  return "";
}

export function attemptTokenConfigError() {
  return resolveSecret()
    ? null
    : "Stateless rejim uchun ATTEMPT_SECRET (yoki ADMIN_PASSWORD) kerak. Environment Variables ga qo'shing.";
}

function sign(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function parsePayload(payloadPart) {
  try {
    const raw = Buffer.from(payloadPart, "base64url").toString("utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isValidAttemptPayload(payload) {
  if (!payload || typeof payload !== "object") return false;
  if (!UUID_RE.test(payload.id || "")) return false;
  if (typeof payload.name !== "string" || !payload.name.trim()) return false;
  if (typeof payload.nameKey !== "string" || !payload.nameKey.trim()) return false;
  if (!Number.isFinite(payload.startedAt) || payload.startedAt <= 0) return false;
  if (!Number.isFinite(payload.expiresAt) || payload.expiresAt <= 0) return false;
  if (!Array.isArray(payload.items) || payload.items.length === 0) return false;
  return payload.items.every(
    (item) =>
      item &&
      Number.isInteger(item.qi) &&
      Array.isArray(item.perm) &&
      item.perm.length > 0 &&
      item.perm.every((k) => Number.isInteger(k) && k >= 0)
  );
}

export function createAttemptToken(attempt, ttlSec) {
  const secret = resolveSecret();
  if (!secret) throw new Error("ATTEMPT_SECRET is missing");

  const expiresAt = Date.now() + Math.max(1, Math.round(ttlSec || 0)) * 1000;
  const payload = {
    v: 1,
    id: attempt.id,
    name: attempt.name,
    nameKey: attempt.nameKey,
    items: attempt.items,
    startedAt: attempt.startedAt,
    expiresAt,
  };
  const payloadPart = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = sign(payloadPart, secret);
  return `${VERSION}.${payloadPart}.${signature}`;
}

export function readAttemptToken(token) {
  const secret = resolveSecret();
  if (!secret || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== VERSION) return null;

  const payloadPart = parts[1];
  const signature = parts[2];
  const expectedSignature = sign(payloadPart, secret);
  if (!safeEqual(signature, expectedSignature)) return null;

  const payload = parsePayload(payloadPart);
  if (!isValidAttemptPayload(payload)) return null;
  if (payload.expiresAt < Date.now()) return null;

  return {
    id: payload.id,
    name: payload.name,
    nameKey: payload.nameKey,
    items: payload.items,
    startedAt: payload.startedAt,
  };
}
