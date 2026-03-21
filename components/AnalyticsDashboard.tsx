"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { computeGenderProbability, countryName } from "@/lib/analytics";
import { useTheme } from "@/components/ThemeProvider";

const VisitorGlobe = dynamic(() => import("@/components/VisitorGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square max-w-md mx-auto flex items-center justify-center">
      <div
        className="w-8 h-8 border-2 rounded-full animate-spin"
        style={{ borderColor: "var(--border)", borderTopColor: "var(--amber)" }}
      />
    </div>
  ),
});

/* ---------- types ---------- */
interface OverviewData {
  total: number;
  unique: number;
  countries: Record<string, number>;
  pages: Record<string, number>;
  daily: Record<string, number>;
}

type DrillLevel = "countries" | "regions" | "cities";

/* ---------- helpers ---------- */
function sorted(obj: Record<string, number>) {
  return Object.entries(obj).sort(([, a], [, b]) => b - a);
}

function filterPages(pages: Record<string, number>) {
  return Object.fromEntries(
    Object.entries(pages).filter(
      ([path]) => !path.includes("/view") && !path.startsWith("/api/") && !/^\/[a-f0-9]{16}/.test(path),
    ),
  );
}

function pct(value: number, max: number) {
  return max === 0 ? 0 : Math.round((value / max) * 100);
}

/* ---------- animated counter ---------- */
function AnimatedNumber({ target, duration = 1.2 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const start = ref.current;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = (now - startTime) / (duration * 1000);
      if (elapsed >= 1) {
        setCurrent(target);
        ref.current = target;
        return;
      }
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - elapsed, 3);
      const val = Math.round(start + diff * ease);
      setCurrent(val);
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return <>{current.toLocaleString()}</>;
}

/* ---------- live pulse ---------- */
function LivePulse() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: "var(--teal)" }}
        />
        <span
          className="relative inline-flex rounded-full h-2.5 w-2.5"
          style={{ backgroundColor: "var(--teal)" }}
        />
      </span>
      <span
        className="text-xs font-medium uppercase tracking-wider"
        style={{ color: "var(--teal)", fontFamily: "var(--font-mono)" }}
      >
        Live
      </span>
    </span>
  );
}

/* ---------- SVG icons for stat cards ---------- */
function EyeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

/* ---------- stat card with animated number + icon ---------- */
function StatCard({
  label,
  value,
  icon,
  delay,
  glow,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  delay: number;
  glow?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="relative p-5 rounded-xl border overflow-hidden group text-center"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glow || "rgba(245,158,11,0.06)"}, transparent 70%)`,
        }}
      />
      <div className="relative flex flex-col items-center">
        <div className="mb-2" style={{ color: "var(--amber)" }}>
          {icon}
        </div>
        <div
          className="text-3xl font-extrabold mb-1 tabular-nums"
          style={{ color: "var(--amber)", fontFamily: "var(--font-display)" }}
        >
          <AnimatedNumber target={value} />
        </div>
        <div className="text-sm" style={{ color: "var(--muted)" }}>
          {label}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- bar ---------- */
function Bar({
  label,
  value,
  max,
  onClick,
  clickable,
}: {
  label: string;
  value: number;
  max: number;
  onClick?: () => void;
  clickable?: boolean;
}) {
  const width = pct(value, max);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!clickable}
      className={`w-full text-left group ${clickable ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={`text-sm font-medium ${clickable ? "group-hover:text-amber-400" : ""}`}
          style={{ color: "var(--text)", transition: "color 0.15s" }}
        >
          {label}
          {clickable && (
            <span className="ml-1 text-xs" style={{ color: "var(--muted)" }}>
              ▸
            </span>
          )}
        </span>
        <span
          className="text-xs tabular-nums"
          style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
        >
          {value.toLocaleString()}
        </span>
      </div>
      <div
        className="h-2.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--border)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, var(--amber), var(--teal))",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </button>
  );
}

/* ---------- daily chart ---------- */
function DailyChart({ daily }: { daily: Record<string, number> }) {
  const entries = Object.entries(daily);
  const max = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="flex items-end gap-[3px] h-32">
      {entries.map(([date, count], i) => {
        const h = Math.max((count / max) * 100, 3);
        return (
          <motion.div
            key={date}
            className="flex-1 rounded-t relative group"
            style={{
              background: count > 0
                ? "linear-gradient(180deg, var(--amber), rgba(245,158,11,0.3))"
                : "var(--border)",
            }}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.5, delay: i * 0.015 }}
          >
            {/* Tooltip */}
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
              style={{
                backgroundColor: "var(--card)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {date.slice(5)}: {count}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ---------- gender widget ---------- */
function GenderWidget({ countries }: { countries: Record<string, number> }) {
  const { male, female, other } = computeGenderProbability(countries);
  const segments = [
    { label: "Male", value: male, color: "#3b82f6", icon: "♂" },
    { label: "Female", value: female, color: "#ec4899", icon: "♀" },
    { label: "Other", value: other, color: "#a855f7", icon: "⚧" },
  ];

  return (
    <div
      className="p-5 rounded-xl border h-full"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
    >
      <h3
        className="text-sm font-semibold mb-5"
        style={{ color: "var(--text)" }}
      >
        Estimated Gender Split
      </h3>

      {/* Donut-style ring segments */}
      <div className="flex justify-center mb-5">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            {segments.reduce<{ offset: number; elements: React.ReactNode[] }>(
              (acc, s, i) => {
                const dash = s.value * 0.94; // leave small gap
                acc.elements.push(
                  <motion.circle
                    key={s.label}
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke={s.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${100 - dash}`}
                    strokeDashoffset={-acc.offset}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                  />
                );
                acc.offset += s.value;
                return acc;
              },
              { offset: 0, elements: [] },
            ).elements}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-lg font-bold"
              style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}
            >
              {male}%
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                {s.icon} {s.label}
              </span>
            </div>
            <span
              className="text-xs font-semibold tabular-nums"
              style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}
            >
              {s.value}%
            </span>
          </div>
        ))}
      </div>

      <p
        className="text-[10px] mt-4 leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        Based on ITU regional internet-usage demographics weighted by visitor
        country. For fun only — not individual data.
      </p>
    </div>
  );
}

/* ---------- floating particles ---------- */
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            backgroundColor: i % 2 === 0 ? "var(--amber)" : "var(--teal)",
            opacity: 0.15,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -(Math.random() * 80 + 40), 0],
            x: [0, (Math.random() - 0.5) * 60, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}

/* ========== main dashboard ========== */
export default function AnalyticsDashboard() {
  const { theme, toggleTheme } = useTheme();
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [drillLevel, setDrillLevel] = useState<DrillLevel>("countries");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [drillData, setDrillData] = useState<Record<string, number>>({});

  const fetchOverview = useCallback(async () => {
    try {
      const res = await fetch("/api/analytics?view=overview");
      if (!res.ok) throw new Error("Failed to fetch");
      setData(await res.json());
    } catch {
      setError("Analytics unavailable — KV store may not be configured yet.");
    }
  }, []);

  useEffect(() => {
    fetchOverview();
    // Refresh every 30s for "live" feel
    const interval = setInterval(fetchOverview, 30000);
    return () => clearInterval(interval);
  }, [fetchOverview]);

  async function drillIntoCountry(code: string) {
    setSelectedCountry(code);
    setSelectedRegion(null);
    setDrillLevel("regions");
    try {
      const res = await fetch(
        `/api/analytics?view=regions&country=${encodeURIComponent(code)}`,
      );
      const json = await res.json();
      setDrillData(json.regions || {});
    } catch {
      setDrillData({});
    }
  }

  async function drillIntoRegion(region: string) {
    if (!selectedCountry) return;
    setSelectedRegion(region);
    setDrillLevel("cities");
    try {
      const res = await fetch(
        `/api/analytics?view=cities&country=${encodeURIComponent(selectedCountry)}&region=${encodeURIComponent(region)}`,
      );
      const json = await res.json();
      setDrillData(json.cities || {});
    } catch {
      setDrillData({});
    }
  }

  function drillBack() {
    if (drillLevel === "cities") {
      setDrillLevel("regions");
      setSelectedRegion(null);
      if (selectedCountry) drillIntoCountry(selectedCountry);
    } else {
      setDrillLevel("countries");
      setSelectedCountry(null);
      setDrillData({});
    }
  }

  function breadcrumb() {
    const parts: string[] = ["All Countries"];
    if (selectedCountry) parts.push(countryName(selectedCountry));
    if (selectedRegion) parts.push(selectedRegion);
    return parts.join(" / ");
  }

  const geoRows =
    drillLevel === "countries"
      ? sorted(data?.countries ?? {}).map(([code, count]) => ({
          key: code,
          label: countryName(code),
          value: count,
          onClick: () => drillIntoCountry(code),
          clickable: true,
        }))
      : drillLevel === "regions"
        ? sorted(drillData).map(([region, count]) => ({
            key: region,
            label: region === "Unknown" ? "Unknown Region" : region,
            value: count,
            onClick: () => drillIntoRegion(region),
            clickable: true,
          }))
        : sorted(drillData).map(([city, count]) => ({
            key: city,
            label: city === "Unknown" ? "Unknown City" : city,
            value: count,
            onClick: undefined,
            clickable: false,
          }));

  const geoMax = geoRows.length > 0 ? geoRows[0].value : 0;

  return (
    <main
      className="relative min-h-screen pt-24 pb-16 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-color) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <Particles />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)",
          top: "-5%",
          right: "10%",
        }}
        animate={{ x: [0, 30, -15, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(45, 212, 191, 0.04) 0%, transparent 70%)",
          bottom: "10%",
          left: "5%",
        }}
        animate={{ x: [0, -20, 10, 0], y: [0, 15, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <a
              href="/"
              className="text-sm inline-block transition-colors hover:text-amber-400"
              style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
            >
              &larr; Back to portfolio
            </a>
            <div className="flex items-center gap-3">
              <LivePulse />
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--muted)",
                  backgroundColor: "var(--card)",
                }}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Live Analytics
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Real-time visitor data &middot; auto-refreshes every 30s &middot;
            click countries to drill down
          </p>
        </motion.div>

        {error && (
          <div
            className="p-4 rounded-xl border mb-8 text-sm"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--muted)",
            }}
          >
            {error}
          </div>
        )}

        {data && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              <StatCard label="Total Views" value={data.total} icon={<EyeIcon />} delay={0} glow="rgba(245,158,11,0.08)" />
              <StatCard label="Unique Visitors" value={data.unique} icon={<UserIcon />} delay={0.05} glow="rgba(45,212,191,0.08)" />
              <StatCard label="Countries" value={Object.keys(data.countries).length} icon={<GlobeIcon />} delay={0.1} glow="rgba(59,130,246,0.08)" />
              <StatCard label="Pages Tracked" value={Object.keys(filterPages(data.pages)).length} icon={<FileIcon />} delay={0.15} glow="rgba(168,85,247,0.08)" />
            </div>

            {/* Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="p-5 rounded-xl border mb-10"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "var(--text)" }}
              >
                Visitor Globe
              </h3>
              <VisitorGlobe countries={data.countries} />
            </motion.div>

            {/* Daily chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="p-5 rounded-xl border mb-10"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-sm font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  Daily Views — Last 30 Days
                </h3>
                <span
                  className="text-xs tabular-nums"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
                >
                  Hover for details
                </span>
              </div>
              <DailyChart daily={data.daily} />
            </motion.div>

            {/* Two-column: Geo + Gender */}
            <div className="grid lg:grid-cols-5 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-3 p-5 rounded-xl border"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {breadcrumb()}
                  </h3>
                  {drillLevel !== "countries" && (
                    <button
                      onClick={drillBack}
                      className="text-xs px-2 py-1 rounded border transition-colors hover:text-amber-400"
                      style={{
                        color: "var(--muted)",
                        borderColor: "var(--border)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      &larr; Back
                    </button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${drillLevel}-${selectedCountry}-${selectedRegion}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 max-h-80 overflow-y-auto pr-1"
                  >
                    {geoRows.length === 0 ? (
                      <p
                        className="text-sm py-4"
                        style={{ color: "var(--muted)" }}
                      >
                        No data yet.
                      </p>
                    ) : (
                      geoRows.map((row) => (
                        <Bar
                          key={row.key}
                          label={row.label}
                          value={row.value}
                          max={geoMax}
                          onClick={row.onClick}
                          clickable={row.clickable}
                        />
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="lg:col-span-2"
              >
                <GenderWidget countries={data.countries} />
              </motion.div>
            </div>

            {/* Top pages */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-5 rounded-xl border"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "var(--text)" }}
              >
                Top Pages
              </h3>
              <div className="space-y-3">
                {sorted(filterPages(data.pages)).map(([path, count]) => (
                  <Bar
                    key={path}
                    label={path}
                    value={count}
                    max={sorted(filterPages(data.pages))[0]?.[1] ?? 1}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* Cookie notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 p-4 rounded-xl border text-center"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            This site uses cookies to distinguish unique visitors from repeat
            views. No personal information is collected or shared.
          </p>
        </motion.div>

        {!data && !error && (
          <div className="flex justify-center py-20">
            <div
              className="w-8 h-8 border-2 rounded-full animate-spin"
              style={{
                borderColor: "var(--border)",
                borderTopColor: "var(--amber)",
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
