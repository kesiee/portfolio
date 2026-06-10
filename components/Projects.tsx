"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  impactProjects,
  otherProjects,
  projectCategories,
  type ProjectCategory,
} from "@/lib/data";

type FilterValue = "All" | ProjectCategory;

const FILTER_OPTIONS: FilterValue[] = ["All", ...projectCategories];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [filter, setFilter] = useState<FilterValue>("All");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === "All") return otherProjects;
    return otherProjects.filter((p) => p.category === filter);
  }, [filter]);

  const counts = useMemo(() => {
    const total = otherProjects.length;
    const byCat = projectCategories.reduce<Record<string, number>>(
      (acc, cat) => {
        acc[cat] = otherProjects.filter((p) => p.category === cat).length;
        return acc;
      },
      {},
    );
    return { All: total, ...byCat } as Record<FilterValue, number>;
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 sm:py-32"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span
            className="text-sm font-medium tracking-widest uppercase mb-3 block"
            style={{ color: "var(--amber)", fontFamily: "var(--font-mono)" }}
          >
            Projects
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            What I&apos;ve Built
          </h2>
        </motion.div>

        {/* ── Featured Projects (large cards) ── */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {impactProjects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(245, 158, 11, 0.15)",
              }}
              className="group flex flex-col p-6 rounded-2xl border transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
              onClick={() =>
                window.open(project.link, "_blank", "noopener,noreferrer")
              }
            >
              {/* Top row: subtitle + metric */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-xs font-medium"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {project.subtitle}
                </span>
                <span
                  className="text-xs font-bold px-2 py-1 rounded shrink-0 ml-3"
                  style={{
                    backgroundColor: "rgba(245, 158, 11, 0.12)",
                    color: "var(--amber)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {project.metric.label}: {project.metric.value}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text)",
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed flex-1 mb-5"
                style={{ color: "var(--muted)", textAlign: "justify" }}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      backgroundColor: "var(--surface)",
                      borderColor: "var(--border)",
                      color: "var(--muted)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-200 hover:opacity-80"
                style={{ color: "var(--teal)" }}
                onClick={(e) => e.stopPropagation()}
              >
                View Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.article>
          ))}
        </div>

        {/* ── More Projects with dropdown filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h3
                className="text-lg font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text)",
                }}
              >
                More Projects
              </h3>
              <p
                className="text-xs mt-1"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {filteredProjects.length} of {otherProjects.length} shown
              </p>
            </div>

            {/* Custom dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="inline-flex items-center justify-between gap-3 min-w-[220px] px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 hover:border-amber-500/40"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: open ? "var(--amber)" : "var(--border)",
                  color: "var(--text)",
                  fontFamily: "var(--font-body)",
                  boxShadow: open
                    ? "0 0 0 3px rgba(245, 158, 11, 0.12)"
                    : "none",
                }}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="text-[10px] tracking-widest uppercase"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Filter
                  </span>
                  <span>{filter}</span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: "var(--surface)",
                      color: "var(--muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {counts[filter]}
                  </span>
                </span>
                <motion.svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <path
                    d="M3 5l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </button>

              <AnimatePresence>
                {open && (
                  <motion.ul
                    role="listbox"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute z-20 right-0 mt-2 w-full min-w-[220px] rounded-lg border overflow-hidden"
                    style={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    {FILTER_OPTIONS.map((opt) => {
                      const active = opt === filter;
                      return (
                        <li
                          key={opt}
                          role="option"
                          aria-selected={active}
                          onClick={() => {
                            setFilter(opt);
                            setOpen(false);
                          }}
                          className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150"
                          style={{
                            backgroundColor: active
                              ? "rgba(245, 158, 11, 0.08)"
                              : "transparent",
                            color: active ? "var(--amber)" : "var(--text)",
                            fontFamily: "var(--font-body)",
                          }}
                          onMouseEnter={(e) => {
                            if (!active) {
                              e.currentTarget.style.backgroundColor =
                                "var(--surface)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!active) {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                            }
                          }}
                        >
                          <span className="flex items-center gap-2">
                            {active && (
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: "var(--amber)" }}
                              />
                            )}
                            <span className={active ? "" : "ml-3.5"}>
                              {opt}
                            </span>
                          </span>
                          <span
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: "var(--surface)",
                              color: "var(--muted)",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {counts[opt]}
                          </span>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 p-4 rounded-xl border transition-all duration-200 hover:border-amber-500/30 cursor-pointer"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                  onClick={() =>
                    window.open(project.link, "_blank", "noopener,noreferrer")
                  }
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-1.5">
                      <h4
                        className="text-sm font-bold"
                        style={{ color: "var(--text)" }}
                      >
                        {project.title}
                      </h4>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "rgba(45, 212, 191, 0.10)",
                          color: "var(--teal)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {project.category}
                      </span>
                      <div className="flex gap-1.5 shrink-0">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full border"
                            style={{
                              borderColor: "var(--border)",
                              color: "var(--muted)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--muted)", textAlign: "justify" }}
                    >
                      {project.description}
                    </p>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "var(--teal)" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View →
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <p
                className="text-sm text-center py-12"
                style={{ color: "var(--muted)" }}
              >
                No projects in this category yet.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
