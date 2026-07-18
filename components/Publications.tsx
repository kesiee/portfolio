"use client";

import { publications } from "@/lib/data";
import { Reveal, SectionHeader } from "@/components/primitives";

export default function Publications() {
  return (
    <section id="publications" className="py-24 sm:py-32" style={{ backgroundColor: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="05" label="Research" title="Peer-reviewed publications" />

        <div>
          {publications.map((pub, i) => (
            <Reveal key={pub.doi} delay={i}>
              <a
                href={pub.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid md:grid-cols-12 gap-4 md:gap-8 py-8 border-b transition-colors duration-200"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="md:col-span-1">
                  <span
                    className="text-sm"
                    style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}
                  >
                    [{pub.index}]
                  </span>
                </div>
                <div className="md:col-span-11">
                  <h3
                    className="text-base sm:text-lg leading-snug transition-colors duration-200 group-hover:text-[var(--accent)]"
                    style={{ color: "var(--text)", fontWeight: 600 }}
                  >
                    {pub.title}
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                    {pub.authors}
                  </p>
                  <div
                    className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <span style={{ color: "var(--text)" }}>
                      {pub.journal} · {pub.year}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded"
                      style={{
                        color: pub.note === "First Author" ? "var(--accent)" : "var(--muted)",
                        border: `1px solid ${pub.note === "First Author" ? "var(--accent)" : "var(--border)"}`,
                      }}
                    >
                      {pub.note}
                    </span>
                    <span style={{ color: "var(--faint)" }}>doi:{pub.doiLabel}</span>
                  </div>
                  <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
                    <span style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}>
                      result ·{" "}
                    </span>
                    {pub.result}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
