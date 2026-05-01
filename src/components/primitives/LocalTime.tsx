import { useEffect, useRef } from "react";

export default function LocalTime({ className = "" }: { className?: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });

    const update = () => {
      if (spanRef.current) {
        spanRef.current.textContent = fmt.format(new Date());
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`text-meta tabular-nums ${className}`}>
      <span className="text-[color:var(--color-ink-faint)]">IST</span>{" "}
      <span ref={spanRef} className="text-[color:var(--color-ink)]">—</span>
    </span>
  );
}
