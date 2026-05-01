import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { easeStudio } from "../lib/easings";

const SESSION_KEY = "nirmaan_preloader_played";

export default function Preloader() {
  const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "1";
  const [visible, setVisible] = useState(!alreadyPlayed);
  const countRef = useRef(alreadyPlayed ? 100 : 0);
  const countElRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (alreadyPlayed) return;

    document.body.style.overflow = "hidden";
    const duration = 2400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const count = Math.round(eased * 100);

      // Direct DOM update — skip React reconciliation entirely
      if (count !== countRef.current) {
        countRef.current = count;
        if (countElRef.current) {
          countElRef.current.textContent = `${count.toString().padStart(3, "0")} / 100`;
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${count / 100})`;
        }
      }

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem(SESSION_KEY, "1");
          document.body.style.overflow = "auto";
        }, 500);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "auto";
    };
  }, [alreadyPlayed]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 1, ease: easeStudio } }}
          className="fixed inset-0 z-[10000] bg-[color:var(--color-bg)] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
            <span className="text-eyebrow">Nirmaan & Co. / Studio</span>
            <span className="text-eyebrow hidden md:inline">New Delhi — Remote</span>
          </div>

          <div className="flex flex-col items-center gap-8 px-8">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, delay: 0.15, ease: easeStudio }}
                className="font-display text-[clamp(56px,12vw,180px)] font-extrabold tracking-[-0.04em] leading-[0.85] text-[color:var(--color-ink)]"
              >
                NIRMAAN <span className="text-[color:var(--color-accent)]">&</span> CO.
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: easeStudio }}
                className="text-editorial text-[color:var(--color-ink-dim)] text-base md:text-lg"
              >
                a studio for small businesses
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 flex items-baseline gap-3">
            <span className="text-eyebrow">Loading</span>
            <span ref={countElRef} className="font-mono text-xs text-[color:var(--color-ink)] tabular-nums">
              000 / 100
            </span>
          </div>

          <div className="absolute bottom-10 right-10 text-eyebrow">
            v 1.0
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[color:var(--color-line)]">
            <div
              ref={barRef}
              className="h-full bg-[color:var(--color-accent)] origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
