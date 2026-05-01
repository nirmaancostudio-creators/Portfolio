import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { DECKS } from "../data/decks";
import { easeStudio } from "../lib/easings";

export default function CorporatePage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const deckId = params.get("deck");
  const deck = DECKS.find(d => d.id === deckId);

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((idx: number) => {
    if (!deck) return;
    setDirection(idx > current ? 1 : -1);
    setCurrent(Math.max(0, Math.min(idx, deck.slides.length - 1)));
  }, [current, deck]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, navigate]);

  if (!deck) {
    return (
      <div className="min-h-screen bg-[color:var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[color:var(--color-ink-dim)] mb-6">Deck not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="text-[color:var(--color-accent)] font-semibold hover:underline"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-ink)] flex flex-col">
      {/* top bar */}
      <div className="grid grid-cols-3 items-center px-6 md:px-10 py-5 border-b border-[color:var(--color-line)] shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-ink)] transition-colors duration-200 text-sm font-medium justify-self-start"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div className="flex flex-col items-center gap-0.5 justify-self-center">
          <span className="font-display font-bold text-base md:text-lg tracking-[-0.02em]">{deck.title}</span>
          <span className="text-meta">{deck.type}</span>
        </div>

        <span className="font-mono text-sm text-[color:var(--color-ink-faint)] tabular-nums justify-self-end">
          {String(current + 1).padStart(2, "0")} / {String(deck.slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* slide viewer */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-10 py-8 relative overflow-hidden">
        {/* prev button */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="absolute left-4 md:left-8 z-10 w-10 h-10 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-bg-raised)] flex items-center justify-center text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-ink)] hover:border-[color:var(--color-line-strong)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* slide */}
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: easeStudio }}
              className="w-full rounded-2xl overflow-hidden border border-[color:var(--color-line)] shadow-[0_16px_64px_rgba(0,0,0,0.5)]"
            >
              <img
                src={deck.slides[current]}
                alt={`${deck.title} — slide ${current + 1}`}
                className="w-full h-auto block"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* next button */}
        <button
          onClick={next}
          disabled={current === deck.slides.length - 1}
          className="absolute right-4 md:right-8 z-10 w-10 h-10 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-bg-raised)] flex items-center justify-center text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-ink)] hover:border-[color:var(--color-line-strong)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* thumbnail strip — hidden on mobile */}
      <div className="hidden md:block border-t border-[color:var(--color-line)] shrink-0">
        <div className="flex gap-2 px-8 py-4 overflow-x-auto scrollbar-none">
          {deck.slides.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === current
                  ? "border-[color:var(--color-accent)] opacity-100"
                  : "border-transparent opacity-40 hover:opacity-70"
              }`}
              style={{ width: 100 }}
            >
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full h-auto block"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* mobile dot indicators */}
      <div className="md:hidden flex justify-center gap-1.5 pb-6 pt-2 shrink-0">
        {deck.slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-200 ${
              i === current
                ? "w-4 h-1.5 bg-[color:var(--color-accent)]"
                : "w-1.5 h-1.5 bg-[color:var(--color-line-strong)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
