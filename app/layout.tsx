import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://shashank-kammanahalli.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shashank Kammanahalli — Data Scientist & ML Engineer",
    template: "%s · Shashank Kammanahalli",
  },
  description:
    "Data scientist who ships forecasting & anomaly-detection models and publishes what works. First-author IEEE Access researcher — R² 0.98, ~$600K/yr saved. Open to DS/ML roles.",
  applicationName: "Shashank Kammanahalli Portfolio",
  authors: [{ name: "Shashank Kammanahalli Chandra Sekhara", url: SITE_URL }],
  creator: "Shashank Kammanahalli Chandra Sekhara",
  keywords: [
    "Shashank Kammanahalli",
    "Shashank Kammanahalli Chandra Sekhara",
    "Kesiee",
    "Data Scientist",
    "Machine Learning Engineer",
    "MLOps Engineer",
    "Time-Series Forecasting",
    "Anomaly Detection",
    "XGBoost",
    "LightGBM",
    "PySpark",
    "Azure Databricks",
    "PyTorch",
    "IEEE Access",
    "Applied Machine Learning",
    "Data Scientist Alpharetta GA",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    firstName: "Shashank",
    lastName: "Kammanahalli Chandra Sekhara",
    username: "kesiee",
    title: "Shashank Kammanahalli — Data Scientist & ML Engineer",
    description:
      "First-author IEEE Access researcher. Forecasting, anomaly detection & production ML. Open to Data Scientist & ML Engineer roles.",
    url: SITE_URL,
    siteName: "Shashank Kammanahalli",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashank Kammanahalli — Data Scientist & ML Engineer",
    description:
      "First-author IEEE Access researcher. Forecasting, anomaly detection & production ML. Open to DS/ML roles.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Shashank Kammanahalli Chandra Sekhara",
      alternateName: ["Shashank Kammanahalli", "Kesiee"],
      jobTitle: "Data Scientist & Machine Learning Engineer",
      email: "mailto:shashankkesiee@gmail.com",
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Columbus State University" },
        {
          "@type": "CollegeOrUniversity",
          name: "Bangalore Institute of Technology",
        },
      ],
      worksFor: {
        "@type": "CollegeOrUniversity",
        name: "Columbus State University",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Alpharetta",
        addressRegion: "GA",
        addressCountry: "US",
      },
      knowsAbout: [
        "Machine Learning",
        "Data Science",
        "Time-Series Forecasting",
        "Anomaly Detection",
        "XGBoost",
        "LightGBM",
        "PySpark",
        "Azure Databricks",
        "MLOps",
        "MLflow",
        "PyTorch",
        "Deep Learning",
      ],
      sameAs: [
        "https://github.com/kesiee",
        "https://www.linkedin.com/in/shashankkammanahalli",
        "https://orcid.org/0009-0004-4676-5014",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      "@id": "https://doi.org/10.1109/ACCESS.2026.3671169",
      headline:
        "An Integrated Data Engineering and Machine Learning Framework for Energy Prediction and Fault Detection in Smart Buildings",
      author: { "@id": `${SITE_URL}/#person` },
      isPartOf: { "@type": "Periodical", name: "IEEE Access" },
      datePublished: "2026",
      sameAs: "https://doi.org/10.1109/ACCESS.2026.3671169",
    },
    {
      "@type": "ScholarlyArticle",
      "@id": "https://doi.org/10.1109/AIRC64931.2025.11077504",
      headline: "A Practical Framework for Energy Fault Detection in Smart Buildings",
      author: { "@id": `${SITE_URL}/#person` },
      isPartOf: { "@type": "Periodical", name: "IEEE AIRC 2025" },
      datePublished: "2025",
      sameAs: "https://doi.org/10.1109/AIRC64931.2025.11077504",
    },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
