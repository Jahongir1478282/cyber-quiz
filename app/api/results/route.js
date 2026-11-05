import { listResults, isClosed, storageKind } from "@/lib/store";
import { sortResults, publicResult } from "@/lib/quiz";
import { json } from "@/lib/http";

export const dynamic = "force-dynamic";

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatDate(ms) {
  // Toshkent vaqti (UTC+5)
  const d = new Date(ms + 5 * 3600 * 1000);
  return `${pad(d.getUTCDate())}.${pad(d.getUTCMonth() + 1)}.${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
}

function csvCell(value) {
  let s = String(value ?? "");
  // CSV formula injection'dan himoya: = + - @ bilan boshlangan qiymat matn sifatida saqlanadi
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
}

// Barcha natijalar (reyting tartibida). ?format=csv — Excel uchun fayl
export async function GET(request) {
  const results = sortResults((await listResults()).map(publicResult));
  const format = new URL(request.url).searchParams.get("format");

  if (format === "csv") {
    const header = ["No", "Ism-familiya", "To'g'ri javoblar", "Jami savollar", "Foiz", "Baho", "Sarflangan vaqt (soniya)", "Kech topshirgan", "Topshirilgan vaqt"];
    const rows = results.map((r, i) => [
      i + 1,
      r.name,
      r.correct,
      r.total,
      r.percent,
      r.grade,
      r.durationSec,
      r.late ? "ha" : "yo'q",
      formatDate(r.finishedAt),
    ]);
    const csv = "﻿" + [header, ...rows].map((row) => row.map(csvCell).join(";")).join("\r\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="kiber-quiz-natijalar.csv"',
        "Cache-Control": "no-store",
      },
    });
  }

  return json({ results, closed: await isClosed(), storage: storageKind, serverNow: Date.now() });
}
