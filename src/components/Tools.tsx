import { motion } from "motion/react";
import { easeStudio } from "../lib/easings";
import SplitText from "./primitives/SplitText";

type Tool = { name: string; dot: string };
type Category = { label: string; tools: Tool[] };

const CATEGORIES: Category[] = [
  {
    label: "Web",
    tools: [
      { name: "React",          dot: "#61DAFB" },
      { name: "Next.js",        dot: "#FFFFFF" },
      { name: "Vite",           dot: "#B17BFF" },
      { name: "TypeScript",     dot: "#3178C6" },
      { name: "Tailwind CSS",   dot: "#38BDF8" },
      { name: "Framer Motion",  dot: "#B4B4FF" },
    ],
  },
  {
    label: "Design",
    tools: [
      { name: "Figma",           dot: "#F24E1E" },
      { name: "Illustrator",     dot: "#FF9A00" },
      { name: "Photoshop",       dot: "#31A8FF" },
      { name: "After Effects",   dot: "#9999FF" },
      { name: "Canva Pro",       dot: "#00C4CC" },
      { name: "Spline",          dot: "#B4B4FF" },
    ],
  },
  {
    label: "Productivity",
    tools: [
      { name: "Notion",           dot: "#FFFFFF" },
      { name: "Slack",            dot: "#E01E5A" },
      { name: "Google Workspace", dot: "#4285F4" },
      { name: "Linear",           dot: "#5E6AD2" },
    ],
  },
  {
    label: "AI",
    tools: [
      { name: "ChatGPT",    dot: "#10A37F" },
      { name: "Claude",     dot: "#CC785C" },
      { name: "Midjourney", dot: "#FFFFFF" },
      { name: "Runway",     dot: "#B4B4FF" },
      { name: "ElevenLabs", dot: "#F5F2EC" },
    ],
  },
];

function ToolPill({ tool, i }: { tool: Tool; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.04, ease: easeStudio }}
      className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[color:var(--color-line)] hover:border-[color:var(--color-accent)]/40 hover:bg-[color:var(--color-accent-soft)] transition-colors duration-300 cursor-default"
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: tool.dot, boxShadow: `0 0 6px ${tool.dot}66` }}
      />
      <span className="font-sans text-[13px] text-[color:var(--color-ink-dim)] group-hover:text-[color:var(--color-ink)] transition-colors duration-300 whitespace-nowrap">
        {tool.name}
      </span>
    </motion.div>
  );
}

export default function Tools() {
  return (
    <section id="stack" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[color:var(--color-accent)] opacity-[0.03] blur-[160px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeStudio }}
              className="text-eyebrow mb-4 block"
            >
              <span className="text-[color:var(--color-accent)]">08</span> — Stack
            </motion.span>
            <SplitText
              text="Tools & tech"
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
            The tools we use every day to design, build, and ship work that performs.
          </motion.p>
        </div>

        {/* categories */}
        <div className="flex flex-col gap-12 md:gap-16">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: ci * 0.08, ease: easeStudio }}
              className="border-t border-[color:var(--color-line)] pt-8"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                <div className="md:w-32 shrink-0">
                  <span className="text-eyebrow">{cat.label}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {cat.tools.map((tool, ti) => (
                    <ToolPill key={tool.name} tool={tool} i={ci * 10 + ti} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
