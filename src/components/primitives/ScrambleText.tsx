import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type ScrambleTextProps = {
  text: string;
  className?: string;
  duration?: number;
  trigger?: "hover" | "mount" | "view";
  as?: "span" | "div" | "p";
};

export default function ScrambleText({
  text,
  className = "",
  duration = 500,
  trigger = "hover",
  as: Tag = "span",
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const run = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const revealCount = Math.floor(progress * text.length);

      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealCount || text[i] === " ") {
          out += text[i];
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplay(out);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === "mount") run();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlers =
    trigger === "hover"
      ? { onMouseEnter: run, onFocus: run }
      : {};

  return (
    <Tag className={className} {...handlers}>
      {display}
    </Tag>
  );
}
