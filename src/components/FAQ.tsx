import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { easeStudio } from "../lib/easings";
import SplitText from "./primitives/SplitText";

const ITEMS = [
  {
    q: "How long does a project take?",
    a: "Most websites take 2–3 weeks from kick-off to launch. Logo and brand projects are usually 1–2 weeks. Print and social creatives can be done in a few days. We'll give you an honest timeline upfront.",
  },
  {
    q: "How much does it cost?",
    a: "Every project is different — it depends on what you need, how complex it is, and what we're building together. Book a free call and we'll give you a clear quote with no surprises.",
  },
  {
    q: "How many revisions do I get?",
    a: "All projects include two full rounds of revisions. We want you to love the result, so we work until it feels right. If you need more rounds, we'll work something out.",
  },
  {
    q: "Will I own the files and the website?",
    a: "Yes — everything we make for you is yours. You get all the source files for logos and print work, and full ownership of your website code and content.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Absolutely. We work remotely with clients across India and globally. All communication is in English, and we're comfortable with any time zone.",
  },
  {
    q: "What if I need ongoing help after launch?",
    a: "We offer optional monthly retainers for website updates, new social content, and design work. Many clients stay on after their first project — it's always an option, never a requirement.",
  },
];

function Item({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-[color:var(--color-line)]">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-6 py-7 text-left group"
        aria-expanded={open}
      >
        <span className={`font-sans font-medium text-base md:text-lg transition-colors duration-300 ${open ? "text-[color:var(--color-ink)]" : "text-[color:var(--color-ink-dim)] group-hover:text-[color:var(--color-ink)]"}`}>
          {q}
        </span>
        <span className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)] rotate-45" : "border-[color:var(--color-line-strong)]"}`}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke={open ? "var(--color-accent)" : "var(--color-ink-faint)"} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: easeStudio }}
            className="overflow-hidden"
          >
            <p className="pb-7 pr-12 text-[color:var(--color-ink-dim)] text-sm md:text-base leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 md:gap-24">
          <div className="md:sticky md:top-28 self-start">
            <span className="text-eyebrow mb-4 block">
              Common questions
            </span>
            <SplitText
              text="Got questions?"
              as="h2"
              className="font-display font-extrabold text-[clamp(36px,5vw,72px)] leading-[0.92] tracking-[-0.035em] text-[color:var(--color-ink)] mb-6"
              stagger={0.07}
              duration={0.9}
            />
            <p className="text-[color:var(--color-ink-dim)] text-sm leading-relaxed mb-8">
              If you don't see what you're looking for, just drop us a message — we reply fast.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[color:var(--color-accent)] font-medium text-sm hover:gap-4 transition-all duration-300"
            >
              Ask us directly
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="border-t border-[color:var(--color-line)]">
            {ITEMS.map((item, i) => (
              <Item
                key={i}
                q={item.q}
                a={item.a}
                open={open === i}
                toggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
