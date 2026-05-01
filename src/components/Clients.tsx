import { motion } from "motion/react";
import Marquee from "./primitives/Marquee";
import { easeStudio } from "../lib/easings";

const NAMES = [
  "Your cafe", "Your salon", "Your restaurant", "Your shop", "Your studio",
  "Your boutique", "Your bakery", "Your spa", "Your gym", "Your clinic",
];

export default function Clients() {
  return (
    <section className="py-16 border-y border-[color:var(--color-line)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: easeStudio }}
      >
        <div className="mb-6 flex items-center justify-center">
          <span className="text-eyebrow text-center">
            Designed for businesses like —
          </span>
        </div>
        <Marquee speed={30}>
          {NAMES.map((name) => (
            <span key={name} className="flex items-center gap-10">
              <span className="font-display font-extrabold text-base md:text-lg tracking-[-0.02em] text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-ink)] transition-colors">
                {name}
              </span>
              <span className="w-2 h-2 rounded-full bg-[color:var(--color-accent)] opacity-40" />
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
