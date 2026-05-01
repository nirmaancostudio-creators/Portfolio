import { motion } from "motion/react";
import { useRef } from "react";
import { easeStudio } from "../lib/easings";
import SplitText from "./primitives/SplitText";
import MagneticButton from "./primitives/MagneticButton";
import Marquee from "./primitives/Marquee";

const SESSION_KEY = "nirmaan_preloader_played";

const TICKER_ITEMS = [
  "Websites", "Brand Identity", "Print & Posters", "Social Creatives",
  "Cafes", "Salons", "Shops", "Restaurants", "Studios", "Local Business",
];
const SERVICE_TAGS = ["Websites", "Brand Identity", "Print", "Social Creatives"];

// ─── ElegantShape — thick visible glass pills ─────────────────────────────────
function ElegantShape({
  className = "", delay = 0, width = 400, height = 100, rotate = 0,
  gradient = "from-white/[0.10]",
}: {
  className?: string; delay?: number; width?: number; height?: number;
  rotate?: number; gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -140, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 2.6, delay, ease: [0.23, 0.86, 0.39, 0.96], opacity: { duration: 1.5 } }}
      className={`absolute pointer-events-none ${className}`}
    >
      <div
        style={{ width, height }}
        className="relative"
      >
        <div className={[
          "absolute inset-0 rounded-full",
          "bg-gradient-to-r to-transparent",
          gradient,
          "border-2 border-white/[0.18]",
          "shadow-[0_8px_32px_0_rgba(180,180,255,0.12)]",
          "after:absolute after:inset-0 after:rounded-full",
          "after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_65%)]",
        ].join(" ")} />
      </div>
    </motion.div>
  );
}

// ─── Bright 3D geometric objects (cube / ring / diamond) ─────────────────────
function GeoShape({
  className = "", type = "cube", size = 60, delay = 0,
  rotateX = 25, rotateY = 40,
}: {
  className?: string; type?: "cube" | "ring" | "diamond";
  size?: number; delay?: number;
  rotateX?: number; rotateY?: number;
}) {
  const border = `1.5px solid rgba(180,180,255,0.40)`;
  const glow = `0 0 ${size * 0.6}px rgba(180,180,255,0.25), inset 0 0 ${size * 0.3}px rgba(180,180,255,0.10)`;

  const inner = (() => {
    if (type === "ring") return (
      <div style={{
        width: size, height: size, borderRadius: "50%",
        border: `${Math.max(2, size * 0.07)}px solid rgba(180,180,255,0.55)`,
        boxShadow: `0 0 ${size * 0.7}px rgba(180,180,255,0.30), inset 0 0 ${size * 0.4}px rgba(180,180,255,0.12)`,
        background: "transparent",
      }} />
    );
    if (type === "diamond") return (
      <div style={{
        width: size, height: size, transform: "rotate(45deg)",
        background: `linear-gradient(135deg, rgba(180,180,255,0.18) 0%, rgba(180,180,255,0.05) 100%)`,
        border, borderRadius: 3, boxShadow: glow,
      }} />
    );
    // cube
    return (
      <div style={{
        width: size, height: size,
        background: `linear-gradient(135deg, rgba(180,180,255,0.22) 0%, rgba(180,180,255,0.06) 100%)`,
        border, borderRadius: 4, boxShadow: glow,
      }} />
    );
  })();

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.5, rotateX, rotateY }}
      animate={{ opacity: 1, scale: 1, rotateX, rotateY }}
      transition={{ duration: 1.8, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
    >
      {inner}
    </motion.div>
  );
}

// ─── Glassmorphism stats card ─────────────────────────────────────────────────
function StatsCard({ skipDelay }: { skipDelay: boolean }) {
  const d = (base: number) => skipDelay ? 0 : base;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: d(3.5), ease: easeStudio }}
      className="hidden xl:block absolute right-[5%] top-[26%] z-30 pointer-events-none"
    >
      <div className="relative w-[210px] rounded-2xl border border-white/[0.12] bg-[rgba(17,17,20,0.92)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[rgba(180,180,255,0.35)] to-transparent" />
        <div className="text-[10px] font-mono tracking-[0.16em] uppercase text-[color:var(--color-ink-faint)] mb-3">
          Projects delivered
        </div>
        <div className="text-5xl font-display font-extrabold text-[color:var(--color-ink)] leading-none tracking-tight mb-1">
          50+
        </div>
        <div className="text-[11px] text-[color:var(--color-ink-dim)]">cafes · salons · shops</div>
        <div className="mt-4 h-1 w-full rounded-full bg-white/[0.07] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[color:var(--color-accent)]"
            initial={{ width: "0%" }}
            animate={{ width: "82%" }}
            transition={{ duration: 1.6, delay: d(4.0), ease: easeStudio }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] font-mono text-[color:var(--color-ink-faint)]">satisfaction</span>
          <span className="text-[10px] font-mono text-[color:var(--color-accent)]">98%</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── "Available" floating badge ───────────────────────────────────────────────
function AvailableBadge({ skipDelay }: { skipDelay: boolean }) {
  const d = (base: number) => skipDelay ? 0 : base;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: d(3.8), ease: easeStudio }}
      className="hidden xl:block absolute right-[4%] bottom-[28%] z-30 pointer-events-none"
    >
      <div className="flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-[rgba(17,17,20,0.88)] px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-accent)] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--color-accent)]" />
        </span>
        <span className="text-[11px] font-mono tracking-[0.1em] uppercase text-[color:var(--color-ink-dim)]">
          Available for projects
        </span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const skipDelay = sessionStorage.getItem(SESSION_KEY) === "1";
  const d = (base: number) => skipDelay ? 0 : base;

  return (
    <section ref={ref} id="top" className="relative min-h-screen w-full overflow-hidden flex flex-col">

      {/* ── STATIC BLUR ORBS — no parallax, no scroll ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block">
        <div className="absolute -top-[20%] right-[-5%] w-[900px] h-[900px] rounded-full bg-[color:var(--color-accent)] opacity-[0.08] blur-[200px]" />
        <div className="absolute bottom-[-5%] -left-[15%] w-[700px] h-[700px] rounded-full bg-[#3828B0] opacity-[0.11] blur-[170px]" />
        <div className="absolute top-[38%] left-[33%] w-[500px] h-[500px] rounded-full bg-[#5040C8] opacity-[0.055] blur-[130px]" />
        <div className="absolute top-[28%] right-[26%] w-[400px] h-[400px] rounded-full bg-[color:var(--color-accent)] opacity-[0.05] blur-[110px]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/35 via-transparent to-[#0B0B0D]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/88 via-[#0B0B0D]/12 to-transparent" />
      </div>

      {/* ── BACKGROUND LAYER — static grid, no parallax, no canvas ── */}
      <div className="absolute inset-0 z-0">
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(245,242,236,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,242,236,0.045) 1px, transparent 1px)`,
          backgroundSize: "88px 88px",
        }} />
      </div>

      {/* ── BACKGROUND GRADIENT PANEL ── */}
      <div className="absolute right-0 top-0 h-full w-[52%] z-[2] pointer-events-none hidden lg:block">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, rgba(80,60,200,0.13) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 85% 70%, rgba(120,80,255,0.08) 0%, transparent 65%)
          `,
        }} />
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(to right, #0B0B0D 0%, rgba(11,11,13,0.5) 28%, rgba(11,11,13,0.15) 70%, rgba(11,11,13,0.5) 100%),
            linear-gradient(to bottom, #0B0B0D 0%, transparent 12%, transparent 82%, #0B0B0D 100%)
          `,
        }} />
      </div>

      {/* ── GLASS PILLS — no float animation ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden hidden md:block">
        <ElegantShape delay={d(2.8)} width={540} height={122} rotate={11}
          gradient="from-[rgba(180,180,255,0.16)]" className="left-[-7%] top-[19%]" />
        <ElegantShape delay={d(3.0)} width={420} height={100} rotate={-14}
          gradient="from-[rgba(120,90,255,0.14)]" className="right-[-3%] top-[60%]" />
        <ElegantShape delay={d(2.9)} width={260} height={64} rotate={-7}
          gradient="from-[rgba(100,75,210,0.13)]" className="left-[7%] bottom-[15%]" />
        <ElegantShape delay={d(3.1)} width={190} height={50} rotate={22}
          gradient="from-[rgba(210,200,255,0.12)]" className="right-[23%] top-[8%]" />
      </div>

      {/* ── 3D GEOMETRIC SHAPES ── */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden hidden md:block">
        <GeoShape type="ring" size={88} delay={d(3.1)} rotateX={15} rotateY={20}
          className="right-[38%] top-[14%]" />
        <GeoShape type="cube" size={52} delay={d(3.3)} rotateX={28} rotateY={42}
          className="left-[13%] top-[32%]" />
        <GeoShape type="diamond" size={40} delay={d(3.5)} rotateX={12} rotateY={18}
          className="left-[28%] bottom-[30%]" />
      </div>

      {/* ── FLOATING GLASS CARDS ── */}
      <StatsCard skipDelay={skipDelay} />
      <AvailableBadge skipDelay={skipDelay} />

      {/* ── CONTENT ── */}
      <div className="relative z-20 flex-1 flex flex-col max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-32 md:pt-40 pb-10">

        {/* Headline block */}
        <div className="flex flex-col">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: d(2.8), ease: easeStudio }}
            className="flex items-center gap-5 mb-12 md:mb-16"
          >
            <span className="text-eyebrow">Design Studio</span>
            <span className="w-10 h-[1px] bg-[color:var(--color-line-strong)]" />
            <span className="text-eyebrow text-[color:var(--color-accent)]">Est. 2024</span>
            <span className="hidden md:inline-flex items-center gap-2 ml-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent)] animate-pulse" />
              <span className="text-meta">Available for projects</span>
            </span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-[920px]">
            <SplitText
              text="We build brands"
              as="h1"
              className="font-display font-extrabold text-[clamp(52px,9.5vw,140px)] leading-[0.87] tracking-[-0.045em] text-[color:var(--color-ink)] block"
              delay={d(2.9)} stagger={0.07} duration={1.05}
            />

            <div className="flex items-baseline flex-wrap gap-x-[0.18em] mt-[0.04em]">
              <span className="inline-block overflow-hidden align-bottom" style={{ lineHeight: "0.87" }}>
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.3, delay: d(3.2), ease: easeStudio }}
                  className="font-serif italic font-normal text-[clamp(52px,9.5vw,140px)] leading-[0.87] tracking-[-0.025em] text-[color:var(--color-accent)] inline-block"
                >
                  people
                </motion.span>
              </span>

              <SplitText
                text="remember."
                as="span"
                className="font-display font-extrabold text-[clamp(52px,9.5vw,140px)] leading-[0.87] tracking-[-0.045em] text-stroke block"
                delay={d(3.38)} stagger={0.055} duration={1.05}
              />
            </div>
          </div>
        </div>

        {/* Body + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: d(3.65), ease: easeStudio }}
          className="mt-12 md:mt-20"
        >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">
          <div className="flex flex-col gap-5 max-w-sm">
            <p className="text-base md:text-lg text-[color:var(--color-ink-dim)] leading-relaxed font-normal">
              Nirmaan & Co. crafts websites, brand identities, and print materials for cafes, salons, and shops that want to stand out.
            </p>
            <div className="flex flex-wrap gap-2">
              {SERVICE_TAGS.map((tag) => (
                <span key={tag} className="font-mono text-[10px] tracking-[0.1em] uppercase text-[color:var(--color-ink-faint)] border border-[color:var(--color-line)] px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="#contact" dataCursor="link"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[color:var(--color-accent)] text-[color:var(--color-bg)] font-semibold text-sm tracking-[0.03em] hover:bg-[color:var(--color-ink)] transition-colors">
              Start a project
              <span className="w-2 h-2 rounded-full bg-[color:var(--color-bg)]" />
            </MagneticButton>
            <MagneticButton href="#work" dataCursor="link"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[color:var(--color-line-strong)] text-[color:var(--color-ink-dim)] font-medium text-sm hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-ink)] transition-colors">
              See our work
            </MagneticButton>
          </div>
        </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: d(4.4), duration: 1.2 }}
          className="hidden md:flex items-center gap-3 mt-auto pt-12"
        >
          <div className="relative w-[1px] h-12 overflow-hidden bg-[color:var(--color-line-strong)]">
            <div className="scroll-tick absolute inset-x-0 top-0 h-1/2 bg-[color:var(--color-accent)]" />
          </div>
          <span className="text-meta tracking-[0.14em] uppercase">Scroll</span>
        </motion.div>
      </div>

      {/* ── TICKER ── */}
      <div
        className="relative z-20 border-t border-[color:var(--color-line)] py-4 overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <Marquee speed={35}>
          {TICKER_ITEMS.map((item) => (
            <span key={item} className="flex items-center gap-10">
              <span className="font-display font-extrabold text-[11px] tracking-[0.1em] uppercase text-[color:var(--color-ink-dim)]">
                {item}
              </span>
              <span className="w-1 h-1 rounded-full bg-[color:var(--color-accent)] opacity-70 flex-shrink-0" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
