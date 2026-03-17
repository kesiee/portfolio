import type { Metadata } from "next";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

export const metadata: Metadata = {
  title: "Live Analytics — Shashank Kammanahalli",
  description: "Real-time visitor analytics for my portfolio.",
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
