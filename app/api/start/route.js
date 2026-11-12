import { buildAttempt, validateName } from "@/lib/quiz";
import { saveAttempt, isNameTaken, isClosed, reserveName, storageKind } from "@/lib/store";
import { QUESTION_COUNT, TIME_LIMIT_SEC, GRACE_SEC } from "@/lib/config";
import { attemptTokenConfigError, createAttemptToken } from "@/lib/attemptToken";
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

  if (storageKind === "redis-required") {
    return fail("Live rejim uchun Upstash Redis ulanmagan. Vercel'da Storage -> Upstash Redis ulang.", 503);
  }

  const attempt = buildAttempt(body.name, QUESTION_COUNT);

  // Redis bo'lmasa stateless rejim: urinish tokeni imzolanadi, serverda saqlanmaydi
  if (storageKind === "stateless") {
    const configError = attemptTokenConfigError();
    if (configError) return fail(configError, 503);

    const ttlSec = TIME_LIMIT_SEC + GRACE_SEC + 600;
    const attemptId = createAttemptToken(attempt, ttlSec);
    return json({ attemptId, storage: storageKind });
  }

  if (await isNameTaken(attempt.nameKey)) {
    return fail("Bu ism-familiya bilan test allaqachon topshirilgan yoki boshlangan.", 409);
  }

  // Urinish test vaqtidan biroz ko'proq saqlanadi, keyin avtomatik o'chadi
  const ttlSec = TIME_LIMIT_SEC + GRACE_SEC + 600;

  if (!(await reserveName(attempt.nameKey, ttlSec))) {
    return fail("Bu ism-familiya bilan test allaqachon boshlangan yoki topshirilgan.", 409);
  }

  await saveAttempt(attempt, ttlSec);
  return json({ attemptId: attempt.id });
}
