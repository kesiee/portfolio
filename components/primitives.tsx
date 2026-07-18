"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
  type Variants,
} from "framer-motion";

/* Standard reveal — quiet, confident: y 12→0, 0.5s, ease-out-expo */
const EASE = [0.22, 1, 0.36, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.06 },
  }),
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={revealVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Numbered, mono, paper-style section header on a hairline rule */
export function SectionHeader({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <Reveal className="mb-14">
      <div className="hairline pt-4">
        <span
          className="block text-xs tracking-[0.18em] uppercase"
          style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
        >
          {index} — {label}
        </span>
      </div>
      <h2
        className="mt-4 text-2xl sm:text-4xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--text)",
        }}
      >
        {title}
      </h2>
    </Reveal>
  );
}

/* Count-up metric value; snaps to final under reduced-motion */
export function MetricCounter({
  target,
  text,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  style,
}: {
  target?: number;
  text?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (text !== undefined || target === undefined || !inView) return;
    if (reduce) {
      setVal(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 0.9,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, target, text, reduce]);

  const display = text !== undefined ? text : val.toFixed(decimals);
  return (
    <span ref={ref} className={`tnum ${className ?? ""}`} style={style}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ── Spark: small scroll-drawn SVG figures. Meaning by hue + line style.
   accent (blue) = model / predicted ; success (green) = actual / ground truth ── */
export function Spark({
  variant,
  className,
}: {
  variant: "forecast" | "stability" | "roc" | "bars";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const draw = inView || reduce;

  const W = 168;
  const H = 56;

  const pathAnim = (delay = 0) => ({
    initial: reduce ? { pathLength: 1 } : { pathLength: 0 },
    animate: draw ? { pathLength: 1 } : { pathLength: 0 },
    transition: { duration: reduce ? 0 : 1, ease: EASE, delay },
  });

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      width={W}
      height={H}
      role="img"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {variant === "forecast" && (
        <>
          {/* now divider */}
          <line
            x1={104}
            y1={4}
            x2={104}
            y2={H - 4}
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray="2 3"
          />
          {/* confidence cone */}
          <motion.path
            d="M104 30 L164 14 L164 46 L104 30 Z"
            fill="var(--accent)"
            initial={{ opacity: 0 }}
            animate={draw ? { opacity: 0.12 } : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.9 }}
          />
          {/* actual (ground truth) */}
          <motion.path
            d="M4 40 C 24 20, 40 44, 56 30 S 88 18, 104 30"
            fill="none"
            stroke="var(--success)"
            strokeWidth={2}
            strokeLinecap="round"
            {...pathAnim(0)}
          />
          {/* predicted, continuing past 'now' dashed */}
          <motion.path
            d="M104 30 C 122 26, 144 20, 164 16"
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2}
            strokeDasharray="4 4"
            strokeLinecap="round"
            {...pathAnim(0.4)}
          />
        </>
      )}

      {variant === "stability" && (
        <>
          {/* per-meter features hold flat (accent) */}
          <motion.path
            d="M6 22 L46 20 L86 23 L126 21 L162 22"
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2}
            strokeLinecap="round"
            {...pathAnim(0)}
          />
          {/* clustering collapses (faint) */}
          <motion.path
            d="M6 26 L46 34 L86 42 L126 50 L162 52"
            fill="none"
            stroke="var(--faint)"
            strokeWidth={2}
            strokeDasharray="4 4"
            strokeLinecap="round"
            {...pathAnim(0.3)}
          />
        </>
      )}

      {variant === "roc" && (
        <>
          <line
            x1={6}
            y1={H - 6}
            x2={W - 6}
            y2={6}
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray="2 3"
          />
          <motion.path
            d="M6 50 C 20 20, 60 10, 162 8"
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2}
            strokeLinecap="round"
            {...pathAnim(0)}
          />
        </>
      )}

      {variant === "bars" && (
        <>
          {[0.5, 0.7, 0.55, 0.85, 0.95].map((h, i) => (
            <motion.rect
              key={i}
              x={8 + i * 32}
              width={18}
              rx={1}
              fill="var(--accent)"
              initial={{ height: 0, y: H - 6 }}
              animate={
                draw
                  ? { height: h * (H - 12), y: H - 6 - h * (H - 12) }
                  : { height: 0, y: H - 6 }
              }
              transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : i * 0.08, ease: EASE }}
            />
          ))}
        </>
      )}
    </svg>
  );
}
