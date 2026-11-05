import { grade, makeResult, publicResult } from "@/lib/quiz";
import { getAttempt, consumeAttempt, addResult } from "@/lib/store";
import { TIME_LIMIT_SEC, GRACE_SEC } from "@/lib/config";
import { json, fail, readJson } from "@/lib/http";

export const dynamic = "force-dynamic";

// Javoblarni qabul qilish va serverda baholash
export async function POST(request) {
  const body = await readJson(request);
  const id = body?.attemptId;
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) return fail("Test topilmadi.", 404);

  const attempt = await getAttempt(id);
  if (!attempt) return fail("Test topilmadi yoki allaqachon topshirilgan.", 404);

  // Bir urinishni faqat bir marta topshirish mumkin
  if (!(await consumeAttempt(id))) return fail("Bu test allaqachon topshirilgan.", 409);

  const answers = Array.isArray(body.answers) ? body.answers.slice(0, attempt.items.length) : [];
  const elapsedSec = Math.max(0, Math.round((Date.now() - attempt.startedAt) / 1000));
  const late = elapsedSec > TIME_LIMIT_SEC + GRACE_SEC;
  const result = makeResult(attempt, grade(attempt, answers), Math.min(elapsedSec, TIME_LIMIT_SEC + GRACE_SEC), late);

  if (!(await addResult(result))) {
    return fail("Bu ism-familiya bilan natija allaqachon mavjud.", 409);
  }
  return json({ result: publicResult(result) });
}
