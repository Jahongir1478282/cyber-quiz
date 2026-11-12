import crypto from "node:crypto";
import { setClosed, clearResults, deleteResult, storageKind } from "@/lib/store";
import { json, fail, readJson } from "@/lib/http";

export const dynamic = "force-dynamic";

// Parolni vaqt bo'yicha teng solishtirish (timing attack'dan himoya)
function checkPassword(password) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return "disabled";
  const a = crypto.createHash("sha256").update(String(password ?? "")).digest();
  const b = crypto.createHash("sha256").update(real).digest();
  return crypto.timingSafeEqual(a, b) ? "ok" : "bad";
}

// O'qituvchi amallari: check | open | close | reset | delete
export async function POST(request) {
  if (storageKind === "redis-required") {
    return fail("Live rejim uchun Upstash Redis ulanmagan.", 503);
  }

  if (storageKind === "stateless") {
    return fail("O'qituvchi paneli stateless rejimda o'chiriladi. Bu funksiyalar uchun Upstash Redis kerak.", 503);
  }

  const body = await readJson(request);
  const status = checkPassword(body?.password);

  if (status === "disabled") {
    return fail("O'qituvchi paneli o'chirilgan: Vercel'da ADMIN_PASSWORD o'zgaruvchisini kiriting.", 503);
  }
  if (status === "bad") {
    // Parolni tanlab ko'rishni sekinlashtirish
    await new Promise((r) => setTimeout(r, 800));
    return fail("Parol noto'g'ri.", 401);
  }

  switch (body?.action) {
    case "check":
      return json({ ok: true });
    case "open":
      await setClosed(false);
      return json({ ok: true, closed: false });
    case "close":
      await setClosed(true);
      return json({ ok: true, closed: true });
    case "reset":
      await clearResults();
      return json({ ok: true });
    case "delete": {
      if (typeof body.id !== "string") return fail("Natija ko'rsatilmagan.", 400);
      const removed = await deleteResult(body.id);
      return removed ? json({ ok: true }) : fail("Natija topilmadi.", 404);
    }
    default:
      return fail("Noma'lum amal.", 400);
  }
}
