import { useEffect, useRef } from "react";

type Variant = "default" | "view" | "drag" | "link";

const RING_SIZES: Record<Variant, number> = {
  default: 32,
  link: 48,
  view: 84,
  drag: 84,
};

export default function Cursor() {
  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 || "ontouchstart" in window);

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const variantRef = useRef<Variant>("default");
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);

  useEffect(() => {
    if (isMobile) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const applyVariant = (v: Variant) => {
      if (variantRef.current === v) return;
      variantRef.current = v;

      const size = RING_SIZES[v];
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.marginLeft = `-${size / 2}px`;
      ring.style.marginTop = `-${size / 2}px`;

      const filled = v === "view" || v === "drag";
      ring.style.backgroundColor = filled ? "var(--color-accent)" : "transparent";
      ring.style.borderColor = filled ? "transparent" : "var(--color-accent-dim)";

      const label = ring.querySelector<HTMLSpanElement>(".cursor-label");
      if (label) {
        label.textContent = v === "view" ? "VIEW" : v === "drag" ? "DRAG" : "";
      }

      dot.style.opacity = filled ? "0" : "1";
    };

    const move = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const tagged = el.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        applyVariant((tagged.getAttribute("data-cursor") as Variant) || "link");
        return;
      }
      applyVariant(el.closest("a, button") ? "link" : "default");
    };

    const show = () => {
      ring.style.opacity = "1";
      dot.style.opacity = variantRef.current === "view" || variantRef.current === "drag" ? "0" : "1";
    };
    const hide = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    // Simple lerp loop — one rAF, no motion springs
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      const { x, y } = posRef.current;

      // Dot follows instantly
      dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;

      // Ring lerps behind
      ringPosRef.current.x = lerp(ringPosRef.current.x, x, 0.15);
      ringPosRef.current.y = lerp(ringPosRef.current.y, y, 0.15);
      ring.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* dot — follows cursor instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-[6px] h-[6px] rounded-full bg-[color:var(--color-accent)]"
        style={{ opacity: 0, willChange: "transform" }}
      />

      {/* ring — lerp-lagged */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border transition-[background-color,border-color,width,height] duration-200"
        style={{
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          opacity: 0,
          borderColor: "var(--color-accent-dim)",
          backgroundColor: "transparent",
          willChange: "transform",
        }}
      >
        <span className="cursor-label font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-bg)] font-semibold" />
      </div>
    </>
  );
}
