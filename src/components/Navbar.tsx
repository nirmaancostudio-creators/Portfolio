import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { easeStudio } from "../lib/easings";
import LocalTime from "./primitives/LocalTime";
import ScrambleText from "./primitives/ScrambleText";

const WORK_ITEMS = [
  { label: "Websites",   tab: "websites"   },
  { label: "Graphics",   tab: "graphics"   },
  { label: "Corporates", tab: "corporates" },
  { label: "Prototypes", tab: "prototypes" },
  { label: "Automation", tab: "automation" },
];

const LINKS = [
  { n: "02", label: "Practice", href: "#practice" },
  { n: "03", label: "Process",  href: "#process"  },
  { n: "04", label: "Contact",  href: "#contact"  },
];

const MOBILE_LINKS = [
  { n: "01", label: "Work",     href: "#work"     },
  { n: "02", label: "Practice", href: "#practice" },
  { n: "03", label: "Process",  href: "#process"  },
  { n: "04", label: "Contact",  href: "#contact"  },
];

function WorkDropdown({ onSelect }: { onSelect: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.22, ease: easeStudio }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 rounded-2xl border border-[color:var(--color-line-strong)] bg-[rgba(11,11,13,0.97)] shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden z-[90]"
    >
      <div className="py-2">
        {WORK_ITEMS.map((item, i) => (
          <motion.a
            key={item.tab}
            href="#work"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18, delay: i * 0.04, ease: easeStudio }}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("work");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              window.dispatchEvent(new CustomEvent("nirmaan:set-tab", { detail: item.tab }));
              onSelect();
            }}
            data-cursor="link"
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-[color:var(--color-accent-soft)] transition-colors duration-150 group"
          >
            <span className="font-mono text-[9px] text-[color:var(--color-ink-faint)] group-hover:text-[color:var(--color-accent)] transition-colors w-4">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-sans text-[13px] font-medium text-[color:var(--color-ink-dim)] group-hover:text-[color:var(--color-ink)] transition-colors">
              {item.label}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [open, setOpen]             = useState(false);
  const [workOpen, setWorkOpen]     = useState(false);
  const dropdownRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setWorkOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.6, ease: easeStudio }}
        className={`fixed top-0 inset-x-0 z-[80] transition-colors duration-500 ${
          scrolled
            ? "bg-[rgba(11,11,13,0.95)] border-b border-[color:var(--color-line)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* logo */}
          <a href="#" className="flex items-baseline gap-1.5 group" data-cursor="link">
            <span className="font-display font-extrabold text-xl md:text-2xl tracking-[-0.04em] text-[color:var(--color-ink)]">
              NIRMAAN
            </span>
            <span className="text-[color:var(--color-accent)] text-xl md:text-2xl font-display font-extrabold leading-none">&</span>
            <span className="font-display font-extrabold text-xl md:text-2xl tracking-[-0.04em] text-[color:var(--color-ink)]">CO.</span>
          </a>

          {/* desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {/* Our Work with dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                data-cursor="link"
                onClick={() => setWorkOpen((v) => !v)}
                onMouseEnter={() => setWorkOpen(true)}
                className="group flex items-baseline gap-1.5 focus:outline-none"
              >
                <span className="font-mono text-[10px] text-[color:var(--color-ink-faint)] group-hover:text-[color:var(--color-accent)] transition-colors">
                  01
                </span>
                <span className="font-sans text-[13px] font-medium text-[color:var(--color-ink-dim)] group-hover:text-[color:var(--color-ink)] transition-colors">
                  Work
                </span>
                <motion.span
                  animate={{ rotate: workOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-0.5 text-[color:var(--color-ink-faint)] text-[9px] leading-none"
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence>
                {workOpen && (
                  <WorkDropdown onSelect={() => setWorkOpen(false)} />
                )}
              </AnimatePresence>
            </div>

            {/* remaining links */}
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} data-cursor="link" className="group flex items-baseline gap-1.5">
                <span className="font-mono text-[10px] text-[color:var(--color-ink-faint)] group-hover:text-[color:var(--color-accent)] transition-colors">
                  {l.n}
                </span>
                <ScrambleText
                  text={l.label}
                  className="font-sans text-[13px] font-medium text-[color:var(--color-ink-dim)] group-hover:text-[color:var(--color-ink)] transition-colors"
                />
              </a>
            ))}
          </div>

          {/* CTA + time */}
          <div className="hidden lg:flex items-center gap-5">
            <LocalTime />
            <a
              href="#contact"
              data-cursor="link"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[color:var(--color-accent)] text-[color:var(--color-bg)] text-[12px] font-semibold tracking-[0.04em] hover:bg-[color:var(--color-ink)] transition-colors"
            >
              Book a call
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-bg)]" />
            </a>
          </div>

          {/* mobile hamburger */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`block w-6 h-[1.5px] bg-[color:var(--color-ink)] transition-transform duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-[color:var(--color-ink)] transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-[color:var(--color-ink)] transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: easeStudio }}
            className="fixed inset-0 z-[75] bg-[color:var(--color-bg)] md:hidden flex flex-col px-6 pt-24 pb-10 overflow-y-auto"
          >
            <div className="flex-1 flex flex-col gap-6">
              {MOBILE_LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: easeStudio }}
                  className="flex items-baseline gap-4 border-b border-[color:var(--color-line)] pb-4"
                >
                  <span className="font-mono text-xs text-[color:var(--color-ink-faint)]">{l.n}</span>
                  <span className="font-display text-4xl font-extrabold text-[color:var(--color-ink)] tracking-[-0.03em]">
                    {l.label}
                  </span>
                </motion.a>
              ))}

              {/* mobile work sub-links */}
              <div className="pl-8 flex flex-col gap-3 -mt-2">
                {WORK_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.tab}
                    href="#work"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.36 + i * 0.05, duration: 0.4, ease: easeStudio }}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("work");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                      window.dispatchEvent(new CustomEvent("nirmaan:set-tab", { detail: item.tab }));
                      setOpen(false);
                    }}
                    className="font-sans text-sm text-[color:var(--color-ink-faint)] hover:text-[color:var(--color-accent)] transition-colors"
                  >
                    → {item.label}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <LocalTime />
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="px-5 py-2.5 rounded-full bg-[color:var(--color-accent)] text-[color:var(--color-bg)] text-sm font-semibold"
              >
                Book a call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
