"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ACTIVE_KEY, MINE_KEY, readStore, writeStore, formatDuration, formatClock } from "@/lib/browser";

const REFRESH_MS = 5000;

export default function HomeClient({ title, subtitle, count, minutes }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [updatedAt, setUpdatedAt] = useState(null);

  const [mineId, setMineId] = useState(null);
  const [active, setActive] = useState(null);

  const [adminPw, setAdminPw] = useState("");
  const [adminOk, setAdminOk] = useState(false);
  const [adminBusy, setAdminBusy] = useState(false);
  const [adminMsg, setAdminMsg] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    setMineId(readStore("localStorage", MINE_KEY)?.id || null);
    setActive(readStore("sessionStorage", ACTIVE_KEY));
  }, []);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/results", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setData(await res.json());
      setLoadError("");
      setUpdatedAt(Date.now());
    } catch {
      setLoadError("Natijalarni yangilab bo'lmadi. Internet aloqasini tekshiring.");
    }
  }, []);

  // Har 5 soniyada yangilanadi; sahifa yashirin bo'lsa (boshqa oynada) so'rov yuborilmaydi
  useEffect(() => {
    load();
    const timer = setInterval(() => {
      if (!document.hidden) load();
    }, REFRESH_MS);
    const onVisible = () => {
      if (!document.hidden) load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);

  async function startQuiz(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || "Testni boshlab bo'lmadi.");
        setBusy(false);
        return;
      }
      writeStore("sessionStorage", ACTIVE_KEY, { id: body.attemptId, name: name.trim() });
      router.push(`/quiz/${body.attemptId}`);
    } catch {
      setError("Server bilan aloqa yo'q. Qayta urinib ko'ring.");
      setBusy(false);
    }
  }

  async function adminCall(action, extra = {}) {
    setAdminBusy(true);
    setAdminMsg("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPw, action, ...extra }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401) setAdminOk(false);
        setAdminMsg(body.error || "Amal bajarilmadi.");
        return false;
      }
      setAdminOk(true);
      setConfirmReset(false);
      setPendingDelete(null);
      if (action !== "check") setAdminMsg("Bajarildi.");
      await load();
      return true;
    } catch {
      setAdminMsg("Server bilan aloqa yo'q.");
      return false;
    } finally {
      setAdminBusy(false);
    }
  }

  function adminLogout() {
    setAdminOk(false);
    setAdminPw("");
    setAdminMsg("");
    setConfirmReset(false);
    setPendingDelete(null);
  }

  const results = data?.results || [];
  const isStateless = data?.storage === "stateless";
  const isRedisRequired = data?.storage === "redis-required";
  const showAdminPanel = !isStateless && !isRedisRequired;
  const closed = !!data?.closed;
  const total = results.length;
  const avg = total ? Math.round(results.reduce((s, r) => s + r.percent, 0) / total) : 0;
  const passed = results.filter((r) => r.grade >= 3).length;
  const best = total ? results[0] : null;

  return (
    <main className="page">
      <header className="top">
        <div className="brand">
          <span className="logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="m8.5 12 2.5 2.5 4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <h1>{title}</h1>
            <p className="muted">{subtitle}</p>
          </div>
        </div>
        <div className={`live ${loadError ? "off" : ""}`}>
          <span className="dot" aria-hidden="true" />
          {loadError ? "Aloqa uzildi" : "Natijalar jonli yangilanmoqda"}
        </div>
      </header>

      {data?.storage === "memory" && (
        <p className="banner warn">
          Lokal sinov rejimi: ma'lumotlar bazasi ulanmagan, natijalar server qayta ishga tushganda o'chib ketadi.
          Vercel'da Upstash Redis'ni ulang (README faylida ko'rsatilgan).
        </p>
      )}
      {isStateless && (
        <p className="banner info">
          Stateless rejim yoqilgan: test ishlaydi, lekin umumiy natijalar jadvali va o'qituvchi paneli saqlanmaydi.
        </p>
      )}
      {isRedisRequired && <p className="banner error">{data?.error || "Live rejim uchun Upstash Redis ulanmagan."}</p>}
      {loadError && <p className="banner error">{loadError}</p>}

      <div className="layout">
        <section className="card start" aria-labelledby="start-title">
          <h2 id="start-title">Testni boshlash</h2>

          {active?.id && (
            <div className="resume">
              <p>
                <b>{active.name}</b>, sizda tugallanmagan test bor.
              </p>
              <button type="button" className="btn" onClick={() => router.push(`/quiz/${active.id}`)}>
                Testni davom ettirish
              </button>
            </div>
          )}

          {closed ? (
            <p className="banner info">Test hozircha yopiq. O'qituvchi ochganidan keyin boshlashingiz mumkin.</p>
          ) : (
            <form onSubmit={startQuiz} className="form">
              <label htmlFor="student-name">Familiya va ismingiz</label>
              <input
                id="student-name"
                type="text"
                autoComplete="name"
                placeholder="Masalan: Aliyev Vali"
                value={name}
                maxLength={60}
                onChange={(e) => setName(e.target.value)}
                disabled={busy}
                required
              />
              {error && (
                <p className="field-error" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="btn primary" disabled={busy || name.trim().length < 5}>
                {busy ? "Tayyorlanmoqda…" : "Testni boshlash"}
              </button>
            </form>
          )}

          <ul className="rules">
            <li>
              <b>{count}</b> ta savol, har birida 4 ta variant, bittasi to'g'ri
            </li>
            <li>
              Vaqt: <b>{minutes}</b> daqiqa. Vaqt tugasa, javoblar avtomatik topshiriladi
            </li>
            <li>{isStateless ? "Stateless rejimda natija umumiy jadvalga yozilmaydi" : "Har bir talaba testni faqat bir marta topshiradi"}</li>
            <li>Savollar va variantlar har bir talabada boshqacha tartibda</li>
          </ul>
        </section>

        <section className="card board" aria-labelledby="board-title">
          <div className="board-head">
            <h2 id="board-title">Natijalar</h2>
            {updatedAt && <span className="muted small">Yangilandi: {formatClock(updatedAt)}</span>}
          </div>

          <div className="stats">
            <div className="stat">
              <span className="stat-label">Topshirganlar</span>
              <span className="stat-value">{total}</span>
            </div>
            <div className="stat">
              <span className="stat-label">O'rtacha natija</span>
              <span className="stat-value">{total ? `${avg}%` : "—"}</span>
            </div>
            <div className="stat">
              <span className="stat-label">O'tganlar (56%+)</span>
              <span className="stat-value">{total ? `${passed}` : "—"}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Eng yuqori</span>
              <span className="stat-value">{best ? `${best.percent}%` : "—"}</span>
            </div>
          </div>

          {!data && !loadError ? (
            <p className="empty">Natijalar yuklanmoqda…</p>
          ) : total === 0 ? (
            <p className="empty">
              {isStateless
                ? "Stateless rejimda umumiy jadval saqlanmaydi. Har bir talaba o'z natijasini test tugagach ko'radi."
                : "Hali hech kim test topshirmadi. Birinchi natija shu yerda paydo bo'ladi."}
            </p>
          ) : (
            <div className="table-wrap">
              <table className="results">
                <thead>
                  <tr>
                    <th className="c">№</th>
                    <th>Familiya, ism</th>
                    <th className="c">To'g'ri</th>
                    <th>Foiz</th>
                    <th className="c">Baho</th>
                    <th className="c">Vaqt</th>
                    <th className="c">Topshirdi</th>
                    {adminOk && <th className="c" />}
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={r.id} className={r.id === mineId ? "mine" : undefined}>
                      <td className="c num">{i + 1}</td>
                      <td className="name">
                        {r.name}
                        {r.id === mineId && <span className="tag">siz</span>}
                        {r.late && <span className="tag late">kech</span>}
                      </td>
                      <td className="c num">
                        {r.correct}/{r.total}
                      </td>
                      <td>
                        <div className="pct">
                          <div className="bar" aria-hidden="true">
                            <span style={{ width: `${r.percent}%` }} />
                          </div>
                          <span className="num">{r.percent}%</span>
                        </div>
                      </td>
                      <td className="c">
                        <span className={`grade g${r.grade}`}>{r.grade}</span>
                      </td>
                      <td className="c num">{formatDuration(r.durationSec)}</td>
                      <td className="c num muted">{formatClock(r.finishedAt)}</td>
                      {adminOk && (
                        <td className="c">
                          {pendingDelete === r.id ? (
                            <span className="row-confirm">
                              <button type="button" className="btn tiny danger" disabled={adminBusy} onClick={() => adminCall("delete", { id: r.id })}>
                                O'chirish
                              </button>
                              <button type="button" className="btn tiny" onClick={() => setPendingDelete(null)}>
                                Yo'q
                              </button>
                            </span>
                          ) : (
                            <button type="button" className="btn tiny ghost" onClick={() => setPendingDelete(r.id)} aria-label={`${r.name} natijasini o'chirish`}>
                              ✕
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="muted small legend">
            Baho: 86–100% — 5, 71–85% — 4, 56–70% — 3, 55% va undan past — 2. Teng natijada tezroq ishlagan yuqorida turadi.
          </p>
        </section>
      </div>

      {showAdminPanel && (
        <details className="card admin">
        <summary>O'qituvchi paneli</summary>
        {!adminOk ? (
          <form
            className="admin-login"
            onSubmit={(e) => {
              e.preventDefault();
              adminCall("check");
            }}
          >
            <label htmlFor="admin-password">Parol</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={adminPw}
              onChange={(e) => setAdminPw(e.target.value)}
            />
            <button type="submit" className="btn" disabled={adminBusy || !adminPw}>
              Kirish
            </button>
          </form>
        ) : (
          <div className="admin-actions">
            <p className="muted small">
              Test holati: <b>{closed ? "yopiq" : "ochiq"}</b>. Jadvaldagi ✕ tugmasi bilan alohida natijani o'chirish mumkin.
            </p>
            <div className="row">
              <button type="button" className="btn" disabled={adminBusy} onClick={() => adminCall(closed ? "open" : "close")}>
                {closed ? "Testni ochish" : "Testni yopish"}
              </button>
              <a className="btn" href="/api/results?format=csv">
                Natijalarni Excel'ga yuklab olish (CSV)
              </a>
              {confirmReset ? (
                <span className="row-confirm">
                  <span>Barcha natijalar o'chib ketadi.</span>
                  <button type="button" className="btn danger" disabled={adminBusy} onClick={() => adminCall("reset")}>
                    Ha, hammasini o'chirish
                  </button>
                  <button type="button" className="btn" onClick={() => setConfirmReset(false)}>
                    Bekor qilish
                  </button>
                </span>
              ) : (
                <button type="button" className="btn danger ghost" onClick={() => setConfirmReset(true)}>
                  Barcha natijalarni o'chirish
                </button>
              )}
              <button type="button" className="btn ghost" onClick={adminLogout}>
                Chiqish
              </button>
            </div>
          </div>
        )}
        {adminMsg && <p className="admin-msg">{adminMsg}</p>}
        </details>
      )}
    </main>
  );
}
