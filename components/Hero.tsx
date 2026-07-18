"use client";

import { motion } from "framer-motion";
import { personal, heroMetrics } from "@/lib/data";
import { MetricCounter } from "@/components/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Measured grid — the signature backdrop */}
      <div className="measured-grid absolute inset-0 pointer-events-none opacity-70" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm tracking-[0.16em] uppercase mb-8"
            style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--success)" }}
              />
              Available
            </span>
            <span style={{ color: "var(--faint)" }}>/</span>
            <span>{personal.roleLine}</span>
            <span style={{ color: "var(--faint)" }}>/</span>
            <span>Atlanta, GA</span>
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={item}
            className="leading-[0.95]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 8.5vw, 104px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--text)",
            }}
          >
            {personal.firstName}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 3vw, 34px)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--muted)",
            }}
          >
            {personal.lastName}
          </motion.p>

          {/* Proof line */}
          <motion.p
            variants={item}
            className="mt-8 text-lg sm:text-xl leading-relaxed max-w-[46ch]"
            style={{ color: "var(--text)" }}
          >
            {personal.heroLine}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-3 text-sm max-w-[52ch]"
            style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
          >
            {personal.workAuth}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md transition-colors duration-200"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              View Résumé
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v7M4 6.5 7 9.5l3-3M2.5 12h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md border transition-colors duration-200"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              View Work →
            </a>
            <div className="flex items-center gap-1 ml-1">
              {[
                { label: "GitHub", href: personal.github },
                { label: "LinkedIn", href: personal.linkedin },
                { label: "ORCiD", href: personal.orcid },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-2 text-xs rounded-md transition-colors duration-200 hover:text-[var(--accent)]"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Metric strip — front-loaded proof */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14"
      >
        <div
          className="hairline pt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6"
        >
          {heroMetrics.map((m) => (
            <div key={m.label}>
              <div
                className="text-2xl sm:text-3xl"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--text)",
                }}
              >
                <MetricCounter
                  target={m.target}
                  text={m.text}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                />
              </div>
              <div
                className="mt-1.5 text-[11px] tracking-[0.08em] uppercase leading-tight"
                style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
