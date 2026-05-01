import { motion } from "motion/react";
import { easeStudio } from "../lib/easings";
import SplitText from "./primitives/SplitText";

const STEPS = [
  {
    n: "01",
    title: "Listen",
    desc: "We start by understanding your business — who your customers are, what you need, and what makes you different. No templates, no assumptions.",
    detail: "Discovery call · Brief · Moodboard",
  },
  {
    n: "02",
    title: "Design",
    desc: "We make it visual. You'll see concepts quickly — a few options, clear reasoning, space to give feedback. We refine until it feels right.",
    detail: "Concepts · Feedback rounds · Final approval",
  },
  {
    n: "03",
    title: "Build",
    desc: "Websites go live. Print files go to your printer. Social templates drop into your folder. Everything is delivered ready to use.",
    detail: "Development · File delivery · Handoff",
  },
  {
    n: "04",
    title: "Launch",
    desc: "You're live. We stay on hand for questions, tweaks, and whatever comes up after you start using the work in the real world.",
    detail: "Go-live · Support · Optional retainer",
  },
];

function StepRow({ step, i }: { step: (typeof STEPS)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: i * 0.08, ease: easeStudio }}
      className="group grid grid-cols-1 md:grid-cols-[96px_1fr_1fr] gap-6 md:gap-10 py-10 md:py-14 items-start border-t border-[color:var(--color-line)]"
    >
      {/* step dot */}
      <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-0">
        <div className="w-10 h-10 rounded-full border border-[color:var(--color-line-strong)] flex items-center justify-center bg-[color:var(--color-bg)] group-hover:border-[color:var(--color-accent)] group-hover:bg-[color:var(--color-accent-soft)] transition-all duration-400 shrink-0">
          <span className="font-mono text-[10px] text-[color:var(--color-ink-faint)] group-hover:text-[color:var(--color-accent)] transition-colors">
            {step.n}
          </span>
        </div>
      </div>

      {/* title */}
      <div>
        <h3 className="font-display font-extrabold text-[clamp(28px,4vw,56px)] leading-[0.9] tracking-[-0.03em] text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)] transition-colors duration-400">
          {step.title}
        </h3>
        <span className="text-meta mt-2 block">{step.detail}</span>
      </div>

      {/* description */}
      <p className="text-[color:var(--color-ink-dim)] text-sm md:text-base leading-relaxed">
        {step.desc}
      </p>
    </motion.div>
  );
}

export default function Process() {
  return (
    <section id="process" className="py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeStudio }}
              className="text-eyebrow mb-4 block"
            >
              <span className="text-[color:var(--color-accent)]">03</span> — How we work
            </motion.span>
            <SplitText
              text="The process"
              as="h2"
              className="font-display font-extrabold text-[clamp(40px,7vw,96px)] leading-[0.9] tracking-[-0.035em] text-[color:var(--color-ink)]"
              stagger={0.08} duration={0.9}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeStudio }}
            className="max-w-xs text-[color:var(--color-ink-dim)] text-sm md:text-base leading-relaxed"
          >
            Simple, fast, and collaborative. Most projects wrap in 2–4 weeks.
          </motion.p>
        </div>

        <div className="relative">
          {/* scroll-driven progress line */}
          <div className="absolute left-[calc(theme(spacing.12)+1px)] top-0 bottom-0 w-[1px] bg-[color:var(--color-line)] hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-accent)] to-[color:var(--color-accent-dim)]" />
          </div>

          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <StepRow key={step.n} step={step} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
