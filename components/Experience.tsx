"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/lib/data";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 sm:py-32"
      style={{ backgroundColor: "var(--bg)" }}
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
            Experience
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 md:left-8 top-0 bottom-0 w-px"
            style={{ backgroundColor: "var(--border)" }}
          />

          <div className="space-y-12">
            {experience.map((job, i) => (
              <motion.div
                key={`${job.company}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-12 md:pl-24"
              >
                {/* Dot marker */}
                <div
                  className="absolute left-2.5 md:left-6 top-2 w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor: "var(--amber)",
                    borderColor: "var(--bg)",
                    boxShadow: "0 0 8px rgba(245, 158, 11, 0.5)",
                  }}
                />

                <div
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3
                        className="text-lg font-bold"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--text)",
                        }}
                      >
                        {job.role}
                      </h3>
                      <p
                        className="text-sm font-semibold mt-0.5"
                        style={{ color: "var(--amber)" }}
                      >
                        {job.focus}
                      </p>
                      <p
                        className="text-sm mt-1"
                        style={{ color: "var(--muted)" }}
                      >
                        {job.company} &middot; {job.location}
                      </p>
                    </div>
                    <span
                      className="text-xs font-medium px-3 py-1.5 rounded-full border shrink-0"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--muted)",
                        fontFamily: "var(--font-mono)",
                        backgroundColor: "var(--surface)",
                      }}
                    >
                      {job.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {job.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3">
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: "var(--amber)" }}
                        />
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--muted)" }}
                        >
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
