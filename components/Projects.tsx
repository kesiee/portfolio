"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { impactProjects, otherProjects } from "@/lib/data";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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

        {/* ── Impact Projects (full cards) ── */}
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
                style={{ color: "var(--muted)" }}
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

        {/* ── Other Projects (compact list) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3
            className="text-lg font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text)",
            }}
          >
            More Projects
          </h3>

          <div className="space-y-4">
            {otherProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 p-4 rounded-xl border transition-all duration-200 hover:border-amber-500/30"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h4
                      className="text-sm font-bold truncate"
                      style={{ color: "var(--text)" }}
                    >
                      {project.title}
                    </h4>
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
                    style={{ color: "var(--muted)" }}
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
                >
                  View →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
