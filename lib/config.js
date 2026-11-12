// Test sozlamalari. Raqamli qiymatlarni Vercel'dagi Environment Variables orqali o'zgartirish mumkin.

export const QUIZ_TITLE = "Kiberxavfsizlik testi";
export const QUIZ_SUBTITLE = "Kiberxavfsizlik asoslari fanidan nazorat testi";

function intFromEnv(value, fallback, min, max) {
  const n = parseInt(value ?? "", 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

// Har bir talabaga beriladigan savollar soni
export const QUESTION_COUNT = intFromEnv(process.env.QUIZ_QUESTION_COUNT, 80, 1, 200);

// Test vaqti (soniyada)
export const TIME_LIMIT_SEC = intFromEnv(process.env.QUIZ_TIME_MINUTES, 20, 1, 240) * 60;

// Internet sekinligi uchun qo'shimcha vaqt (soniya). Bundan kech topshirilsa, natija "kech" deb belgilanadi.
export const GRACE_SEC = 60;

// Foizdan baho: O'zbekiston OTMlarida qo'llanadigan 5 ballik shkala
export function gradeOf(percent) {
  if (percent >= 86) return 5;
  if (percent >= 71) return 4;
  if (percent >= 56) return 3;
  return 2;
}
