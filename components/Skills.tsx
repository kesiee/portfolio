"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
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
            Technical Skills
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            What I Work With
          </h2>
        </motion.div>

        {/* 2x2 skill grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {skills.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <h3
                className="text-sm font-bold tracking-widest uppercase mb-5"
                style={{
                  color: "var(--amber)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {group.category}
              </h3>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {group.items.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, scale: 0.85 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.3, ease: "easeOut" },
                      },
                    }}
                    whileHover={{ scale: 1.08 }}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border cursor-default transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--surface)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
