export const personal = {
  name: "Shashank Kammanahalli Chandra Sekhara",
  firstName: "Shashank",
  lastName: "Kammanahalli Chandra Sekhara",
  nickname: "Kesiee",
  title: "Data Scientist",
  roleLine: "Data Scientist / ML Engineer",
  // Proof-first hero line — one tight sentence, no six-identity soup.
  heroLine:
    "I build forecasting and anomaly-detection models that ship — and I publish what works.",
  location: "Alpharetta, GA · Open to relocation",
  workAuth: "F-1 STEM OPT · authorized through 02/2029 · no near-term sponsorship",
  email: "shashankkesiee@gmail.com",
  phone: "+1 (470) 546-3083",
  github: "https://github.com/kesiee",
  linkedin: "https://www.linkedin.com/in/shashankkammanahalli",
  orcid: "https://orcid.org/0009-0004-4676-5014",
  portfolio: "shashank-kammanahalli.vercel.app",
  resumeUrl: "/resume",
  opt: true,
};

/* ── Hero metric strip — front-loads proof in the first viewport.
   `target` numbers count up on load; `text` values render as-is. ── */
export const heroMetrics: {
  target?: number;
  text?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}[] = [
  { target: 0.98, decimals: 2, label: "R² · 91-building energy forecast" },
  { text: "~$600K", suffix: "/yr", label: "forecasted savings" },
  { text: "1st", label: "author · IEEE Access 2026" },
  { target: 0.9789, decimals: 4, label: "ROC-AUC · BirdCLEF+ audio ML" },
  { target: 4.0, decimals: 1, label: "GPA · M.S. Data Science" },
];

/* ── About: paper-style lede + fact sheet ── */
export const aboutLede =
  "I'm a data scientist who ships forecasting and anomaly-detection models and publishes what works.";

export const aboutBody =
  "As a research assistant at Columbus State I lifted a 91-building energy-prediction model from R² 0.82 to 0.98 — roughly $600K a year in forecasted savings — and turned that work into a first-author IEEE Access 2026 paper. I care as much about what fails: my current research found a clustering approach that looked promising was actually net-harmful, so I replaced it with a simpler per-meter model that stays stable across time splits where the original collapsed. I bring the statistical rigor — controlled ablations, bootstrap confidence intervals, paired significance tests — that keeps model claims defensible in front of reviewers and stakeholders alike.";

export const factSheet: { k: string; v: string }[] = [
  { k: "Focus", v: "Time-series forecasting · anomaly detection · applied ML" },
  { k: "Currently", v: "Research Intern · Columbus State University" },
  { k: "Education", v: "M.S. Applied CS (Data Science) · 4.0 / 4.0 GPA" },
  { k: "Publications", v: "First-author IEEE Access 2026 · co-author AIRC 2025" },
  { k: "Location", v: "Alpharetta, GA · open to relocation" },
];

/* ── Skills: flat category → items, rendered as text rows (no pills) ── */
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
    category: "Statistics & Evaluation",
    items: [
      "Hypothesis Testing",
      "Paired Wilcoxon Tests",
      "Bootstrap Confidence Intervals",
      "Controlled Ablations",
      "Isotonic Calibration",
      "Cross-Validation",
      "Leakage Auditing",
      "Model Monitoring",
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
      "Audio ML",
    ],
  },
  {
    category: "Data Engineering & MLOps",
    items: [
      "PySpark",
      "Apache Spark",
      "Azure Databricks",
      "MLflow",
      "AWS (S3, EMR, Lambda)",
      "Airflow",
      "Docker",
      "Kafka",
      "Delta Lake",
    ],
  },
  {
    category: "Programming & Data",
    items: [
      "Python",
      "SQL",
      "Scala",
      "Java",
      "Pandas",
      "NumPy",
      "PostgreSQL",
      "Power BI",
      "Streamlit",
    ],
  },
];

/* ── Featured work — result-led figure blocks. Metric leads, prose supports. ── */
export type SparkVariant = "forecast" | "stability" | "roc" | "bars";

export const impactProjects: {
  fig: string;
  title: string;
  subtitle: string;
  result: string;
  resultLabel: string;
  proves: string;
  description: string;
  tags: string[];
  link: string;
  linkLabel: string;
  spark: SparkVariant;
}[] = [
  {
    fig: "Fig. 01",
    title: "Smart-Building Energy Forecasting",
    subtitle: "Columbus State · US Ignite / Fort Moore · Published",
    result: "R² 0.82 → 0.98",
    resultLabel: "91 buildings · ~$600K/yr forecasted savings",
    proves: "Deployed, published forecasting with a hard business number.",
    description:
      "Owned the full ML lifecycle for a 91-building energy portfolio: rolling Z-score outlier detection, STL imputation, correlation-driven feature pruning, and XGBoost forecasting (selected over Random Forest, LSTM, MSTL, and Prophet). Lifted overall R² from 0.82 to 0.98 (RMSE 12.16) and formalised it as a first-author IEEE Access 2026 paper.",
    tags: ["XGBoost", "STL", "MLflow", "Azure Databricks", "IEEE Access"],
    link: "https://doi.org/10.1109/ACCESS.2026.3671169",
    linkLabel: "Read the paper",
    spark: "forecast",
  },
  {
    fig: "Fig. 02",
    title: "Cross-Split Stability Research",
    subtitle: "Columbus State · ASHRAE GEP-III · In progress",
    result: "0.738 stable · clustering → 0.002",
    resultLabel: "per-meter features vs GMM soft-clustering",
    proves: "I kill my own approach when the metrics say so.",
    description:
      "Disciplined metric slicing surfaced a clean negative result — GMM soft-clustering lifted median per-meter R² but was net-harmful in aggregate. Replaced it with engineered per-meter state features that reach test R² 0.738 and hold 0.738 → 0.725 across time splits where the clustering pipeline collapses to 0.002. That cross-split stability is the headline claim of the follow-up paper.",
    tags: ["scikit-learn", "tslearn", "Wilcoxon", "Bootstrap CI", "Ablations"],
    link: "https://github.com/kesiee",
    linkLabel: "Research thread",
    spark: "stability",
  },
  {
    fig: "Fig. 03",
    title: "BirdCLEF+ 2026",
    subtitle: "Kaggle × Cornell Lab of Ornithology",
    result: "ROC-AUC 0.9789",
    resultLabel: "multi-label audio classification",
    proves: "Deep-learning DS under real deployment constraints.",
    description:
      "Two-model ensemble for fine-grained, class-imbalanced soundscape classification: a frozen CNN14 (PANNs) embedding baseline and a headline EfficientNet-B0 fine-tuned on 128-mel log-spectrograms with Mixup, label smoothing, and 5-fold stratified CV. Best fold reached macro ROC-AUC 0.9789 at epoch 27, with CPU inference inside the 9-hour Kaggle budget.",
    tags: ["PyTorch", "timm", "EfficientNet", "PANNs", "Mixup"],
    link: "https://github.com/kesiee/kaggle-birdclef-2026",
    linkLabel: "View repo",
    spark: "roc",
  },
  {
    fig: "Fig. 04",
    title: "Store Sales Forecasting",
    subtitle: "Kaggle · Corporación Favorita",
    result: "RMSLE 2.13 → 0.56",
    resultLabel: "thousands of (store, family) series",
    proves: "Decomposition-first forecasting at series scale.",
    description:
      "Multi-series forecasting that scores seasonal strength per series (STL/MSTL) to gate model choice, engineers lag, rolling, oil-price, holiday, and calendar features on log1p(sales), and ensembles a per-family LightGBM, a global LightGBM, and an MSTL forecast. Best leaderboard RMSLE 0.56, down from a 2.13 baseline through feature engineering and disciplined cross-validation.",
    tags: ["LightGBM", "STL / MSTL", "Prophet", "Feature Engineering"],
    link: "https://www.kaggle.com/code/shashankkc/stl-forecasting",
    linkLabel: "View notebook",
    spark: "forecast",
  },
];

/* ── Other Projects (filtered by dropdown) ── */
export type ProjectCategory =
  | "ML Research"
  | "Kaggle"
  | "Data Engineering"
  | "Tools & Apps";

export const projectCategories: ProjectCategory[] = [
  "ML Research",
  "Kaggle",
  "Data Engineering",
  "Tools & Apps",
];

export const otherProjects: {
  title: string;
  category: ProjectCategory;
  metric: string;
  description: string;
  tags: string[];
  link: string;
}[] = [
  {
    title: "gpt-activationNN — Transformer FFN activation study",
    category: "ML Research",
    metric: "val ppl 5.673 vs 5.740 GELU",
    description:
      "Compute-matched A/B study replacing GELU inside Transformer FFNs. Trained 30M–58M-parameter NanoGPT decoders on TinyStories with explicit FLOPs and parameter accounting. The learned-activation hypothesis lost cleanly; a pivoted post-projection deep-gate sweep landed gated_deep_silu at 5.673 best val perplexity vs 5.740 for the size-matched GELU baseline — with a clean LayerNorm-hurts negative result reported alongside.",
    tags: ["PyTorch", "Transformers", "Ablations", "FLOPs Accounting"],
    link: "https://github.com/kesiee/gpt-activationNN",
  },
  {
    title: "March Machine Learning Mania 2026",
    category: "Kaggle",
    metric: "Brier ~0.115 · isotonic-calibrated",
    description:
      "NCAA bracket prediction (132,133 matchups, Brier-scored, so calibration matters as much as ranking). Elo-like dynamic ratings with between-season regression, a GMM over team-style features, and a LightGBM matchup classifier with leave-one-year-out CV, blended 0.65 LGB / 0.35 Elo and passed through an isotonic calibrator.",
    tags: ["LightGBM", "Elo", "GMM", "Isotonic Calibration"],
    link: "https://github.com/kesiee/kaggle-march-madness-2026",
  },
  {
    title: "HEDGE Forecast",
    category: "Kaggle",
    metric: "Spearman-rank objective",
    description:
      "Hedge-fund-style multi-horizon forecasting where the metric is Spearman rank, not MSE. Group-aware imputation, global QuantileTransformer features, per-horizon target scaling, Fourier time clocks, group-lag features, and a stack of per-(horizon × sub_category) LightGBM regressors inverted back through the per-horizon scaler at submission.",
    tags: ["LightGBM", "QuantileTransformer", "Fourier Features"],
    link: "https://github.com/kesiee/kaggle-hedge-forecast",
  },
  {
    title: "Flight Analysis — Event-Driven Spark on AWS",
    category: "Data Engineering",
    metric: "130M+ records · transient EMR",
    description:
      "Event-driven Spark pipeline where an S3 upload triggered Lambda/boto3 to spin up transient EMR clusters processing 130M+ commercial flight records for delay and cancellation metrics, torn down via Terraform to keep cost proportional to work.",
    tags: ["Scala", "Spark", "AWS EMR", "Lambda", "Terraform"],
    link: "https://github.com/kesiee",
  },
  {
    title: "llmgate — Multi-Provider LLM Connector",
    category: "Data Engineering",
    metric: "21 providers · ~2 MB vs 200 MB+",
    description:
      "Plug-and-play Python library calling 21 LLM providers through a single YAML config with only two third-party deps (httpx + PyYAML). Retry-with-fallback chains, normalized streaming, and typed errors. Published to PyPI as llmgt (v0.2.0).",
    tags: ["Python", "PyPI", "httpx", "YAML", "Open Source"],
    link: "https://github.com/kesiee/llmgate",
  },
  {
    title: "JobHunt — Job Board Aggregator",
    category: "Data Engineering",
    metric: "200K+ jobs · 16.5K companies",
    description:
      "Public job board aggregating 200,000+ roles from 16,500+ companies across 8 ATS platforms into one fast search surface. Next.js 16 App Router with React 19 Server Components, self-hosted Postgres + PgBouncer on Oracle Cloud, full-text search, per-job OG tags, and a Postgres-backed analytics pipeline.",
    tags: ["Next.js 16", "PostgreSQL", "Oracle Cloud", "PgBouncer"],
    link: "https://job-board-kesiee.vercel.app/",
  },
  {
    title: "Universal Time-Series Anomaly Detection",
    category: "Tools & Apps",
    metric: "Bollinger method from AIRC 2025",
    description:
      "Streamlit app packaging the Bollinger-band fault-detection method from my IEEE AIRC 2025 co-authored paper into a universal interface: upload any time-series CSV, tune window + std-multiplier, and review anomalies overlaid on the raw signal — the detection function ships as a small reusable utility.",
    tags: ["Streamlit", "Python", "Anomaly Detection"],
    link: "https://github.com/kesiee/streamlit-universal-timeseries-anomaly-detection",
  },
  {
    title: "apply — Job Application Automation",
    category: "Tools & Apps",
    metric: "175+ career pages · 2-stage matcher",
    description:
      "End-to-end job scraping and resume-matching pipeline. Monitors 175+ company career pages plus job-board APIs, scrapes five ATS platforms with a Playwright fallback, and scores postings with a two-stage TF-IDF + MiniLM matcher against a multi-profile resume bank.",
    tags: ["Python", "Sentence Transformers", "Playwright", "SQLite"],
    link: "https://github.com/kesiee/apply",
  },
];

export const experience = [
  {
    role: "Research Intern",
    focus: "Applied ML, Smart Buildings · ASHRAE GEP-III",
    company: "Columbus State University",
    location: "Columbus, GA",
    period: "Apr 2026 – Present",
    metric: "test R² 0.738 · stable across time splits",
    bullets: [
      "Continuing peer-reviewed energy-forecasting research one-on-one with Dr. Yesem Kurt Peker on the ASHRAE GEP-III public dataset (1,400 buildings, 2,377 building-meter series across electricity, chilled water, steam, and hot water) toward an AIRC follow-up publication.",
      "Surfaced a clean negative result through disciplined metric slicing: GMM soft-clustering lifted median per-meter R² but was net-harmful to aggregate R² — then engineered per-meter state features (regime, Markov-transition, exponential-decay) that carry the gain with no clustering step at all.",
      "Current leader reaches overall test R² 0.738 and median per-meter R² 0.763 on a pruned 42-feature set, holding 0.738 → 0.725 across time splits where the clustering pipeline collapses to 0.002 — that cross-split stability is the headline claim of the paper.",
      "Own the full evaluation stack — paired Wilcoxon tests, bootstrap confidence intervals, controlled ablations, a five-check leakage audit, and MLflow run tracking — on a local Python / Pandas / scikit-learn / XGBoost / tslearn workstation.",
    ],
  },
  {
    role: "Data Science Research Assistant",
    focus: "Energy Forecasting, Fault Detection & IEEE Publications",
    company: "Columbus State University",
    location: "Columbus, GA",
    period: "Jun 2024 – Dec 2025",
    metric: "R² 0.82 → 0.98 · ~$600K/yr forecasted",
    bullets: [
      "Led energy prediction for 91 Fort Moore buildings delivered to US Ignite — rolling Z-score outliers, STL imputation, correlation-driven feature pruning, and XGBoost forecasting; lifted portfolio R² from 0.82 to 0.98 (RMSE 12.16) and projected ~$600K/yr in savings at full installation.",
      "Built Azure Databricks ETL ingesting heterogeneous sources (historical readings, OpenWeatherMap, SQL occupancy) into 1.2M+ time-series records, with weekly retraining auto-triggered on occupancy refresh, then drove a PySpark migration scaling from 91 → 300+ buildings.",
      "First author on IEEE Access 2026 (DOI 10.1109/ACCESS.2026.3671169) and co-author on IEEE AIRC 2025 (DOI 10.1109/AIRC64931.2025.11077504), where my proposed Bollinger Band method ran alongside RMSE thresholding (97% accuracy, 0.021 FPR) on the LEAD benchmark (1.48M readings).",
      "Side project: Student Dropout XGBoost classifier on CSU registration data — best accuracy (0.64) across 4 competing teams.",
    ],
  },
  {
    role: "Data Engineer (Junior Software Engineer)",
    focus: "Spark Pipelines, Schema Automation & AWS",
    company: "Innova Solutions",
    location: "Chennai, India",
    period: "Jun 2022 – May 2023",
    metric: "10+ pipelines · 2 days vs 6 weeks",
    bullets: [
      "Shipped an automated PySpark/Scala schema-validation framework across 10+ production healthcare pipelines in 2 days on a problem a senior engineer had spent 3 sprints (6 weeks) on — eliminated manual validation and a recurring class of downstream quality incidents.",
      "Built a reusable Jackson (Scala) + Python converter that auto-generates Spark-compatible JSON schemas from arbitrary XML pipeline definitions, including deeply nested healthcare structures, repeating elements, and namespace prefixes.",
      "Owned an event-driven Spark pipeline on AWS — S3 ObjectCreated → Lambda (boto3) → transient EMR cluster running a Scala Spark job over 130M+ commercial flight records, torn down to keep cost proportional to work.",
    ],
  },
];

export const publications = [
  {
    index: "01",
    title:
      "An Integrated Data Engineering and Machine Learning Framework for Energy Prediction and Fault Detection in Smart Buildings",
    authors: "Shashank K. C. et al.",
    journal: "IEEE Access",
    year: "2026",
    note: "First Author",
    result: "XGBoost R² = 0.98 across 91 buildings",
    doiLabel: "10.1109/ACCESS.2026.3671169",
    doi: "https://doi.org/10.1109/ACCESS.2026.3671169",
  },
  {
    index: "02",
    title: "A Practical Framework for Energy Fault Detection in Smart Buildings",
    authors: "et al., incl. Shashank K. C.",
    journal: "IEEE Xplore / AIRC 2025",
    year: "2025",
    note: "Co-Author",
    result: "RMSE thresholding — 97% acc, 0.021 FPR on LEAD",
    doiLabel: "10.1109/AIRC64931.2025.11077504",
    doi: "https://doi.org/10.1109/AIRC64931.2025.11077504",
  },
];

export const education = [
  {
    degree: "M.S. Applied Computer Science (Data Science)",
    school: "Columbus State University",
    period: "Aug 2023 – Dec 2025",
    gpa: "4.0 / 4.0",
  },
  {
    degree: "B.E. Computer Science",
    school: "Bangalore Institute of Technology",
    period: "Aug 2017 – Aug 2021",
    gpa: null,
  },
];
