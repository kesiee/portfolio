"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  impactProjects,
  otherProjects,
  projectCategories,
  type ProjectCategory,
} from "@/lib/data";
import { Reveal, SectionHeader, Spark } from "@/components/primitives";

type FilterValue = "All" | ProjectCategory;
const FILTER_OPTIONS: FilterValue[] = ["All", ...projectCategories];

export default function Projects() {
  const [filter, setFilter] = useState<FilterValue>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? otherProjects
        : otherProjects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <section id="projects" className="py-24 sm:py-32" style={{ backgroundColor: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="03" label="Work" title="Selected work, results first" />

        {/* ── Featured: figure blocks ── */}
        <div className="mb-20">
          {impactProjects.map((p, i) => (
            <Reveal key={p.title} delay={i}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid md:grid-cols-12 gap-6 md:gap-10 py-8 border-b transition-colors duration-200"
                style={{ borderColor: "var(--border)" }}
              >
                {/* Left: the figure */}
                <div className="md:col-span-4">
                  <div
                    className="text-[11px] tracking-[0.14em] uppercase mb-3"
                    style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
                  >
                    {p.fig}
                  </div>
                  <div
                    className="tnum text-2xl sm:text-[28px] leading-tight"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      color: "var(--text)",
                    }}
                  >
                    {p.result}
                  </div>
                  <div
                    className="mt-1.5 text-xs"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {p.resultLabel}
                  </div>
                  <div className="mt-5">
                    <Spark variant={p.spark} />
                  </div>
                </div>

                {/* Right: what it proves + detail */}
                <div className="md:col-span-8">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3
                      className="text-xl sm:text-2xl transition-colors duration-200 group-hover:text-[var(--accent)]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        color: "var(--text)",
                      }}
                    >
                      {p.title}
                    </h3>
                    <span
                      className="text-xs"
                      style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
                    >
                      {p.subtitle}
                    </span>
                  </div>
                  <p
                    className="mt-2 text-sm font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    {p.proves}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div
                      className="flex flex-wrap gap-x-3 gap-y-1 text-xs"
                      style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
                    >
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <span
                      className="text-xs font-semibold ml-auto transition-colors duration-200 group-hover:text-[var(--accent)]"
                      style={{ color: "var(--text)" }}
                    >
                      {p.linkLabel} →
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* ── More projects ── */}
        <Reveal>
          <div className="hairline pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <span
                className="text-xs tracking-[0.18em] uppercase"
                style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
              >
                More · {filtered.length} of {otherProjects.length}
              </span>
            </div>
            <label className="inline-flex items-center gap-2">
              <span
                className="text-[11px] tracking-[0.14em] uppercase"
                style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
              >
                Filter
              </span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterValue)}
                className="px-3 py-2 text-sm rounded-md border cursor-pointer"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {FILTER_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Reveal>

        <div>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.a
                key={p.title}
                layout
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group grid md:grid-cols-12 gap-3 md:gap-6 py-5 border-b transition-colors duration-200"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="md:col-span-3 flex flex-col gap-1.5">
                  <span
                    className="tnum text-sm"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontWeight: 600 }}
                  >
                    {p.metric}
                  </span>
                  <span
                    className="text-[11px] tracking-[0.08em] uppercase"
                    style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
                  >
                    {p.category}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h4
                    className="text-[15px] font-semibold transition-colors duration-200 group-hover:text-[var(--accent)]"
                    style={{ color: "var(--text)" }}
                  >
                    {p.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {p.description}
                  </p>
                  <div
                    className="mt-2 flex flex-wrap gap-x-3 text-xs"
                    style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
                  >
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
