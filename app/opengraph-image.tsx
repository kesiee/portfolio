import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shashank Kammanahalli — Data Scientist & ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0B",
          color: "#EDEDEF",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 4, color: "#8A8A93", display: "flex" }}>
          SHASHANK KAMMANAHALLI · KESIEE
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 78, fontWeight: 700, color: "#EDEDEF", lineHeight: 1 }}>
            Data Scientist
          </div>
          <div style={{ fontSize: 34, color: "#8A8A93", display: "flex" }}>
            Forecasting · Anomaly Detection · Applied ML
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 24 }}>
          {["1st author · IEEE Access", "R² 0.98 · 91 buildings", "~$600K/yr saved"].map((t) => (
            <div
              key={t}
              style={{
                padding: "12px 22px",
                border: "1px solid #5B8CFF",
                borderRadius: 8,
                color: "#5B8CFF",
                display: "flex",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
