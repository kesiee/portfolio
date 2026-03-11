import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shashank Kammanahalli — AI/ML Engineer & Data Scientist",
  description:
    "2x IEEE first-author researcher. Building production ML pipelines on 1.2M+ records. Seeking Data Scientist & ML Engineer roles.",
  keywords: [
    "AI",
    "ML",
    "Machine Learning",
    "Data Science",
    "Python",
    "XGBoost",
    "PySpark",
    "IEEE",
    "Portfolio",
    "Shashank Kammanahalli",
    "Kesiee",
  ],
  openGraph: {
    title: "Shashank Kammanahalli — AI/ML Engineer & Data Scientist",
    description:
      "2x IEEE first-author researcher. Building production ML pipelines on 1.2M+ records. Seeking Data Scientist & ML Engineer roles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
