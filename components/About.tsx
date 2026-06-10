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
            ML Engineer and Data Scientist with 2.7+ years building end-to-end
            forecasting, anomaly-detection, and LLM systems for real-world
            infrastructure. Background in data engineering (Spark / AWS / Azure
            Databricks) evolved into full ML system design — from ETL pipelines
            and clustering research to model training, evaluation, and
            production deployment.
          </p>
          <p>
            Delivered an energy prediction system for 91 buildings at Fort
            Moore (R&sup2; 0.82 &rarr; 0.98) to US Ignite, processed 1.2M+
            time-series records on Azure Databricks, and proposed the Bollinger
            Band fault-detection method that benchmarked at 97% accuracy on the
            LEAD dataset. First author on IEEE Access 2026, co-author on IEEE
            AIRC 2025.
          </p>
          <p>
            Now a Research Intern at Columbus State University extending the
            GMM soft-clustering work on ASHRAE GEP-III (1,400 buildings, 2,374
            meters) toward an AIRC follow-up — while shipping side: llmgate
            (PyPI, 21 LLM providers), JobHunt (200K+ jobs live on Vercel), a
            Resume Tailoring SaaS, and a controlled gated-Transformer FFN
            research study. STEM OPT authorized through 02/2029.
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
