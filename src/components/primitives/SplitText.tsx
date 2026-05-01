import { motion, useInView } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { easeStudio } from "../../lib/easings";

type SplitTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  style?: CSSProperties;
  once?: boolean;
  blur?: boolean; // kept for API compat, but no longer applied
};

export default function SplitText({
  text,
  as: Tag = "span",
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.06,
  duration = 0.9,
  style,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ lineHeight: "inherit" }}
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: "110%", opacity: 0 }}
            animate={
              inView
                ? { y: "0%", opacity: 1 }
                : { y: "110%", opacity: 0 }
            }
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: easeStudio,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

