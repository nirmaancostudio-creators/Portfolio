import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { easeStudio } from "../lib/easings";
import SplitText from "./primitives/SplitText";
import { DECKS, type DeckCard } from "../data/decks";

// ─── Types ────────────────────────────────────────────────────────────────────

type WebProject = {
  kind: "web";
  n: string;
  title: string;
  sub: "Creative" | "Purpose";
  year: string;
  url: string;
  gradient: string;
  accent: string;
  preview?: string;
};

type GraphicItem = {
  kind: "graphic";
  n: string;
  src: string;
  category: "Social" | "Marketing" | "Branding" | "Print";
  label: string;
};

type PlaceholderCard = {
  kind: "placeholder";
  n: string;
  label: string;
  tag: string;
  gradient: string;
  accent: string;
  tagColor?: string;
  aspect?: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const WEB_PROJECTS: WebProject[] = [
  { kind: "web", n: "01", title: "Ironpeak", sub: "Purpose", year: "2025", url: "https://bucolic-cupcake-310ccc.netlify.app/", gradient: "from-[#1a1a10] via-[#0B0B0D] to-[#0e1208]", accent: "rgba(180,255,140,0.10)", preview: "/screensohts/Screenshot (636).png" },
  { kind: "web", n: "02", title: "Velour", sub: "Purpose", year: "2025", url: "https://boisterous-puffpuff-87e196.netlify.app/", gradient: "from-[#2a1020] via-[#0B0B0D] to-[#180818]", accent: "rgba(255,160,200,0.10)", preview: "/screensohts/Screenshot (637).png" },
  { kind: "web", n: "03", title: "Caravan", sub: "Purpose", year: "2025", url: "https://deft-hamster-1ac2be.netlify.app/", gradient: "from-[#1a1208] via-[#0B0B0D] to-[#0f0c06]", accent: "rgba(255,210,120,0.10)", preview: "/screensohts/Screenshot (638).png" },
  { kind: "web", n: "04", title: "Shringar", sub: "Purpose", year: "2025", url: "https://gilded-douhua-44661e.netlify.app/", gradient: "from-[#200e20] via-[#0B0B0D] to-[#160916]", accent: "rgba(220,140,255,0.10)", preview: "/screensohts/Screenshot (639).png" },
  { kind: "web", n: "05", title: "Creative 1", sub: "Creative", year: "2025", url: "https://zippy-fudge-2670dc.netlify.app/", gradient: "from-[#1a1040] via-[#0B0B0D] to-[#0e0830]", accent: "rgba(180,180,255,0.15)", preview: "/screensohts/Screenshot (634).png" },
  { kind: "web", n: "06", title: "Creative 2", sub: "Creative", year: "2025", url: "https://frolicking-pika-d82e43.netlify.app/", gradient: "from-[#0d1a35] via-[#0B0B0D] to-[#080f25]", accent: "rgba(140,160,255,0.12)", preview: "/screensohts/Screenshot (633).png" },
  { kind: "web", n: "07", title: "Sketch", sub: "Creative", year: "2025", url: "https://resilient-sawine-e3a971.netlify.app/", gradient: "from-[#1c0d30] via-[#0B0B0D] to-[#120820]", accent: "rgba(200,150,255,0.12)", preview: "/screensohts/Screenshot (635).png" },
  { kind: "web", n: "08", title: "IWEY Pancreas", sub: "Creative", year: "2025", url: "https://boisterous-jalebi-09b1de.netlify.app/", gradient: "from-[#0a1a20] via-[#0B0B0D] to-[#060e18]", accent: "rgba(100,180,255,0.12)", preview: "/screensohts/Screenshot (641).png" },
];

const GRAPHIC_ITEMS: GraphicItem[] = [
  { kind: "graphic", n: "01", src: "/works/graphics/social/food-1.jpg", category: "Social", label: "Food Promo" },
  { kind: "graphic", n: "02", src: "/works/graphics/social/food-2.jpg", category: "Social", label: "Food Promo" },
  { kind: "graphic", n: "03", src: "/works/graphics/social/gym-1.jpg", category: "Social", label: "GYM Promo" },
  { kind: "graphic", n: "04", src: "/works/graphics/social/gym-2.jpg", category: "Social", label: "GYM Promo" },
  { kind: "graphic", n: "05", src: "/works/graphics/social/re-1.jpg", category: "Social", label: "Real Estate" },
  { kind: "graphic", n: "06", src: "/works/graphics/marketing/event-1.jpg", category: "Marketing", label: "Event Poster" },
  { kind: "graphic", n: "07", src: "/works/graphics/marketing/event-2.jpg", category: "Marketing", label: "Event Poster" },
  { kind: "graphic", n: "08", src: "/works/graphics/marketing/banner-1.jpg", category: "Marketing", label: "Sale Banner" },
  { kind: "graphic", n: "09", src: "/works/graphics/marketing/thumb-1.jpg", category: "Marketing", label: "Thumbnail" },
  { kind: "graphic", n: "10", src: "/works/graphics/branding/board-1.jpg", category: "Branding", label: "Brand Board" },
  { kind: "graphic", n: "11", src: "/works/graphics/branding/board-2.jpg", category: "Branding", label: "Brand Board" },
  { kind: "graphic", n: "12", src: "/works/graphics/branding/board-3.jpg", category: "Branding", label: "Brand Board" },
  { kind: "graphic", n: "13", src: "/works/graphics/print/menu-1.jpg", category: "Print", label: "Restaurant Menu" },
  { kind: "graphic", n: "14", src: "/works/graphics/print/menu-2.jpg", category: "Print", label: "Restaurant Menu" },
  { kind: "graphic", n: "15", src: "/works/graphics/print/menu-3.jpg", category: "Print", label: "Restaurant Menu" },
  { kind: "graphic", n: "16", src: "/works/graphics/print/menu-4.jpg", category: "Print", label: "Restaurant Menu" },
];

const GRAPHIC_SUB_TABS = ["Social", "Marketing", "Branding", "Print"] as const;
type GraphicSub = typeof GRAPHIC_SUB_TABS[number];

const GRAPHIC_CATEGORY_COLORS: Record<GraphicItem["category"], string> = {
  Social: "text-[#78A0FF]",
  Marketing: "text-[#FF8CB4]",
  Branding: "text-[#FFD250]",
  Print: "text-[#78FFA0]",
};

const PROTOTYPE_CARDS: PlaceholderCard[] = [
  { kind: "placeholder", n: "01", label: "Coming soon", tag: "Mobile App UI", gradient: "from-[#1a1040] via-[#0B0B0D] to-[#0e0830]", accent: "rgba(180,180,255,0.16)" },
  { kind: "placeholder", n: "02", label: "Coming soon", tag: "Dashboard", gradient: "from-[#0d1a35] via-[#0B0B0D] to-[#080f25]", accent: "rgba(120,160,255,0.14)" },
  { kind: "placeholder", n: "03", label: "Coming soon", tag: "Landing Page", gradient: "from-[#1c0d30] via-[#0B0B0D] to-[#120820]", accent: "rgba(200,150,255,0.13)" },
  { kind: "placeholder", n: "04", label: "Coming soon", tag: "E-Commerce", gradient: "from-[#0a1a20] via-[#0B0B0D] to-[#060e18]", accent: "rgba(100,180,255,0.13)" },
];

const AUTOMATION_CARDS: PlaceholderCard[] = [
  { kind: "placeholder", n: "01", label: "Coming soon", tag: "Workflow", gradient: "from-[#0a1a10] via-[#0B0B0D] to-[#060f09]", accent: "rgba(120,255,160,0.14)" },
  { kind: "placeholder", n: "02", label: "Coming soon", tag: "AI Agent", gradient: "from-[#1a1200] via-[#0B0B0D] to-[#0f0c00]", accent: "rgba(255,210,80,0.12)" },
  { kind: "placeholder", n: "03", label: "Coming soon", tag: "Integration", gradient: "from-[#0d1a35] via-[#0B0B0D] to-[#080f25]", accent: "rgba(140,160,255,0.14)" },
  { kind: "placeholder", n: "04", label: "Coming soon", tag: "Chatbot", gradient: "from-[#1c0d30] via-[#0B0B0D] to-[#120820]", accent: "rgba(200,150,255,0.13)" },
];

// ─── Tab config ───────────────────────────────────────────────────────────────

type Tab = { id: string; label: string };
const TABS: Tab[] = [
  { id: "websites", label: "Websites" },
  { id: "graphics", label: "Graphics" },
  { id: "corporates", label: "Corporates" },
  { id: "prototypes", label: "Prototypes" },
  { id: "automation", label: "Automation" },
];

const WEB_SUB_TABS = ["All", "Purpose", "Creative"];

// ─── Card components ──────────────────────────────────────────────────────────

function WebCard({ project, i, total }: { project: WebProject; i: number; total: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: i * 0.06, ease: easeStudio }}
      className="group relative flex flex-col"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-video border border-[color:var(--color-line)]">
        <div className="absolute inset-0 bg-[#0B0B0D]">
          {project.preview ? (
            <>
              <img
                src={project.preview}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,13,0.55)] via-transparent to-transparent" />
            </>
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full blur-[60px]" style={{ background: project.accent }} />
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(245,242,236,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,242,236,0.03) 1px,transparent 1px)`,
                backgroundSize: "32px 32px",
              }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-extrabold text-4xl md:text-5xl tracking-[-0.04em] text-white/[0.08] select-none">{project.title}</span>
              </div>
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-[color:var(--color-accent)] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none rounded-2xl" />
        <div className="absolute top-5 left-5 font-mono text-xs text-[color:var(--color-ink-faint)] bg-[rgba(11,11,13,0.6)] px-2 py-1 rounded-full">
          {project.n}
        </div>
        <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-[rgba(11,11,13,0.6)] border border-[color:var(--color-line-strong)]">
          <span className="font-mono text-[10px] text-[color:var(--color-ink-faint)] tracking-[0.12em] uppercase">{project.sub}</span>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-5 right-5 px-3 py-1.5 rounded-full bg-[color:var(--color-accent-soft)] border border-[color:var(--color-accent)]/20 hover:bg-[color:var(--color-accent)] hover:border-[color:var(--color-accent)] group/link transition-colors duration-300"
          style={{ pointerEvents: "auto" }}
        >
          <span className="font-mono text-[10px] text-[color:var(--color-accent)] group-hover/link:text-[color:var(--color-bg)] tracking-[0.12em] uppercase transition-colors duration-300">
            Visit site →
          </span>
        </a>
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-meta mb-1">{project.sub} · {project.year}</p>
          <h3 className="font-display font-bold text-2xl md:text-3xl tracking-[-0.025em] text-[color:var(--color-ink-dim)] group-hover:text-[color:var(--color-ink)] transition-colors duration-300">
            {project.title}
          </h3>
        </div>
        <span className="font-mono text-xs text-[color:var(--color-ink-faint)] shrink-0">
          {project.n} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}

function GraphicCard({ item, i }: { item: GraphicItem; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: i * 0.05, ease: easeStudio }}
      className="group relative flex flex-col"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4] border border-[color:var(--color-line)] bg-[#0B0B0D]">
        <img
          src={item.src}
          alt={item.label}
          className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,13,0.65)] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[color:var(--color-accent)] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none rounded-2xl" />
        <div className="absolute top-4 left-4 font-mono text-[10px] text-[color:var(--color-ink-faint)] bg-[rgba(11,11,13,0.5)] backdrop-blur-sm px-2 py-1 rounded-full">
          {item.n}
        </div>
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[color:var(--color-line-strong)]">
          <span className={`font-mono text-[10px] tracking-[0.12em] uppercase ${GRAPHIC_CATEGORY_COLORS[item.category]}`}>
            {item.category}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-display font-bold text-lg tracking-[-0.02em] text-[color:var(--color-ink-dim)] group-hover:text-[color:var(--color-ink)] transition-colors duration-300">
          {item.label}
        </h3>
      </div>
    </motion.div>
  );
}

function DeckCardEl({ deck, i }: { deck: DeckCard; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: easeStudio }}
      className="group relative flex flex-col"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-video border border-[color:var(--color-line)]">
        <img
          src={deck.cover}
          alt={deck.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,13,0.60)] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[color:var(--color-accent)] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none rounded-2xl" />
        <div className="absolute top-4 left-4 font-mono text-[10px] text-[color:var(--color-ink-faint)] bg-[rgba(11,11,13,0.5)] backdrop-blur-sm px-2 py-1 rounded-full">
          {deck.n}
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 rounded-full bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[color:var(--color-line-strong)] font-mono text-[10px] text-[color:var(--color-ink-faint)] tracking-[0.1em] uppercase">
            PPT · {deck.slideCount} Slides
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-meta mb-1">{deck.type}</p>
          <h3 className="font-display font-bold text-xl md:text-2xl tracking-[-0.02em] text-[color:var(--color-ink-dim)] group-hover:text-[color:var(--color-ink)] transition-colors duration-300">
            {deck.title}
          </h3>
        </div>
        <Link
          to={`/corporate?deck=${deck.id}`}
          className="inline-flex items-center gap-2 text-[color:var(--color-accent)] text-sm font-semibold hover:gap-4 transition-all duration-300 shrink-0"
          data-cursor="link"
        >
          View Deck
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7h9m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

function PlaceholderCardEl({ card, i, total }: { card: PlaceholderCard; i: number; total: number }) {
  const aspect = card.aspect ?? "aspect-[4/3]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: i * 0.06, ease: easeStudio }}
      className="group relative flex flex-col"
    >
      <div className={`relative overflow-hidden rounded-2xl ${aspect} border border-[color:var(--color-line)]`}>
        <div className="absolute inset-0">
          <div className={`w-full h-full bg-gradient-to-br ${card.gradient}`}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full blur-[60px]" style={{ background: card.accent }} />
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(245,242,236,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,242,236,0.03) 1px,transparent 1px)`,
              backgroundSize: "36px 36px",
            }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-15">
              <div className="w-10 h-10 rounded-full border border-[color:var(--color-line-strong)]" />
              <div className="w-16 h-[1px] bg-[color:var(--color-line-strong)]" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[color:var(--color-accent)] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none rounded-2xl" />
        <div className="absolute top-4 left-4 font-mono text-[10px] text-[color:var(--color-ink-faint)] bg-[rgba(11,11,13,0.5)] px-2 py-1 rounded-full">
          {card.n}
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[color:var(--color-accent-soft)] border border-[color:var(--color-accent)]/20">
          <span className={`font-mono text-[10px] tracking-[0.12em] uppercase ${card.tagColor ?? "text-[color:var(--color-accent)]"}`}>
            {card.tag}
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-meta mb-1">{card.tag}</p>
          <h3 className="font-display font-bold text-xl md:text-2xl tracking-[-0.02em] text-[color:var(--color-ink-dim)] group-hover:text-[color:var(--color-ink)] transition-colors duration-300">
            {card.label}
          </h3>
        </div>
        <span className="font-mono text-xs text-[color:var(--color-ink-faint)] shrink-0">
          {card.n} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("websites");
  const [activeSub, setActiveSub] = useState("All");
  const [activeGraphicSub, setActiveGraphicSub] = useState<GraphicSub>("Social");

  // Preload all graphic images so filter switches are instant
  useEffect(() => {
    GRAPHIC_ITEMS.forEach(item => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent<string>).detail;
      setActiveTab(tab);
      setActiveSub("All");
      setActiveGraphicSub("Social");
    };
    window.addEventListener("nirmaan:set-tab", handler);
    return () => window.removeEventListener("nirmaan:set-tab", handler);
  }, []);

  function handleTabChange(id: string) {
    setActiveTab(id);
    setActiveSub("All");
    setActiveGraphicSub("Social");
  }

  const webVisible = WEB_PROJECTS.filter((p) =>
    activeSub === "All" ? true : p.sub === activeSub
  );

  const graphicVisible = GRAPHIC_ITEMS.filter(item => item.category === activeGraphicSub);

  const gridCols =
    activeTab === "graphics"
      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : "grid-cols-1 md:grid-cols-2";

  return (
    <section id="work" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        <div className="absolute top-1/3 right-[-10%] w-[600px] h-[600px] rounded-full bg-[color:var(--color-accent)] opacity-[0.04] blur-[150px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeStudio }}
              className="text-eyebrow mb-4 block"
            >
              <span className="text-[color:var(--color-accent)]">01</span> — Selected Work
            </motion.span>
            <SplitText
              text="Our work"
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
            Everything we build — websites, graphics, decks, prototypes, and automations.
          </motion.p>
        </div>

        {/* ── Tab bar ── */}
        <div className="mb-10 md:mb-14 flex flex-col gap-4">
          {/* Level 1 — service tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 rounded-full text-[12px] font-semibold tracking-[0.04em] transition-colors duration-200 ${activeTab === tab.id
                    ? "bg-[color:var(--color-accent)] text-[color:var(--color-bg)]"
                    : "border border-[color:var(--color-line-strong)] text-[color:var(--color-ink-faint)] hover:text-[color:var(--color-ink)] hover:border-[color:var(--color-ink-faint)]"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Level 2 — website sub-tabs */}
          {activeTab === "websites" && (
            <div className="flex items-center gap-2 flex-wrap pl-1">
              <span className="font-mono text-[10px] text-[color:var(--color-ink-faint)] tracking-[0.1em] uppercase mr-1">Filter:</span>
              {WEB_SUB_TABS.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSub(sub)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-[0.03em] transition-colors duration-200 ${activeSub === sub
                      ? "bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)] border border-[color:var(--color-accent)]/30"
                      : "text-[color:var(--color-ink-faint)] hover:text-[color:var(--color-ink-dim)]"
                    }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Level 2 — graphics sub-tabs */}
          {activeTab === "graphics" && (
            <div className="flex items-center gap-2 flex-wrap pl-1">
              <span className="font-mono text-[10px] text-[color:var(--color-ink-faint)] tracking-[0.1em] uppercase mr-1">Filter:</span>
              {GRAPHIC_SUB_TABS.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveGraphicSub(sub)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-[0.03em] transition-colors duration-200 ${activeGraphicSub === sub
                      ? "bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)] border border-[color:var(--color-accent)]/30"
                      : "text-[color:var(--color-ink-faint)] hover:text-[color:var(--color-ink-dim)]"
                    }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Grid ── */}
        <div className={`grid ${gridCols} gap-5 md:gap-8`}>
          {activeTab === "websites" && webVisible.map((p, i) => (
            <WebCard key={p.n} project={p} i={i} total={webVisible.length} />
          ))}

          {activeTab === "graphics" && graphicVisible.map((item, i) => (
            <GraphicCard key={item.n} item={item} i={i} />
          ))}

          {activeTab === "corporates" && DECKS.map((deck, i) => (
            <DeckCardEl key={deck.n} deck={deck} i={i} />
          ))}

          {activeTab === "prototypes" && PROTOTYPE_CARDS.map((c, i) => (
            <PlaceholderCardEl key={c.n} card={c} i={i} total={PROTOTYPE_CARDS.length} />
          ))}

          {activeTab === "automation" && AUTOMATION_CARDS.map((c, i) => (
            <PlaceholderCardEl key={c.n} card={c} i={i} total={AUTOMATION_CARDS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
