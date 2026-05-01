import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: "a" | "button" | "div";
  href?: string;
  onClick?: () => void;
  dataCursor?: string;
};

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  radius = 140,
  as = "a",
  href,
  onClick,
  dataCursor,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion[as] as typeof motion.a;

  return (
    <MotionTag
      ref={ref as never}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      data-cursor={dataCursor}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
