export const personal = {
  name: "Shashank Kammanahalli Chandra Sekhara",
  firstName: "Shashank",
  lastName: "Kammanahalli Chandra Sekhara",
  nickname: "Kesiee",
  title: "AI/ML Engineer & Data Scientist",
  tagline:
    "2x IEEE first-author researcher. Building production ML pipelines on 1.2M+ records. Seeking Data Scientist & ML Engineer roles.",
  email: "shashankkesiee@gmail.com",
  phone: "+1 (470) 546-3083",
  github: "https://github.com/kesiee",
  linkedin:
    "https://www.linkedin.com/in/shashank-kammanahalli-chandra-sekhara-72778a230/",
  orcid: "https://orcid.org/0009-0004-4676-5014",
  resumeUrl: "/resume",
  opt: true,
};

export const skills = [
  {
    category: "AI / ML",
    items: [
      "XGBoost",
      "LightGBM",
      "scikit-learn",
      "PyTorch",
      "TensorFlow",
      "LSTM",
      "tslearn",
      "DTW",
      "MLflow",
    ],
  },
  {
    category: "Data Engineering",
    items: [
      "PySpark",
      "Apache Spark",
      "Delta Lake",
      "Airflow",
      "Hadoop",
      "Databricks",
      "Feature Engineering",
    ],
  },
  {
    category: "Cloud",
    items: [
      "AWS S3",
      "AWS EC2",
      "AWS EMR",
      "AWS Lambda",
      "CloudWatch",
      "IAM",
      "Azure Databricks",
    ],
  },
  {
    category: "Languages & Tools",
    items: [
      "Python",
      "Scala",
      "SQL",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Git",
    ],
  },
];

export const projects = [
  {
    title: "HEDGE Forecast",
    subtitle: "Kaggle Competition",
    description:
      "LightGBM time-series forecasting pipeline across 20 models for energy demand prediction. Achieved competition score of 0.1322+ with advanced feature engineering and ensemble strategies.",
    tags: [
      "LightGBM",
      "Time Series",
      "Python",
      "Feature Engineering",
      "Ensemble",
    ],
    link: "https://www.kaggle.com/shashankkc",
    metric: { label: "Score", value: "0.1322+" },
  },
  {
    title: "Store Sales Forecasting",
    subtitle: "Kaggle · Corporación Favorita",
    description:
      "Time-series forecasting pipeline for 54 stores and 33 product families using XGBoost with lag features, STL decomposition, and GMM-based soft clustering for store-level behavioral archetypes.",
    tags: ["XGBoost", "GMM", "STL Decomposition", "Python", "Pandas"],
    link: "https://www.kaggle.com/code/shashankkc/stl-forecasting",
    metric: { label: "Stores", value: "54 × 33" },
  },
  {
    title: "Flight Analysis",
    subtitle: "Spark · Scala · AWS",
    description:
      "Distributed Spark application analyzing over 130 million commercial airline flight records. Large-scale data cleaning, delay metrics computation, and daily pattern analysis on AWS S3 + EMR.",
    tags: ["Apache Spark", "Scala", "AWS S3", "AWS EMR", "Zeppelin"],
    link: "https://gitlab.com/shashankkesiee/commercial-flights-analysis",
    metric: { label: "Records", value: "130M+" },
  },
  {
    title: "Telco Customer Churn",
    subtitle: "ML Pipeline · Jupyter",
    description:
      "End-to-end ML pipeline predicting telecom customer churn. Full preprocessing, feature engineering, model selection, anomaly handling, and evaluation with detailed Jupyter notebook documentation.",
    tags: ["scikit-learn", "Python", "Jupyter", "Classification", "EDA"],
    link: "https://github.com/kesiee/ml_term_project_2024",
    metric: { label: "Type", value: "Classification" },
  },
  {
    title: "Job Application Automation",
    subtitle: "Full-Stack Pipeline · Python",
    description:
      "Automated pipeline scraping 175+ company career pages and job board APIs, scoring postings against resumes using TF-IDF + sentence-transformer matching, with a Flask web dashboard for tracking and analytics.",
    tags: ["Python", "Flask", "NLP", "Sentence Transformers", "SQLite", "Playwright"],
    link: "https://github.com/kesiee/apply",
    metric: { label: "Companies", value: "175+" },
  },
];

export const experience = [
  {
    role: "Graduate Research Assistant",
    focus: "Clustering & Forecasting Research",
    company: "Columbus State University",
    location: "Columbus, GA",
    period: "May 2025 – Dec 2025",
    bullets: [
      "Multivariate time-series clustering across 90+ buildings using tslearn with DTW and Euclidean distance methods to identify energy consumption archetypes.",
      "Implemented seasonal-aware clustering by isolating dominant operational seasons and clustering on season-specific temporal dynamics.",
      "Integrated weather, occupancy, and facility-area signals to improve semantic separation of operational profiles.",
      "Evaluated cluster quality using silhouette scores, inertia, and downstream XGBoost forecasting performance (R², SMAPE) at the cluster level.",
    ],
  },
  {
    role: "Graduate Research Assistant",
    focus: "ML Engineer",
    company: "Columbus State University",
    location: "Columbus, GA",
    period: "Jun 2024 – Apr 2025",
    bullets: [
      "Built forecasting and anomaly-detection models for 91 buildings using Python, PySpark, and XGBoost — achieving up to R² = 0.98.",
      "Deployed end-to-end data pipelines on Databricks and Delta Lake, processing 1.2M+ time-series records for real-time analysis.",
      "Engineered advanced time-series features: lags, rolling stats, Fourier encodings, STL decomposition.",
      "Applied Bollinger Bands and threshold-based anomaly detection to flag abnormal energy consumption patterns.",
    ],
  },
  {
    role: "Junior Software Engineer",
    focus: "Data Engineering",
    company: "Innova Solutions",
    location: "Chennai, TN",
    period: "Jun 2022 – May 2023",
    bullets: [
      "Automated data schema validation and quality checks using PySpark and Scala, reducing manual QA effort.",
      "Developed scalable JSON parsing workflows for complex nested data structures using Jackson in Scala.",
      "Converted Excel-based schema definitions into structured JSON metadata using Python automation.",
      "Improved Spark ETL efficiency and supported reliable data ingestion and deployment workflows.",
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
    journal: "IEEE Xplore",
    year: "2025",
    note: "First Author",
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
