"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { publications } from "@/lib/data";

export default function Publications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="publications"
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
            Research
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Publications
          </h2>
        </motion.div>

        <div className="space-y-6 max-w-4xl">
          {publications.map((pub, i) => (
            <motion.article
              key={pub.doi}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex gap-5 p-6 rounded-2xl border cursor-pointer transition-all duration-200 hover:border-amber-500/30"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderLeft: "4px solid var(--amber)",
              }}
              onClick={() => window.open(pub.doi, "_blank", "noopener,noreferrer")}
            >
              <div className="flex-1 space-y-3">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded"
                    style={{
                      backgroundColor: "rgba(245, 158, 11, 0.12)",
                      color: "var(--amber)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {pub.journal} &middot; {pub.year}
                  </span>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: "rgba(45, 212, 191, 0.3)",
                      color: "var(--teal)",
                      backgroundColor: "rgba(45, 212, 191, 0.08)",
                    }}
                  >
                    {pub.note}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-base font-semibold leading-relaxed"
                  style={{ color: "var(--text)", textAlign: "justify" }}
                >
                  {pub.title}
                </h3>

                {/* DOI link */}
                <a
                  href={pub.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-70"
                  style={{ color: "var(--teal)" }}
                >
                  View Publication
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
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
