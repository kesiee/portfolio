"use client";

import { useState } from "react";
import { personal } from "@/lib/data";
import { Reveal, SectionHeader } from "@/components/primitives";

const contactRows = [
  { k: "Email", v: personal.email, href: `mailto:${personal.email}` },
  { k: "Phone", v: personal.phone, href: `tel:${personal.phone}` },
  { k: "GitHub", v: "github.com/kesiee", href: personal.github },
  { k: "LinkedIn", v: "in/shashankkammanahalli", href: personal.linkedin },
  { k: "ORCiD", v: "0009-0004-4676-5014", href: personal.orcid },
];

const inputStyle: React.CSSProperties = {
  backgroundColor: "var(--surface)",
  border: "1px solid var(--border)",
  color: "var(--text)",
  fontFamily: "var(--font-body)",
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="06" label="Contact" title="Open to Data Scientist & ML roles" />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: contact block */}
          <Reveal>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
              Actively interviewing for Data Scientist and ML Engineer roles.
              Fastest path is email — the résumé and IEEE paper are one click away.
            </p>
            <dl>
              {contactRows.map((row) => (
                <a
                  key={row.k}
                  href={row.href}
                  target={row.href.startsWith("mailto") || row.href.startsWith("tel") ? undefined : "_blank"}
                  rel={row.href.startsWith("mailto") || row.href.startsWith("tel") ? undefined : "noopener noreferrer"}
                  className="grid grid-cols-3 gap-3 py-3 border-b transition-colors duration-200 group"
                  style={{ borderColor: "var(--border)" }}
                >
                  <dt
                    className="col-span-1 text-xs tracking-[0.08em] uppercase pt-0.5"
                    style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
                  >
                    {row.k}
                  </dt>
                  <dd
                    className="col-span-2 text-sm transition-colors duration-200 group-hover:text-[var(--accent)]"
                    style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}
                  >
                    {row.v}
                  </dd>
                </a>
              ))}
            </dl>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={1}>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6 rounded-lg border"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
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
                  className="w-full px-4 py-3 rounded-md text-sm"
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
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
                  className="w-full px-4 py-3 rounded-md text-sm"
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about the role or project…"
                  className="w-full px-4 py-3 rounded-md text-sm resize-none"
                  style={inputStyle}
                />
              </div>

              {status === "success" ? (
                <div
                  className="w-full py-3 rounded-md text-sm font-semibold text-center"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--success) 12%, transparent)",
                    border: "1px solid var(--success)",
                    color: "var(--success)",
                  }}
                >
                  ✓ Message sent — I&apos;ll be in touch soon.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-md text-sm font-semibold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                >
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              )}
              {status === "error" && (
                <p className="text-xs text-center" style={{ color: "#f87171" }}>
                  Something went wrong — email me directly at {personal.email}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
