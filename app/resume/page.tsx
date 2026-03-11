"use client";

import { useRef } from "react";

export default function ResumePage() {
  const handlePrint = () => window.print();

  return (
    <>
      {/* Print button — hidden on print */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-3">
        <a
          href="/"
          className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors"
          style={{ borderColor: "#d1d5db", color: "#374151", background: "#fff" }}
        >
          ← Portfolio
        </a>
        <button
          onClick={handlePrint}
          className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
          style={{ background: "#111827", color: "#fff" }}
        >
          Save as PDF
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #f3f4f6;
          font-family: 'DM Sans', sans-serif;
        }

        .resume {
          background: #ffffff;
          width: 8.5in;
          min-height: 11in;
          margin: 2rem auto;
          padding: 0.55in 0.6in;
          font-size: 10.5pt;
          line-height: 1.45;
          color: #111827;
        }

        /* ── Header ── */
        .resume-header { text-align: center; margin-bottom: 0.6rem; }
        .resume-header h1 {
          font-size: 22pt;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 0.3rem;
        }
        .resume-header .contact-line {
          font-size: 9.5pt;
          color: #374151;
        }
        .resume-header .contact-line a {
          color: #111827;
          text-decoration: none;
        }
        .resume-header .contact-line a:hover { text-decoration: underline; }
        .resume-header .sep { margin: 0 0.3rem; color: #9ca3af; }

        /* ── Section ── */
        .section { margin-top: 0.65rem; }
        .section-title {
          font-size: 10pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #111827;
          border-bottom: 1.5px solid #111827;
          padding-bottom: 2px;
          margin-bottom: 0.45rem;
        }

        /* ── Summary ── */
        .summary { font-size: 9.5pt; color: #374151; text-align: justify; }

        /* ── Entry (experience / education) ── */
        .entry { margin-bottom: 0.5rem; }
        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.5rem;
        }
        .entry-title { font-weight: 700; font-size: 10pt; }
        .entry-date { font-size: 9pt; color: #6b7280; white-space: nowrap; }
        .entry-sub {
          display: flex;
          justify-content: space-between;
          font-size: 9pt;
          color: #6b7280;
          font-style: italic;
          margin-top: 1px;
          margin-bottom: 4px;
        }
        .entry-bullets { padding-left: 1.1rem; }
        .entry-bullets li {
          font-size: 9.5pt;
          color: #374151;
          margin-bottom: 2px;
          list-style-type: disc;
        }

        /* ── Project entry ── */
        .project-entry { margin-bottom: 0.45rem; }
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 3px;
        }
        .project-title { font-weight: 700; font-size: 10pt; }
        .project-context { font-size: 9pt; color: #6b7280; }
        .project-tech { font-weight: 400; font-style: italic; color: #374151; }
        .project-link { font-size: 9pt; color: #2563eb; text-decoration: none; }
        .project-link:hover { text-decoration: underline; }

        /* ── Skills ── */
        .skills-grid { display: flex; flex-direction: column; gap: 3px; }
        .skill-row { font-size: 9.5pt; color: #374151; }
        .skill-row strong { color: #111827; }

        /* ── Publications ── */
        .pub-entry {
          font-size: 9.5pt;
          color: #374151;
          margin-bottom: 0.35rem;
          padding-left: 1rem;
          text-indent: -1rem;
        }
        .pub-entry a { color: #2563eb; text-decoration: none; }
        .pub-entry a:hover { text-decoration: underline; }
        .pub-entry em { font-style: italic; }
        .pub-badge {
          font-weight: 700;
          color: #111827;
        }

        /* ── Print styles ── */
        @media print {
          .no-print { display: none !important; }
          body { background: #fff; }
          .resume {
            margin: 0;
            padding: 0.5in 0.55in;
            width: 100%;
            min-height: unset;
            box-shadow: none;
          }
          @page {
            size: letter;
            margin: 0;
          }
        }
      `}</style>

      <div className="resume">
        {/* ── HEADER ── */}
        <div className="resume-header">
          <h1>Shashank Kammanahalli</h1>
          <div className="contact-line">
            <a href="mailto:shashankkesiee@gmail.com">shashankkesiee@gmail.com</a>
            <span className="sep">|</span>
            +1 (470) 546-3083
          </div>
          <div className="contact-line" style={{ marginTop: "2px" }}>
            <a href="https://www.linkedin.com/in/shashank-kammanahalli-chandra-sekhara-72778a230/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="sep">|</span>
            <a href="https://github.com/kesiee" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="sep">|</span>
            <a href="https://orcid.org/0009-0004-4676-5014" target="_blank" rel="noopener noreferrer">ORCiD</a>
          </div>
        </div>

        {/* ── PROFESSIONAL SUMMARY ── */}
        <div className="section">
          <div className="section-title">Professional Summary</div>
          <p className="summary">
            Results-driven Data Scientist and ML Engineer with 2+ years building production pipelines on 1.2M+ time-series records.
            2x IEEE published researcher (first author, IEEE Access 2026) specializing in XGBoost forecasting, anomaly detection,
            and scalable Spark/Databricks pipelines. Seeking Data Scientist or ML Engineer roles to drive measurable impact through applied ML.
          </p>
        </div>

        {/* ── EXPERIENCE ── */}
        <div className="section">
          <div className="section-title">Experience</div>

          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">Graduate Research Assistant — Clustering &amp; Forecasting Research</span>
              <span className="entry-date">May 2025 – Dec 2025</span>
            </div>
            <div className="entry-sub">
              <span>Columbus State University</span>
              <span>Columbus, GA</span>
            </div>
            <ul className="entry-bullets">
              <li>Performed multivariate time-series clustering across 90+ buildings using tslearn and distance-based methods (DTW, Euclidean) to identify energy consumption behavior archetypes.</li>
              <li>Implemented seasonal-aware clustering by isolating dominant operational seasons and clustering buildings on season-specific temporal dynamics.</li>
              <li>Reshaped and standardized building-level datasets into (n_buildings, n_timesteps, n_features) format, enabling scalable and consistent pattern discovery.</li>
              <li>Integrated weather, occupancy, and facility-area signals to improve semantic separation of operational profiles across clusters.</li>
              <li>Evaluated cluster quality using silhouette scores, inertia, and downstream XGBoost forecasting performance (R², SMAPE) at the cluster level.</li>
              <li>Leveraged cluster-specific modeling to improve forecasting accuracy and interpretability compared to global models.</li>
            </ul>
          </div>

          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">Graduate Research Assistant — ML Engineer</span>
              <span className="entry-date">Jun 2024 – Apr 2025</span>
            </div>
            <div className="entry-sub">
              <span>Columbus State University</span>
              <span>Columbus, GA</span>
            </div>
            <ul className="entry-bullets">
              <li>Built forecasting and anomaly-detection models for 91 buildings using Python, PySpark, and XGBoost, improving energy monitoring and operational efficiency.</li>
              <li>Deployed end-to-end data pipelines on Databricks and Delta Lake, processing 1.2M+ time-series records for real-time analysis and reporting.</li>
              <li>Engineered advanced time-series features (lags, rolling stats, Fourier encodings, STL decomposition) achieving model performance up to R² = 0.98.</li>
              <li>Applied statistical anomaly detection methods, including Bollinger Bands and threshold-based techniques, to flag abnormal energy consumption patterns.</li>
              <li>Designed custom normalization and reverse-scaling framework that improved model interpretability and accuracy across building categories.</li>
            </ul>
          </div>

          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">Junior Software Engineer — Data Engineering</span>
              <span className="entry-date">Jun 2022 – May 2023</span>
            </div>
            <div className="entry-sub">
              <span>Innova Solutions</span>
              <span>Chennai, TN</span>
            </div>
            <ul className="entry-bullets">
              <li>Automated data schema validation and quality checks using PySpark and Scala, reducing manual QA effort and increasing system reliability.</li>
              <li>Developed scalable JSON parsing workflows for complex nested data structures using Jackson in Scala.</li>
              <li>Converted Excel-based schema definitions into structured JSON metadata using Python automation, streamlining data onboarding.</li>
              <li>Improved Spark ETL efficiency and collaborated with engineering teams to support reliable data ingestion and deployment workflows.</li>
            </ul>
          </div>
        </div>

        {/* ── PROJECTS ── */}
        <div className="section">
          <div className="section-title">Projects</div>

          <div className="project-entry">
            <div className="project-header">
              <span className="project-title">
                Flight Analysis{" "}
                <span className="project-tech">| Spark, Scala, AWS S3, EMR, Zeppelin</span>{" "}
                <a className="project-link" href="https://gitlab.com/shashankkesiee/commercial-flights-analysis" target="_blank" rel="noopener noreferrer">[Link]</a>
              </span>
              <span className="project-context">Innova Solutions</span>
            </div>
            <ul className="entry-bullets">
              <li>Built a distributed Spark application to analyze over 130 million commercial airline flight records.</li>
              <li>Performed large-scale data cleaning, identified canceled flights, computed delay metrics, and analyzed daily flight activity patterns.</li>
              <li>Utilized AWS S3 and EMR for scalable storage and processing, with Zeppelin notebooks for exploratory analysis and visualization.</li>
              <li>Delivered analytical insights and visualizations to support data-driven operational decision-making.</li>
            </ul>
          </div>

          <div className="project-entry">
            <div className="project-header">
              <span className="project-title">
                Store Sales Forecasting{" "}
                <span className="project-tech">| XGBoost, STL, GMM, Python, Pandas</span>{" "}
                <a className="project-link" href="https://www.kaggle.com/code/shashankkc/stl-forecasting" target="_blank" rel="noopener noreferrer">[Link]</a>
              </span>
              <span className="project-context">Kaggle Competition</span>
            </div>
            <ul className="entry-bullets">
              <li>Built a time-series forecasting pipeline for 54 stores and 33 product families using XGBoost with lag features, STL decomposition, and GMM-based soft clustering.</li>
              <li>Engineered store-level behavioral clusters using Gaussian Mixture Models to enable cluster-specific modeling strategies.</li>
              <li>Applied STL decomposition to isolate trend, seasonality, and residual components for improved feature quality.</li>
            </ul>
          </div>
        </div>

        {/* ── EDUCATION ── */}
        <div className="section">
          <div className="section-title">Education</div>

          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">Master of Science in Applied Computer Science (Data Science)</span>
              <span className="entry-date">Jan 2024 – Dec 2025</span>
            </div>
            <div className="entry-sub">
              <span>Columbus State University</span>
              <span>GPA: 4.0 / 4.0</span>
            </div>
          </div>

          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">Bachelor of Engineering in Computer Science</span>
              <span className="entry-date">Aug 2017 – Aug 2021</span>
            </div>
            <div className="entry-sub">
              <span>Bangalore Institute of Technology</span>
              <span></span>
            </div>
          </div>
        </div>

        {/* ── TECHNICAL SKILLS ── */}
        <div className="section">
          <div className="section-title">Technical Skills</div>
          <div className="skills-grid">
            <div className="skill-row"><strong>Languages:</strong> Python, Scala, SQL</div>
            <div className="skill-row"><strong>AI / ML:</strong> XGBoost, Scikit-learn, LSTM, TensorFlow, PyTorch, tslearn, DTW</div>
            <div className="skill-row"><strong>Data Engineering:</strong> PySpark, Apache Spark, Delta Lake, Airflow, Hadoop, Feature Engineering</div>
            <div className="skill-row"><strong>Cloud:</strong> AWS (S3, EC2, EMR, Lambda, VPC, CloudWatch, IAM), Azure Databricks, Databricks Asset Bundles</div>
            <div className="skill-row"><strong>Libraries:</strong> Pandas, NumPy, Matplotlib, Seaborn, MLflow</div>
            <div className="skill-row"><strong>Other:</strong> Git, SQL, Prompt Engineering</div>
          </div>
        </div>

        {/* ── PUBLICATIONS ── */}
        <div className="section">
          <div className="section-title">Publications</div>
          <p className="pub-entry">
            Shashank Kammanahalli, et al. &ldquo;An Integrated Data Engineering and Machine Learning Framework for Energy Prediction and Fault Detection in Smart Buildings,&rdquo; <em>IEEE Access</em>, March 2026.{" "}
            <span className="pub-badge">[First Author]</span>{" "}
            <a href="https://doi.org/10.1109/ACCESS.2026.3671169" target="_blank" rel="noopener noreferrer">[Link]</a>
          </p>
          <p className="pub-entry">
            Shashank Kammanahalli, et al. &ldquo;A Practical Framework for Energy Fault Detection in Smart Buildings,&rdquo; <em>IEEE Xplore</em>, 2025.{" "}
            <a href="https://doi.org/10.1109/AIRC64931.2025.11077504" target="_blank" rel="noopener noreferrer">[Link]</a>
          </p>
        </div>
      </div>
    </>
  );
}
