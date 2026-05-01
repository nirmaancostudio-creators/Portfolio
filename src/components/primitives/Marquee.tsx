import type { ReactNode, CSSProperties } from "react";

type MarqueeProps = {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
};

export default function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = "",
  pauseOnHover = false,
}: MarqueeProps) {
  const style: CSSProperties = {
    "--marquee-duration": `${speed}s`,
    animationDirection: reverse ? "reverse" : "normal",
  } as CSSProperties;

  const group = (
    <div className="marquee-track shrink-0 flex items-center gap-16 pr-16">
      {children}
    </div>
  );

  return (
    <div
      className={`relative w-full overflow-hidden ${className} ${
        pauseOnHover ? "marquee-pause-on-hover" : ""
      }`}
    >
      <div className="marquee-scroll flex w-max" style={style}>
        {group}
        {group}
      </div>
    </div>
  );
}
