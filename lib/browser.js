// Brauzer xotirasi bilan ishlash (faqat qulaylik uchun: xatolik bo'lsa jimgina o'tkazib yuboriladi)

export const ACTIVE_KEY = "kiberquiz-active"; // boshlangan, hali topshirilmagan test
export const MINE_KEY = "kiberquiz-mine"; // shu brauzerdan topshirilgan natija
export const answersKey = (id) => `kiberquiz-answers-${id}`;

export function readStore(kind, key) {
  try {
    const raw = window[kind].getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeStore(kind, key, value) {
  try {
    if (value === null || value === undefined) window[kind].removeItem(key);
    else window[kind].setItem(key, JSON.stringify(value));
  } catch {
    /* brauzer xotirasi yopiq bo'lsa, e'tibor bermaymiz */
  }
}

export function formatDuration(sec) {
  const s = Math.max(0, Math.round(sec || 0));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export function formatClock(ms) {
  const d = new Date(ms);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
