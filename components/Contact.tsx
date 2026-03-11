"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personal } from "@/lib/data";

// Social links with inline SVG icons
const socialLinks = [
  {
    label: "GitHub",
    href: personal.github,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: personal.linkedin,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${personal.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "ORCiD",
    href: personal.orcid,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.516.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.003-3.722h-2.316z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
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
            Contact
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Get In Touch
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: info + social links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              I am actively seeking Data Scientist and ML Engineer roles. Whether
              you have a role, a project collaboration, or just want to connect —
              my inbox is open.
            </p>

            {/* Email direct */}
            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                Direct Email
              </p>
              <a
                href={`mailto:${personal.email}`}
                className="text-lg font-semibold transition-colors duration-200 hover:opacity-70"
                style={{ color: "var(--amber)" }}
              >
                {personal.email}
              </a>
            </div>

            {/* Phone */}
            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                Phone
              </p>
              <a
                href={`tel:${personal.phone}`}
                className="text-base font-medium transition-colors duration-200 hover:opacity-70"
                style={{ color: "var(--text)" }}
              >
                {personal.phone}
              </a>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                Find Me Online
              </p>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-3 text-sm font-medium transition-all duration-200 group"
                    style={{ color: "var(--muted)" }}
                  >
                    <span
                      className="flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 group-hover:border-amber-500 group-hover:text-amber-400"
                      style={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                      }}
                    >
                      {link.icon}
                    </span>
                    <span className="group-hover:text-amber-400 transition-colors duration-200">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6 rounded-2xl border"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text)" }}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    fontFamily: "var(--font-body)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--amber)";
                    e.target.style.boxShadow = "0 0 0 2px rgba(245, 158, 11, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text)" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    fontFamily: "var(--font-body)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--amber)";
                    e.target.style.boxShadow = "0 0 0 2px rgba(245, 158, 11, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about the role or project..."
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    fontFamily: "var(--font-body)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--amber)";
                    e.target.style.boxShadow = "0 0 0 2px rgba(245, 158, 11, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {status === "success" ? (
                <div
                  className="w-full py-3 rounded-lg text-sm font-semibold text-center"
                  style={{
                    backgroundColor: "rgba(45, 212, 191, 0.12)",
                    border: "1px solid rgba(45, 212, 191, 0.3)",
                    color: "var(--teal)",
                  }}
                >
                  ✓ Message sent — I&apos;ll be in touch soon!
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                  style={{
                    backgroundColor: "var(--amber)",
                    color: "var(--bg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              )}

              {status === "error" && (
                <p className="text-xs text-center" style={{ color: "#f87171" }}>
                  Something went wrong — try emailing directly at {personal.email}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
