"use client";

import { aboutLede, aboutBody, factSheet } from "@/lib/data";
import { Reveal, SectionHeader } from "@/components/primitives";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32" style={{ backgroundColor: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="01" label="About" title="Data scientist, published" />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Lede + body */}
          <Reveal className="lg:col-span-3">
            <p
              className="text-xl sm:text-2xl leading-snug mb-6"
              style={{ color: "var(--text)", letterSpacing: "-0.01em" }}
            >
              {aboutLede}
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              {aboutBody}
            </p>
          </Reveal>

          {/* Fact sheet */}
          <Reveal className="lg:col-span-2" delay={1}>
            <div className="hairline pt-4">
              <span
                className="text-xs tracking-[0.18em] uppercase"
                style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
              >
                Fact sheet
              </span>
              <dl className="mt-4">
                {factSheet.map((row) => (
                  <div
                    key={row.k}
                    className="grid grid-cols-3 gap-3 py-3 border-b"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <dt
                      className="col-span-1 text-xs tracking-[0.06em] uppercase"
                      style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
                    >
                      {row.k}
                    </dt>
                    <dd className="col-span-2 text-sm" style={{ color: "var(--text)" }}>
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
