import { publicQuestions } from "@/lib/quiz";
import { getAttempt } from "@/lib/store";
import { TIME_LIMIT_SEC } from "@/lib/config";
import { json, fail } from "@/lib/http";

export const dynamic = "force-dynamic";

// Boshlangan test savollarini qaytaradi (to'g'ri javoblarsiz)
export async function GET(_request, { params }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id || "")) return fail("Test topilmadi.", 404);

  const attempt = await getAttempt(id);
  if (!attempt) return fail("Test topilmadi yoki allaqachon topshirilgan.", 404);

  return json({
    name: attempt.name,
    startedAt: attempt.startedAt,
    timeLimitSec: TIME_LIMIT_SEC,
    serverNow: Date.now(),
    questions: publicQuestions(attempt),
  });
}
