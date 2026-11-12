"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ACTIVE_KEY, MINE_KEY, answersKey, readStore, writeStore, formatDuration } from "@/lib/browser";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export default function QuizClient({ id, title }) {
  const [phase, setPhase] = useState("loading"); // loading | quiz | result | error
  const [message, setMessage] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [remaining, setRemaining] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState(null);

  const offsetRef = useRef(0);
  const submittedRef = useRef(false);
  const answersRef = useRef([]);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // Savollarni yuklash
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/attempt/${encodeURIComponent(id)}`, { cache: "no-store" });
        const body = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) {
          writeStore("sessionStorage", ACTIVE_KEY, null);
          setMessage(body.error || "Testni yuklab bo'lmadi.");
          setPhase("error");
          return;
        }
        offsetRef.current = body.serverNow - Date.now();
        const saved = readStore("sessionStorage", answersKey(id));
        const initial = body.questions.map((_, i) => (Number.isInteger(saved?.[i]) ? saved[i] : null));
        answersRef.current = initial;
        setAnswers(initial);
        setQuiz(body);
        setPhase("quiz");
      } catch {
        if (!cancelled) {
          setMessage("Server bilan aloqa yo'q. Sahifani yangilab ko'ring.");
          setPhase("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const submit = useCallback(
    async (auto = false) => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      setSubmitting(true);
      setSubmitError("");
      try {
        const res = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ attemptId: id, answers: answersRef.current }),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 404 || res.status === 409) {
            writeStore("sessionStorage", ACTIVE_KEY, null);
            setMessage(body.error || "Test allaqachon topshirilgan.");
            setPhase("error");
            return;
          }
          submittedRef.current = false;
          setSubmitting(false);
          setSubmitError(body.error || "Topshirib bo'lmadi. Qayta urinib ko'ring.");
          return;
        }
        writeStore("sessionStorage", ACTIVE_KEY, null);
        writeStore("sessionStorage", answersKey(id), null);
        if (body.persisted !== false) {
          writeStore("localStorage", MINE_KEY, { id: body.result.id });
        }
        setResult({ ...body.result, auto, persisted: body.persisted !== false });
        setPhase("result");
      } catch {
        submittedRef.current = false;
        setSubmitting(false);
        setSubmitError("Server bilan aloqa yo'q. Internetni tekshirib, qayta bosing.");
      }
    },
    [id]
  );

  // Taymer: server vaqti bo'yicha hisoblanadi, vaqt tugasa avtomatik topshiriladi
  useEffect(() => {
    if (phase !== "quiz" || !quiz) return;
    const tick = () => {
      const now = Date.now() + offsetRef.current;
      const left = Math.max(0, Math.ceil(quiz.timeLimitSec - (now - quiz.startedAt) / 1000));
      setRemaining(left);
      if (left <= 0) submit(true);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [phase, quiz, submit]);

  // Test paytida sahifani tasodifan yopishdan ogohlantirish
  useEffect(() => {
    if (phase !== "quiz") return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [phase]);

  function choose(optionIndex) {
    if (submitting) return;
    setAnswers((prev) => {
      const next = prev.slice();
      next[current] = optionIndex;
      answersRef.current = next;
      writeStore("sessionStorage", answersKey(id), next);
      return next;
    });
    setConfirming(false);
  }

  if (phase === "loading") {
    return (
      <main className="page narrow">
        <p className="empty">Test yuklanmoqda…</p>
      </main>
    );
  }

  if (phase === "error") {
    return (
      <main className="page narrow">
        <section className="card center">
          <h1 className="h-sm">{title}</h1>
          <p className="banner error">{message}</p>
          <Link className="btn primary" href="/">
            Asosiy oynaga qaytish
          </Link>
        </section>
      </main>
    );
  }

  if (phase === "result" && result) {
    return (
      <main className="page narrow">
        <section className="card center result">
          <p className="muted">{result.name}</p>
          {result.auto && <p className="banner info">Vaqt tugadi, javoblaringiz avtomatik topshirildi.</p>}
          <div className={`big-score g${result.grade}`}>{result.percent}%</div>
          <p className="score-line">
            To'g'ri javoblar: <b>{result.correct}</b> / {result.total} · Baho: <b>{result.grade}</b> · Vaqt:{" "}
            <b>{formatDuration(result.durationSec)}</b>
          </p>
          <p className="muted">
            {result.persisted
              ? "Natijangiz asosiy oynadagi umumiy jadvalga qo'shildi."
              : "Natijangiz hisoblandi. Stateless rejim sabab umumiy jadvalga saqlanmadi."}
          </p>
          <Link className="btn primary" href="/">
            Natijalar jadvaliga o'tish
          </Link>
        </section>
      </main>
    );
  }

  const questions = quiz.questions;
  const q = questions[current];
  const answeredCount = answers.filter((a) => a !== null).length;
  const unanswered = questions.length - answeredCount;
  const isLast = current === questions.length - 1;
  const lowTime = remaining !== null && remaining <= 60;

  return (
    <main className="page narrow quiz">
      <header className="quiz-bar">
        <div>
          <p className="muted small">{title}</p>
          <p className="who">{quiz.name}</p>
        </div>
        <div className={`timer ${lowTime ? "low" : ""}`} role="timer" aria-live={lowTime ? "assertive" : "off"}>
          {remaining === null ? "—" : formatDuration(remaining)}
        </div>
      </header>

      <div className="progress" aria-label={`Javob berilgan: ${answeredCount} / ${questions.length}`}>
        <span style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
      </div>

      <section className="card question" aria-labelledby="q-text">
        <div className="q-meta">
          <span>
            Savol {current + 1} / {questions.length}
          </span>
          <span className="tag topic">{q.topic}</span>
        </div>
        <h2 id="q-text" className="q-text">
          {q.text}
        </h2>
        <div className="options" role="radiogroup" aria-labelledby="q-text">
          {q.options.map((opt, k) => {
            const selected = answers[current] === k;
            return (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`option ${selected ? "selected" : ""}`}
                onClick={() => choose(k)}
                disabled={submitting}
              >
                <span className="letter">{LETTERS[k]}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="q-nav">
          <button type="button" className="btn" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
            ← Oldingi
          </button>
          {!isLast ? (
            <button type="button" className="btn primary" onClick={() => setCurrent((c) => c + 1)}>
              Keyingi →
            </button>
          ) : (
            <button
              type="button"
              className="btn primary"
              disabled={submitting}
              onClick={() => {
                setConfirming(true);
                document.getElementById("finish")?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              Testni yakunlash
            </button>
          )}
        </div>
      </section>

      <section className="card navigator" aria-label="Savollar ro'yxati">
        <div className="nav-grid">
          {questions.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`nav-cell ${answers[i] !== null ? "done" : ""} ${i === current ? "current" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`${i + 1}-savol${answers[i] !== null ? ", javob berilgan" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="finish" id="finish">
          <span className="muted small">
            Javob berilgan: <b>{answeredCount}</b> / {questions.length}
          </span>
          {!confirming ? (
            <button type="button" className="btn" disabled={submitting} onClick={() => setConfirming(true)}>
              Testni yakunlash
            </button>
          ) : (
            <span className="row-confirm">
              <span>{unanswered > 0 ? `Javobsiz savollar: ${unanswered} ta. Baribir yakunlaysizmi?` : "Testni yakunlashni tasdiqlang."}</span>
              <button type="button" className="btn primary" disabled={submitting} onClick={() => submit(false)}>
                {submitting ? "Topshirilmoqda…" : "Ha, topshirish"}
              </button>
              <button type="button" className="btn" disabled={submitting} onClick={() => setConfirming(false)}>
                Qaytish
              </button>
            </span>
          )}
        </div>
        {submitError && (
          <p className="field-error" role="alert">
            {submitError}
          </p>
        )}
      </section>
    </main>
  );
}
