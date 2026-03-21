"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education } from "@/lib/data";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
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
            About
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Who I Am
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 text-base leading-relaxed mb-12"
          style={{ color: "var(--muted)", textAlign: "justify" }}
        >
          <p>
            Data Scientist and ML Engineer with 3+ years of experience in
            time-series forecasting, clustering, anomaly detection, and scalable
            data pipelines for smart-building and energy systems.
          </p>
          <p>
            Led energy prediction research for 91 buildings at Fort Moore,
            coordinating with academic and industry stakeholders (US Ignite).
            First-author IEEE Access publication on ML-driven energy fault
            detection. Experienced with Python, PySpark, XGBoost, Azure
            Databricks, and AWS.
          </p>
          <p>
            Currently exploring LLM and RAG architectures. STEM OPT authorized
            through 02/2029.
          </p>
        </motion.div>

        {/* Education */}
        <div className="grid sm:grid-cols-2 gap-4">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: "var(--text)" }}
                  >
                    {edu.degree}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {edu.school} &middot; {edu.period}
                  </p>
                </div>
                {edu.gpa && (
                  <span
                    className="shrink-0 text-xs font-bold px-2 py-1 rounded"
                    style={{
                      backgroundColor: "rgba(245, 158, 11, 0.15)",
                      color: "var(--amber)",
                    }}
                  >
                    {edu.gpa}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
