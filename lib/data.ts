export const personal = {
  name: "Shashank Kammanahalli Chandra Sekhara",
  firstName: "Shashank",
  lastName: "Kammanahalli Chandra Sekhara",
  nickname: "Kesiee",
  title: "ML Engineer",
  tagline:
    "ML Engineer with 3+ years building end-to-end forecasting and anomaly detection pipelines using PySpark, XGBoost, and Azure Databricks. Background in data engineering evolved into full ML system design — from ETL to model training, evaluation, and deployment. First-author IEEE Access publication. STEM OPT authorized through 02/2029.",
  location: "Open to relocation",
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
      "PyTorch",
      "Scikit-learn",
      "LightGBM",
      "GMM",
      "Feature Engineering",
      "Time-Series Forecasting",
      "Anomaly Detection",
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
      "ETL Pipelines",
    ],
  },
  {
    category: "MLOps & Cloud",
    items: [
      "Azure Databricks",
      "MLflow",
      "AWS (S3, EMR, Lambda)",
      "Docker",
      "FastAPI",
      "Git",
    ],
  },
  {
    category: "Programming",
    items: ["Python", "SQL", "Scala", "Java"],
  },
  {
    category: "Visualization & Tools",
    items: ["Power BI", "Matplotlib", "Streamlit", "Flask"],
  },
];

/* ── Impact Projects (detailed cards) ── */
export const impactProjects = [
  {
    title: "llmgate",
    subtitle: "Open Source · Python Library",
    description:
      "Lightweight plug-and-play LLM connector library — 2 dependencies (httpx, PyYAML), 21 providers, YAML config, zero bloat. A ~2 MB alternative to LiteLLM (~200 MB+). MIT licensed.",
    tags: ["Python", "httpx", "PyYAML", "LLM", "Open Source"],
    link: "https://github.com/kesiee/llmgate",
    metric: { label: "Providers", value: "21" },
  },
  {
    title: "Job Application Automation",
    subtitle: "Full-Stack Pipeline · Python",
    description:
      "End-to-end job scraping and matching pipeline across 175+ company career pages and job board APIs (Greenhouse, Lever, Ashby, Workday, Adzuna, Jooble). TF-IDF + sentence-transformer resume matching with per-profile scoring. Flask web dashboard with 4 tabs, SQLite storage, cron-scheduled pipeline.",
    tags: ["Python", "Flask", "Sentence Transformers", "TF-IDF", "SQLite", "Playwright"],
    link: "https://github.com/kesiee/apply",
    metric: { label: "Companies", value: "175+" },
  },
];

/* ── Other Projects (compact mentions) ── */
export const otherProjects = [
  {
    title: "Crypto Live Dashboard",
    description: "Real-time cryptocurrency dashboard with WebSocket streaming from Binance/CoinGecko/CryptoCompare. Candlestick/line charts, EMA indicators, auto-refresh.",
    tags: ["Python", "Streamlit", "WebSocket"],
    link: "https://github.com/kesiee/streamlit-crypto-live-dashboard",
  },
  {
    title: "Universal Time-Series Anomaly Detection",
    description: "Streamlit app implementing Bollinger-band-based anomaly detection for arbitrary time series, packaging IEEE research into an interactive tool.",
    tags: ["Python", "Streamlit"],
    link: "https://github.com/kesiee/streamlit-universal-timeseries-anomaly-detection",
  },
  {
    title: "Store Sales Forecasting",
    description: "Kaggle competition — XGBoost with STL decomposition and GMM clustering for 54 stores and 33 product families. RMSLE improved from 2.13 to 0.56.",
    tags: ["XGBoost", "GMM", "STL", "Python"],
    link: "https://www.kaggle.com/code/shashankkc/stl-forecasting",
  },
  {
    title: "BirdCLEF+ 2026",
    description: "Kaggle competition — bird species identification from audio. Fine-tuned a pretrained model on competition data using PyTorch and transfer learning.",
    tags: ["PyTorch", "Transfer Learning", "Audio ML"],
    link: "https://www.kaggle.com/competitions/birdclef-2026",
  },
  {
    title: "HEDGE Forecast",
    description: "Kaggle energy demand forecasting — LightGBM pipeline across 20 models with advanced feature engineering and ensemble strategies.",
    tags: ["LightGBM", "Time Series", "Python"],
    link: "https://www.kaggle.com/shashankkc",
  },
  {
    title: "Telco Customer Churn",
    description: "End-to-end ML classification pipeline for telecom churn prediction with full preprocessing, feature engineering, and evaluation.",
    tags: ["scikit-learn", "Python", "Classification"],
    link: "https://github.com/kesiee/ml_term_project_2024",
  },
];

export const experience = [
  {
    role: "ML Engineer / Research Assistant",
    focus: "End-to-End ML Pipelines & Forecasting",
    company: "Columbus State University",
    location: "Columbus, GA",
    period: "Jun 2024 – Dec 2025",
    bullets: [
      "Led energy prediction for 91 buildings at Fort Moore, improving overall model R² by ~19.5% (0.82 to 0.98) through rolling Z-score outlier detection, STL imputation, and optimized feature engineering.",
      "Built end-to-end ETL pipelines on Azure Databricks and Delta Lake, integrating 3 data sources (Azure Blob Storage, OpenWeatherMap API, SQL occupancy tables) to process 1.2M+ time-series records.",
      "Identified scalability bottleneck in Pandas-based POC and drove migration to PySpark, enabling distributed computing for future deployment across 300+ buildings.",
      "Implemented Bollinger Bands and RMSE threshold anomaly detection methods for energy fault detection, contributing to a co-authored IEEE publication benchmarking 4 methods on the LEAD dataset.",
      "Student Dropout Prediction: Built XGBoost classifier on CSU student data, achieved highest accuracy (0.64) across 4 teams.",
    ],
  },
  {
    role: "Data Engineer",
    focus: "Spark Pipelines & Schema Automation",
    company: "Innova Solutions",
    location: "Chennai, TN",
    period: "Jun 2022 – May 2023",
    bullets: [
      "Resolved a schema validation problem in 2 days that had been unresolved for 6 weeks (3 sprints), automating PySpark/Scala validation across 10+ pipelines and cutting manual QA effort.",
      "Built a modular script using Jackson (Scala) and Python to auto-generate Spark-compatible JSON schemas from any XML pipeline definition, handling complex nested healthcare data structures.",
      "Flight Analysis: Built an event-driven Spark pipeline on AWS — S3 triggered Lambda/boto3 to spin up EMR jobs processing 130M+ flight records.",
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
    period: "Jan 2024 – Dec 2025",
    gpa: "4.0 / 4.0",
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    school: "Bangalore Institute of Technology",
    period: "Aug 2017 – Aug 2021",
    gpa: null,
  },
];
