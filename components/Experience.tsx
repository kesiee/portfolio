"use client";

import { experience } from "@/lib/data";
import { Reveal, SectionHeader } from "@/components/primitives";

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="04" label="Experience" title="Where I've worked" />

        <div>
          {experience.map((job, i) => (
            <Reveal key={`${job.company}-${i}`} delay={i}>
              <div
                className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                {/* Left rail: period + metric */}
                <div className="md:col-span-4">
                  <div
                    className="text-xs tracking-[0.08em] uppercase"
                    style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
                  >
                    {job.period}
                  </div>
                  <div
                    className="tnum mt-3 text-sm"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontWeight: 600 }}
                  >
                    {job.metric}
                  </div>
                </div>

                {/* Right: role + bullets */}
                <div className="md:col-span-8">
                  <h3
                    className="text-lg sm:text-xl"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text)" }}
                  >
                    {job.role}
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
                    {job.company} · {job.location}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
                  >
                    {job.focus}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {job.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3">
                        <span
                          className="mt-2 w-1 h-1 rounded-full shrink-0"
                          style={{ backgroundColor: "var(--accent)" }}
                        />
                        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
