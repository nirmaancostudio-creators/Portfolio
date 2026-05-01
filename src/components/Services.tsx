import { motion } from "motion/react";
import { easeStudio } from "../lib/easings";
import SplitText from "./primitives/SplitText";

const PRACTICES = [
  {
    n: "01",
    title: "Websites",
    sub: "for small businesses",
    desc: "Fast, beautiful websites for cafes, salons, shops, and local businesses — built to look great and bring in customers.",
    tags: ["Landing pages", "Booking sites", "Menu sites", "SEO ready"],
  },
  {
    n: "02",
    title: "Brand",
    sub: "identity & logo design",
    desc: "Logos, color systems, and brand guidelines that make your business instantly recognizable and memorable.",
    tags: ["Logo design", "Color system", "Typography", "Brand guide"],
  },
  {
    n: "03",
    title: "Print",
    sub: "posters, flyers & menus",
    desc: "Physical marketing materials — menus, flyers, business cards, and posters — designed to be picked up, kept, and shared.",
    tags: ["Menus", "Flyers", "Business cards", "Packaging"],
  },
  {
    n: "04",
    title: "Social",
    sub: "creatives & content",
    desc: "Instagram posts, stories, reels covers, and ad creatives that match your brand and stop the scroll.",
    tags: ["Instagram posts", "Story templates", "Ad creatives", "Reels covers"],
  },
];

function PracticeRow({ p, i }: { p: (typeof PRACTICES)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: i * 0.07, ease: easeStudio }}
      className="group py-10 md:py-14 grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-10 items-start cursor-default border-t border-[color:var(--color-line)]"
      data-cursor="view"
    >
      {/* number */}
      <span className="font-mono text-5xl md:text-7xl font-bold text-[color:var(--color-ink-faint)] group-hover:text-[color:var(--color-accent)] transition-colors duration-500 leading-none">
        {p.n}
      </span>

      {/* title block */}
      <div>
        <h3 className="font-display font-extrabold text-[clamp(32px,5vw,68px)] leading-[0.9] tracking-[-0.03em] text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)] transition-colors duration-400">
          {p.title}
        </h3>
        <p className="text-editorial text-[color:var(--color-ink-dim)] text-lg mt-1">
          {p.sub}
        </p>
      </div>

      {/* desc + tags */}
      <div className="flex flex-col gap-6">
        <p className="text-[color:var(--color-ink-dim)] text-sm md:text-base leading-relaxed">
          {p.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="text-meta px-3 py-1 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="practice" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[color:var(--color-accent)] opacity-[0.04] blur-[160px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeStudio }}
              className="text-eyebrow mb-4 block"
            >
              <span className="text-[color:var(--color-accent)]">02</span> — Our Practice
            </motion.span>
            <SplitText
              text="What we do"
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
            Four practices, one studio. Every project we take gets our full attention.
          </motion.p>
        </div>

        {/* practice list — no wrapper divide, each row handles its own top border */}
        <div>
          {PRACTICES.map((p, i) => (
            <PracticeRow key={p.n} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
