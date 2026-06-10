export const personal = {
  name: "Shashank Kammanahalli Chandra Sekhara",
  firstName: "Shashank",
  lastName: "Kammanahalli Chandra Sekhara",
  nickname: "Kesiee",
  title: "ML Engineer & Data Scientist",
  tagline:
    "ML Engineer and Data Scientist with 2.7+ years building forecasting, anomaly-detection, and LLM systems end-to-end — from PySpark and Azure Databricks pipelines to fine-tuned audio models, gated-Transformer research, and production LLM tooling shipped on PyPI. First-author IEEE Access publication. STEM OPT authorized through 02/2029.",
  location: "Alpharetta, GA · Open to relocation",
  email: "shashankkesiee@gmail.com",
  phone: "+1 (470) 546-3083",
  github: "https://github.com/kesiee",
  linkedin: "https://www.linkedin.com/in/shashankkammanahalli",
  orcid: "https://orcid.org/0009-0004-4676-5014",
  portfolio: "shashank-kammanahalli.vercel.app",
  resumeUrl: "/resume",
  opt: true,
};

export const skills = [
  {
    category: "ML & Modeling",
    items: [
      "XGBoost",
      "LightGBM",
      "PyTorch",
      "scikit-learn",
      "GMM",
      "LSTM",
      "EfficientNet",
      "timm",
      "Feature Engineering",
    ],
  },
  {
    category: "Time-Series & Forecasting",
    items: [
      "STL / MSTL",
      "DTW (tslearn)",
      "Prophet",
      "Bollinger Bands",
      "RMSE Thresholding",
      "Multi-Horizon Forecasting",
      "Anomaly Detection",
      "QuantileTransformer",
      "Fourier Features",
    ],
  },
  {
    category: "Deep Learning & Research",
    items: [
      "Transformer Internals",
      "Mixup / SpecAugment",
      "Mixed Precision (bf16)",
      "Transfer Learning",
      "Test-Time Augmentation",
      "FLOPs Accounting",
      "Controlled Ablations",
      "Audio ML",
    ],
  },
  {
    category: "Data Engineering",
    items: [
      "PySpark",
      "Apache Spark",
      "Delta Lake",
      "Pandas",
      "NumPy",
      "GeoPandas",
      "Schema Validation",
      "Streaming Pipelines",
      "Kafka",
    ],
  },
  {
    category: "MLOps & Cloud",
    items: [
      "Azure Databricks",
      "MLflow",
      "AWS (S3, EMR, Lambda)",
      "Oracle Cloud",
      "Docker / Compose",
      "FastAPI",
      "Airflow",
      "Vercel",
      "Supabase",
    ],
  },
  {
    category: "LLM & RAG Tooling",
    items: [
      "OpenAI",
      "Anthropic",
      "Google Gemini",
      "Groq",
      "Mistral",
      "Sentence Transformers",
      "TF-IDF",
      "Vector Search",
      "RAG",
    ],
  },
  {
    category: "Web, Frontend & APIs",
    items: [
      "Next.js (App Router)",
      "React 19 RSC",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "PostgreSQL",
      "PgBouncer",
      "SQLModel",
      "Redis",
    ],
  },
  {
    category: "Programming & Tooling",
    items: [
      "Python",
      "SQL",
      "Scala",
      "Java",
      "LaTeX",
      "Git / GitHub",
      "Power BI",
      "Streamlit",
      "pytest",
    ],
  },
];

/* ── Featured Projects (large cards at top) ── */
export const impactProjects = [
  {
    title: "llmgate",
    subtitle: "Open Source · Python Library",
    description:
      "Plug-and-play LLM connector library — single YAML config, 21 providers (OpenAI, Anthropic, Google, Mistral, Groq, Together, Fireworks, OpenRouter, Cohere, and more), and only two third-party deps (httpx + PyYAML). Ships at ~2 MB versus ~200 MB+ for LiteLLM, with retry-with-fallback chains, normalized streaming, and typed errors. Published to PyPI as `llmgt` (v0.2.0).",
    tags: ["Python", "PyPI", "LLM", "httpx", "YAML", "Open Source"],
    link: "https://github.com/kesiee/llmgate",
    metric: { label: "Providers", value: "21" },
  },
  {
    title: "JobHunt — Job Board Aggregator",
    subtitle: "Production · Next.js 16 + Postgres",
    description:
      "Public job board aggregating 200,000+ open roles from 16,500+ companies across 8 ATS platforms (Greenhouse, Lever, SmartRecruiters, Workable, Rippling, Gem, Ashby, Workday). Next.js 16 App Router with React 19 Server Components, self-hosted Postgres + PgBouncer on Oracle Cloud, full-text search with category facets, per-job OG tags and an auto-built sitemap, and a custom Postgres-backed analytics pipeline behind a /admin dashboard.",
    tags: ["Next.js 16", "React 19 RSC", "PostgreSQL", "Oracle Cloud", "Tailwind"],
    link: "https://job-board-kesiee.vercel.app/",
    metric: { label: "Jobs", value: "200K+" },
  },
  {
    title: "master-resume — Resume Tailoring SaaS",
    subtitle: "In Progress · FastAPI + Next.js 14",
    description:
      "SaaS that turns one prose master resume into infinitely many job-tailored, ATS-friendly PDFs via LLM-driven extraction and LaTeX rendering. FastAPI + SQLModel against Supabase Postgres, hybrid JSONB + relational storage, computed completeness, Next.js 14 editor with debounced auto-save, swappable LLM boundary (Groq + Anthropic today). Phases 1–2 complete; tailoring and LaTeX renderer in flight.",
    tags: ["FastAPI", "SQLModel", "Supabase", "Next.js 14", "LLM", "LaTeX"],
    link: "https://github.com/kesiee/master-resume",
    metric: { label: "Phase", value: "3 / 5" },
  },
  {
    title: "gpt-activationNN",
    subtitle: "Self-directed Research · PyTorch",
    description:
      "Empirical study replacing GELU inside Transformer FFNs. Trained 30M–58M-parameter NanoGPT decoders on TinyStories (164M tokens, 10K steps) under a compute-matched A/B protocol. The learned-activation hypothesis lost cleanly; a pivoted post-projection deep-gate sweep landed `gated_deep_silu` at 5.673 best val perplexity vs 5.740 for the size-matched GELU baseline — with a clean LayerNorm-hurts negative result reported alongside.",
    tags: ["PyTorch", "Transformers", "Ablations", "Mixed Precision", "Research"],
    link: "https://github.com/kesiee/gpt-activationNN",
    metric: { label: "Models", value: "8 FFN" },
  },
];

/* ── Other Projects (filtered by dropdown) ── */
export type ProjectCategory =
  | "Production"
  | "ML Research"
  | "Kaggle"
  | "Tools & Demos";

export const projectCategories: ProjectCategory[] = [
  "Production",
  "ML Research",
  "Kaggle",
  "Tools & Demos",
];

export const otherProjects: {
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  link: string;
}[] = [
  {
    title: "apply — Job Application Automation",
    category: "Production",
    description:
      "End-to-end job scraping and resume-matching pipeline. Monitors 175+ company career pages plus Adzuna/Jooble and scrapes Greenhouse, Lever, Ashby, Workday, SmartRecruiters with a Playwright fallback. Two-stage matcher (TF-IDF cosine + MiniLM embeddings) against a multi-profile resume bank, SQLite tracker, 7-sheet Excel exports, and a 4-tab Flask dashboard with auto-ghosting.",
    tags: ["Python", "Flask", "Sentence Transformers", "Playwright", "SQLite"],
    link: "https://github.com/kesiee/apply",
  },
  {
    title: "trading-signal-system",
    category: "Production",
    description:
      "Real-time crypto trading signal pipeline (in progress). Streaming-first architecture on Docker Compose — Confluent Kafka broker, Redis rolling buffer, and an async Binance futures WebSocket ingestor. Topics segmented per stage (raw_ticks → feature_vectors → trading_signals) with FastAPI serving and a LightGBM signal model wired in next.",
    tags: ["Kafka", "Redis", "FastAPI", "LightGBM", "Docker"],
    link: "https://github.com/kesiee/trading-signal-system",
  },
  {
    title: "BirdCLEF+ 2026",
    category: "ML Research",
    description:
      "Kaggle x Cornell Lab of Ornithology multi-label fine-grained audio classification — 5-second windows of long-form soundscapes across birds, mammals, amphibians, and insects. Two-model ensemble: a frozen CNN14 (PANNs) embedding + Logistic Regression baseline and a timm EfficientNet-B0 fine-tuned on 128-mel log-spectrograms with Mixup, label smoothing, and TTA. Best fold macro ROC-AUC 0.9789 at epoch 27.",
    tags: ["PyTorch", "timm", "EfficientNet", "Audio ML", "Mixup", "TTA"],
    link: "https://github.com/kesiee/kaggle-birdclef-2026",
  },
  {
    title: "Store Sales Forecasting",
    category: "Kaggle",
    description:
      "Multi-series forecasting across thousands of (store, family) pairs for Corporación Favorita. Decomposition-first: per-series STL/MSTL with seasonal-strength gating, log1p targets, lag/rolling features, oil forward-fills, holiday flags, and a blend of per-family LightGBM + global LightGBM + MSTL forecasts. Best leaderboard RMSLE 0.56 (down from a 2.13 baseline).",
    tags: ["LightGBM", "STL / MSTL", "Feature Engineering", "Python"],
    link: "https://www.kaggle.com/code/shashankkc/stl-forecasting",
  },
  {
    title: "March Machine Learning Mania 2026",
    category: "Kaggle",
    description:
      "NCAA Division I men's and women's bracket prediction — 132,133 matchups, Brier-score metric. Per-team dynamic Elo (K=20 regular, K=40 tournament, between-season regression to 1500), GMM soft-clusters over playing-style features, and a per-gender LightGBM matchup classifier over diff/abs/sum features + Massey ordinals. Blended 0.65 LGBM + 0.35 Elo, isotonic-calibrated against 2023–2025.",
    tags: ["LightGBM", "Elo", "GMM", "Isotonic Calibration", "Brier"],
    link: "https://github.com/kesiee/kaggle-march-madness-2026",
  },
  {
    title: "HEDGE Forecast",
    category: "Kaggle",
    description:
      "Hedge-fund-style multi-horizon forecasting where the metric is Spearman rank, not MSE. Group-aware ffill/bfill imputation, global QuantileTransformer features, per-horizon target scaling, Fourier time clocks at multiple periods, group-lag features, and a stack of per-(horizon × sub_category) LightGBM regressors inverted back through the per-horizon scaler at submission.",
    tags: ["LightGBM", "QuantileTransformer", "Fourier Features", "Time Series"],
    link: "https://github.com/kesiee/kaggle-hedge-forecast",
  },
  {
    title: "Universal Time-Series Anomaly Detection",
    category: "Tools & Demos",
    description:
      "Streamlit app packaging the Bollinger-band fault-detection method from my IEEE AIRC 2025 co-authored paper into a universal interface. Upload any time-series CSV, select timestamp/metric columns, tune window + std-multiplier, and review anomalies overlaid on the raw signal with a downloadable summary table — the detection function ships as a small reusable utility.",
    tags: ["Streamlit", "Python", "Anomaly Detection"],
    link: "https://github.com/kesiee/streamlit-universal-timeseries-anomaly-detection",
  },
  {
    title: "Crypto Live Dashboard",
    category: "Tools & Demos",
    description:
      "Real-time crypto dashboard streaming Binance WebSocket ticks with CoinGecko + CryptoCompare as layered fallbacks. Candlestick / line charts with overlaid EMA-9/21/50, configurable auto-refresh, exponential-backoff reconnects with REST gap backfill, and an incremental EMA pass that keeps Streamlit responsive under live workloads.",
    tags: ["Streamlit", "WebSocket", "Binance", "Python"],
    link: "https://github.com/kesiee/streamlit-crypto-live-dashboard",
  },
  {
    title: "This Portfolio Site",
    category: "Tools & Demos",
    description:
      "The site you're reading. Next.js 14 App Router + Tailwind v4 + Framer Motion, single typed content module, custom CSS-variable token system for dark/light themes (no UI kit), Formspree-backed contact form, and a /resume route that prints to PDF from a custom print stylesheet. Deployed on Vercel.",
    tags: ["Next.js 14", "TypeScript", "Tailwind v4", "Framer Motion"],
    link: "https://github.com/kesiee/portfolio",
  },
];

export const experience = [
  {
    role: "Research Intern",
    focus: "Smart-Buildings Clustering Research · ASHRAE GEP-III",
    company: "Columbus State University",
    location: "Columbus, GA",
    period: "Apr 2026 – Present",
    bullets: [
      "Continuing the smart-buildings energy-prediction research thread under Dr. Yesem Kurt Peker, with the ASHRAE GEP-III public dataset (1,400 buildings, 2,374 smart meters) as the working dataset.",
      "Iterating on the GMM soft-clustering pipeline that previously dropped median CVRMSE from 18.78% to 18.45% and shifted ~60 meters out of the negative-R² bucket when 15-component cluster-membership vectors fed a global XGBoost model.",
      "Testing whether engineered regime / state / load-shape features can match the GMM-driven gain directly — simpler pipeline, better interpretability.",
      "Targeting a publishable contribution at the AIRC conference as the follow-up to the co-authored AIRC 2026 paper.",
      "Stack: Python, Pandas, NumPy, scikit-learn, tslearn, XGBoost, MLflow, Streamlit, Matplotlib, Seaborn — running locally on a single workstation for fast iteration.",
    ],
  },
  {
    role: "Data Science Research Assistant",
    focus: "Energy Forecasting, Fault Detection & IEEE Publications",
    company: "Columbus State University",
    location: "Columbus, GA",
    period: "Jun 2024 – Dec 2025",
    bullets: [
      "Led energy prediction for 91 Fort Moore buildings delivered to US Ignite — rolling Z-score outliers, STL imputation, correlation-driven feature pruning, and XGBoost forecasting; lifted portfolio R² from 0.82 to 0.98 (~19.5%) and projected ~$600K/yr in savings at full installation.",
      "Built Azure Databricks ETL ingesting 3 heterogeneous sources (Azure Blob historical readings, OpenWeatherMap, SQL occupancy from anonymized mobile triangulation) into 1.2M+ time-series records, with weekly retraining auto-triggered on occupancy refresh.",
      "Drove migration of the Pandas POC to PySpark and partitioned distributed workloads, scaling the pipeline from 91 → 300+ buildings.",
      "First author on IEEE Access 2026 (DOI 10.1109/ACCESS.2026.3671169) and co-author on IEEE Xplore / AIRC 2025 (DOI 10.1109/AIRC64931.2025.11077504), where my proposed Bollinger Band method ran alongside RMSE thresholding (97% accuracy, 0.021 FPR) on the LEAD benchmark.",
      "Ran a clustering research program on ASHRAE GEP-III: systematically tested DTW (tslearn), statistical, and seasonal-aware clustering; only 15-component GMM soft-clustering produced measurable downstream forecast gains.",
      "Side project: Student Dropout XGBoost classifier on CSU registration data — best accuracy (0.64) across 4 competing teams.",
    ],
  },
  {
    role: "Data Engineer (Junior Software Engineer)",
    focus: "Spark Pipelines, Schema Automation & AWS",
    company: "Innova Solutions",
    location: "Chennai, India",
    period: "Jun 2022 – May 2023",
    bullets: [
      "Shipped an automated PySpark/Scala schema validation framework across 10+ production healthcare pipelines in 2 days on a problem a senior engineer had spent 3 sprints (6 weeks) on — eliminated manual validation and the recurring class of downstream quality incidents.",
      "Built a reusable Jackson (Scala) + Python converter that auto-generates Spark-compatible JSON schemas from arbitrary XML pipeline definitions, including deeply nested healthcare structures, repeating elements, and namespace prefixes.",
      "Owned end-to-end design of an event-driven Spark pipeline on AWS — S3 ObjectCreated → Lambda (boto3) → transient EMR cluster running a Scala Spark job over 130M+ commercial flight records, persisting aggregated outputs and tearing the cluster down to keep costs low.",
      "Picked up Scala from a Python baseline by pair-programming with seniors and reading the codebase; ran code reviews, documented schema decisions, and became the team's go-to engineer for validation work.",
    ],
  },
];

export const publications = [
  {
    title:
      "An Integrated Data Engineering and Machine Learning Framework for Energy Prediction and Fault Detection in Smart Buildings",
    journal: "IEEE Access",
    year: "2026",
    note: "First Author",
    doi: "https://doi.org/10.1109/ACCESS.2026.3671169",
  },
  {
    title:
      "A Practical Framework for Energy Fault Detection in Smart Buildings",
    journal: "IEEE Xplore / AIRC 2025",
    year: "2025",
    note: "Co-Author",
    doi: "https://doi.org/10.1109/AIRC64931.2025.11077504",
  },
];

export const education = [
  {
    degree: "Master of Science in Applied Computer Science (Data Science)",
    school: "Columbus State University",
    period: "Aug 2023 – Dec 2025",
    gpa: "4.0 / 4.0",
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    school: "Bangalore Institute of Technology",
    period: "Aug 2017 – Aug 2021",
    gpa: null,
  },
];
