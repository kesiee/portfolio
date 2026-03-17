"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { computeGenderProbability, countryName } from "@/lib/analytics";

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

function pct(value: number, max: number) {
  return max === 0 ? 0 : Math.round((value / max) * 100);
}

/* ---------- small components ---------- */
function StatCard({
  label,
  value,
  delay,
}: {
  label: string;
  value: string | number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="p-5 rounded-xl border"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
    >
      <div
        className="text-3xl font-extrabold mb-1"
        style={{ color: "var(--amber)", fontFamily: "var(--font-display)" }}
      >
        {value}
      </div>
      <div className="text-sm" style={{ color: "var(--muted)" }}>
        {label}
      </div>
    </motion.div>
  );
}

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
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--border)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "var(--amber)" }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </button>
  );
}

function DailyChart({ daily }: { daily: Record<string, number> }) {
  const entries = Object.entries(daily);
  const max = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="flex items-end gap-[3px] h-24">
      {entries.map(([date, count], i) => (
        <motion.div
          key={date}
          className="flex-1 rounded-t"
          style={{ backgroundColor: "var(--amber)" }}
          initial={{ height: 0 }}
          animate={{ height: `${Math.max((count / max) * 100, 2)}%` }}
          transition={{ duration: 0.4, delay: i * 0.02 }}
          title={`${date}: ${count} views`}
        />
      ))}
    </div>
  );
}

function GenderWidget({ countries }: { countries: Record<string, number> }) {
  const { male, female, other } = computeGenderProbability(countries);
  const segments = [
    { label: "Male", value: male, color: "#3b82f6" },
    { label: "Female", value: female, color: "#ec4899" },
    { label: "Other", value: other, color: "#a855f7" },
  ];

  return (
    <div
      className="p-5 rounded-xl border"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
    >
      <h3
        className="text-sm font-semibold mb-4"
        style={{ color: "var(--text)" }}
      >
        Estimated Gender Split
      </h3>

      {/* Stacked bar */}
      <div className="flex h-4 rounded-full overflow-hidden mb-4">
        {segments.map((s) => (
          <motion.div
            key={s.label}
            style={{ backgroundColor: s.color }}
            initial={{ width: 0 }}
            animate={{ width: `${s.value}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="flex justify-between">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {s.label}{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--text)" }}
              >
                {s.value}%
              </span>
            </span>
          </div>
        ))}
      </div>

      <p
        className="text-[10px] mt-3 leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        Based on ITU regional internet-usage demographics weighted by visitor
        country. For fun only — not individual data.
      </p>
    </div>
  );
}

/* ---------- main dashboard ---------- */
export default function AnalyticsDashboard() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Drill-down state
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

  /* ---- breadcrumb label ---- */
  function breadcrumb() {
    const parts: string[] = ["All Countries"];
    if (selectedCountry) parts.push(countryName(selectedCountry));
    if (selectedRegion) parts.push(selectedRegion);
    return parts.join(" / ");
  }

  /* ---- which rows to show in geo panel ---- */
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

  /* ---- render ---- */
  return (
    <main
      className="min-h-screen pt-24 pb-16"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <a
            href="/"
            className="text-sm mb-4 inline-block transition-colors hover:text-amber-400"
            style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
          >
            &larr; Back to portfolio
          </a>
          <h1
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Live Analytics
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Real-time visitor data for this portfolio. Click countries to drill
            down.
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
              <StatCard label="Total Views" value={data.total.toLocaleString()} delay={0} />
              <StatCard label="Unique Visitors" value={data.unique.toLocaleString()} delay={0.05} />
              <StatCard
                label="Countries"
                value={Object.keys(data.countries).length}
                delay={0.1}
              />
              <StatCard
                label="Pages Tracked"
                value={Object.keys(data.pages).length}
                delay={0.15}
              />
            </div>

            {/* Daily chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
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
                Daily Views — Last 30 Days
              </h3>
              <DailyChart daily={data.daily} />
            </motion.div>

            {/* Two-column: Geo + Gender */}
            <div className="grid lg:grid-cols-5 gap-6 mb-10">
              {/* Geo panel — wider */}
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

              {/* Gender panel */}
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
                {sorted(data.pages).map(([path, count]) => (
                  <Bar
                    key={path}
                    label={path}
                    value={count}
                    max={sorted(data.pages)[0]?.[1] ?? 1}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}

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
