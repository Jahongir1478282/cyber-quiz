import crypto from "node:crypto";
import { QUESTIONS } from "@/data/questions";
import { gradeOf } from "@/lib/config";

// Ism-familiyani bir xil ko'rinishga keltirish: ortiqcha bo'shliqlar olib tashlanadi
export function normalizeName(value) {
  return String(value ?? "")
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .trim();
}

// Takroriy ismni aniqlash uchun kalit: katta-kichik harf va apostrof turlari farqlanmaydi
export function nameKey(value) {
  return normalizeName(value)
    .toLowerCase()
    .replace(/[‘’ʻʼ`´]/g, "'");
}

export function validateName(value) {
  const name = normalizeName(value);
  if (name.length < 5 || name.length > 60) {
    return "Ism-familiya 5 dan 60 gacha belgidan iborat bo'lishi kerak.";
  }
  if (name.split(" ").length < 2) {
    return "Ism va familiyani to'liq yozing (masalan: Aliyev Vali).";
  }
  if (!/^[\p{L}\p{M}'‘’ʻʼ`´. -]+$/u.test(name)) {
    return "Ism-familiyada faqat harflar, bo'shliq, apostrof va chiziqcha bo'lishi mumkin.";
  }
  return null;
}

// Kriptografik tasodifiy aralashtirish (Fisher–Yates)
function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Yangi urinish: tasodifiy savollar va har bir savol uchun variantlarning aralashtirilgan tartibi
export function buildAttempt(name, count) {
  const indexes = shuffle(QUESTIONS.map((_, i) => i)).slice(0, Math.min(count, QUESTIONS.length));
  return {
    id: crypto.randomUUID(),
    name: normalizeName(name),
    nameKey: nameKey(name),
    items: indexes.map((qi) => ({ qi, perm: shuffle(QUESTIONS[qi].options.map((_, k) => k)) })),
    startedAt: Date.now(),
  };
}

// Brauzerga yuboriladigan savollar: to'g'ri javob ko'rsatilmaydi
export function publicQuestions(attempt) {
  return attempt.items.map(({ qi, perm }, n) => ({
    n,
    topic: QUESTIONS[qi].topic,
    text: QUESTIONS[qi].q,
    options: perm.map((k) => QUESTIONS[qi].options[k]),
  }));
}

// Baholash faqat serverda: talaba tanlagan variant raqami asl tartibga qaytarilib tekshiriladi
export function grade(attempt, answers) {
  let correct = 0;
  attempt.items.forEach(({ qi, perm }, n) => {
    const chosen = Array.isArray(answers) ? answers[n] : null;
    if (Number.isInteger(chosen) && chosen >= 0 && chosen < perm.length && perm[chosen] === QUESTIONS[qi].a) {
      correct++;
    }
  });
  return correct;
}

export function makeResult(attempt, correct, durationSec, late) {
  const total = attempt.items.length;
  const percent = total ? Math.round((correct * 100) / total) : 0;
  return {
    id: attempt.id,
    name: attempt.name,
    nameKey: attempt.nameKey,
    correct,
    total,
    percent,
    grade: gradeOf(percent),
    durationSec,
    late,
    finishedAt: Date.now(),
  };
}

// Natijani tashqariga berishda ichki maydonlar olib tashlanadi
export function publicResult(r) {
  return {
    id: r.id,
    name: r.name,
    correct: r.correct,
    total: r.total,
    percent: r.percent,
    grade: r.grade,
    durationSec: r.durationSec,
    late: !!r.late,
    finishedAt: r.finishedAt,
  };
}

// Reyting tartibi: ko'proq to'g'ri javob, keyin tezroq ishlagan, keyin oldinroq topshirgan
export function sortResults(list) {
  return list.slice().sort(
    (a, b) => b.percent - a.percent || b.correct - a.correct || a.durationSec - b.durationSec || a.finishedAt - b.finishedAt
  );
}
