import { motion } from "motion/react";
import { easeStudio } from "../lib/easings";

const LINKS_LEFT = [
  { label: "Work", href: "#work" },
  { label: "Graphics", href: "#graphics" },
  { label: "Corporates", href: "#corporates" },
  { label: "Prototypes", href: "#prototypes" },
  { label: "Practice", href: "#practice" },
  { label: "Stack", href: "#stack" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const LINKS_RIGHT = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "Behance", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[color:var(--color-bg)] border-t border-[color:var(--color-line)] overflow-hidden">
      {/* subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] rounded-full bg-[color:var(--color-accent)] opacity-[0.04] blur-[100px] pointer-events-none hidden md:block" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-10 relative z-10">
        {/* oversized wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeStudio }}
          className="mb-16 md:mb-20 overflow-hidden"
        >
          <h2 className="font-display font-extrabold text-[clamp(60px,14vw,240px)] leading-[0.82] tracking-[-0.05em] text-[color:var(--color-ink)] select-none">
            NIRMAAN <span className="text-[color:var(--color-accent)]">&</span> CO.
          </h2>
        </motion.div>

        {/* nav + social grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-20 border-t border-[color:var(--color-line)] pt-12">
          <div>
            <p className="text-eyebrow mb-5">Navigate</p>
            <ul className="flex flex-col gap-3">
              {LINKS_LEFT.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[color:var(--color-ink-dim)] text-sm hover:text-[color:var(--color-ink)] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-eyebrow mb-5">Follow</p>
            <ul className="flex flex-col gap-3">
              {LINKS_RIGHT.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[color:var(--color-ink-dim)] text-sm hover:text-[color:var(--color-ink)] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2">
            <p className="text-eyebrow mb-5">Studio</p>
            <p className="text-[color:var(--color-ink-dim)] text-sm leading-relaxed max-w-sm mb-6">
              Nirmaan & Co. is a design and web studio for small businesses. We make websites, brands, print materials, and social creatives — for cafes, salons, shops, and anyone else who wants to look their best.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[color:var(--color-accent)] text-sm font-medium hover:gap-4 transition-all duration-300"
            >
              Start a project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* colophon */}
        <div className="border-t border-[color:var(--color-line)] pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-meta">
            © {new Date().getFullYear()} Nirmaan & Co. All rights reserved.
          </p>
          <p className="text-meta">
            Set in{" "}
            <a href="https://www.fontshare.com/fonts/cabinet-grotesk" className="text-[color:var(--color-ink-faint)] hover:text-[color:var(--color-ink)] transition-colors" target="_blank" rel="noreferrer">
              Cabinet Grotesk
            </a>{" "}
            &amp;{" "}
            <a href="https://www.fontshare.com/fonts/editorial-new" className="text-[color:var(--color-ink-faint)] hover:text-[color:var(--color-ink)] transition-colors" target="_blank" rel="noreferrer">
              Editorial New
            </a>
            {" "}· Built with React + Motion
          </p>
          <p className="text-meta">
            New Delhi, India · Remote worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
