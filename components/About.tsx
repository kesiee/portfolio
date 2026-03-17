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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Education cards */}
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
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
          </motion.div>

          {/* Right: Bio + OPT badge */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* OPT badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "rgba(45, 212, 191, 0.1)",
                border: "1px solid rgba(45, 212, 191, 0.25)",
                color: "var(--teal)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              OPT &middot; Work Authorized
            </div>

            <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              <p>
                I am an AI/ML Engineer and Data Scientist with a strong research
                background in energy systems, time-series forecasting, and anomaly
                detection. Currently completing my Master of Science in Applied Computer
                Science (Data Science) at Columbus State University with a 4.0 GPA.
              </p>
              <p>
                My work spans the full ML lifecycle — from raw data ingestion and
                large-scale feature engineering on 1.2M+ records with PySpark and
                Databricks, to deploying production-grade forecasting models achieving
                R² up to 0.98.
              </p>
              <p>
                As a 2x IEEE first-author researcher, I have published frameworks
                for energy fault detection and smart building ML systems, bridging
                academic rigor with production engineering realities.
              </p>
              <p>
                I thrive in environments where data complexity demands both engineering
                precision and statistical creativity — from distributed Spark pipelines
                to Kaggle competitions to peer-reviewed research.
              </p>
            </div>

            {/* Highlight row */}
            <div className="flex flex-wrap gap-3 pt-2">
              {["IEEE Published", "OPT Eligible", "4.0 GPA", "Open to Relocate"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full border"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      backgroundColor: "var(--card)",
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
