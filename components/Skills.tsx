"use client";

import { skills } from "@/lib/data";
import { Reveal, SectionHeader } from "@/components/primitives";

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="02" label="Stack" title="What I work with" />

        <div>
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i}>
              <div
                className="grid sm:grid-cols-4 gap-3 sm:gap-6 py-5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <h3
                  className="sm:col-span-1 text-xs tracking-[0.1em] uppercase pt-0.5"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
                >
                  {group.category}
                </h3>
                <p
                  className="sm:col-span-3 text-[15px] leading-relaxed"
                  style={{ color: "var(--text)" }}
                >
                  {group.items.map((skill, j) => (
                    <span key={skill}>
                      {skill}
                      {j < group.items.length - 1 && (
                        <span style={{ color: "var(--faint)" }}> · </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
