import { buildAttempt, validateName } from "@/lib/quiz";
import { saveAttempt, isNameTaken, isClosed } from "@/lib/store";
import { QUESTION_COUNT, TIME_LIMIT_SEC, GRACE_SEC } from "@/lib/config";
import { json, fail, readJson } from "@/lib/http";

export const dynamic = "force-dynamic";

// Testni boshlash: ism tekshiriladi, tasodifiy savollar bilan yangi urinish yaratiladi
export async function POST(request) {
  const body = await readJson(request);
  const error = validateName(body?.name);
  if (error) return fail(error, 400);

  if (await isClosed()) {
    return fail("Test hozircha yopiq. O'qituvchining ko'rsatmasini kuting.", 403);
  }

  const attempt = buildAttempt(body.name, QUESTION_COUNT);
  if (await isNameTaken(attempt.nameKey)) {
    return fail("Bu ism-familiya bilan test allaqachon topshirilgan.", 409);
  }

  // Urinish test vaqtidan biroz ko'proq saqlanadi, keyin avtomatik o'chadi
  await saveAttempt(attempt, TIME_LIMIT_SEC + GRACE_SEC + 600);
  return json({ attemptId: attempt.id });
}
