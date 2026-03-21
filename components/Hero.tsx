"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personal } from "@/lib/data";

const surnames = ["Kammanahalli Chandra Sekhara", "K C", "Kesiee"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function RotatingName() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = surnames[index];

    if (!isDeleting && displayed === current) {
      const timeout = setTimeout(() => setIsDeleting(true), 2400);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % surnames.length);
      return;
    }

    const speed = isDeleting ? 35 : 70;
    const timeout = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1),
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, index]);

  return (
    <>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        style={{ color: "var(--amber)" }}
      >
        |
      </motion.span>
    </>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-color) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Animated amber orb */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.07) 0%, transparent 70%)",
          top: "10%",
          left: "60%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Teal secondary orb */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(45, 212, 191, 0.05) 0%, transparent 70%)",
          bottom: "10%",
          right: "20%",
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Available badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border"
              style={{
                backgroundColor: "rgba(45, 212, 191, 0.08)",
                borderColor: "rgba(45, 212, 191, 0.25)",
                color: "var(--teal)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Available for OPT &middot; Data Scientist
            </span>
          </motion.div>

          {/* Big centered first name */}
          <motion.h1
            variants={itemVariants}
            className="leading-none tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(56px, 10vw, 96px)",
              fontWeight: 800,
              color: "var(--text)",
            }}
          >
            Shashank
          </motion.h1>

          {/* Typing surname — fixed height so nothing shifts */}
          <motion.div
            variants={itemVariants}
            className="mt-2 mb-6"
            style={{
              height: "clamp(36px, 5vw, 56px)",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 4vw, 44px)",
              fontWeight: 700,
              color: "var(--text)",
              opacity: 0.5,
            }}
          >
            <RotatingName />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl font-semibold mb-5"
            style={{ color: "var(--teal)", fontFamily: "var(--font-display)" }}
          >
            {personal.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg max-w-2xl mb-10 leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {personal.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: "var(--amber)",
                color: "var(--bg)",
                fontFamily: "var(--font-body)",
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.25)",
              }}
            >
              View Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-all duration-200 hover:scale-105"
              style={{
                color: "var(--amber)",
                borderColor: "var(--amber)",
                fontFamily: "var(--font-body)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-xs" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M5 12l5 5 5-5" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
