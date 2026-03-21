"use client";

export default function ResumePage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f3f4f6; }
        .resume-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
          padding: 1.5rem 1rem;
        }
        .resume-actions {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .resume-actions a {
          padding: 0.5rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .resume-actions a:hover { opacity: 0.85; }
        .btn-back {
          background: #fff;
          color: #374151;
          border: 1px solid #d1d5db;
        }
        .btn-download {
          background: #111827;
          color: #fff;
        }
        .pdf-embed {
          width: 100%;
          max-width: 8.5in;
          height: calc(100vh - 6rem);
          border: none;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        }
        .pdf-fallback {
          text-align: center;
          margin-top: 2rem;
          color: #6b7280;
          font-size: 0.95rem;
        }
        .pdf-fallback a { color: #2563eb; }

        @media print {
          .resume-actions { display: none !important; }
          .pdf-embed { height: 100vh; }
        }
      `}</style>

      <div className="resume-page">
        <div className="resume-actions">
          <a href="/" className="btn-back">← Portfolio</a>
          <a href="/resume.pdf" download="Shashank_Kammanahalli_Resume.pdf" className="btn-download">
            Download PDF
          </a>
        </div>

        <iframe
          src="/resume.pdf"
          className="pdf-embed"
          title="Shashank Kammanahalli - Resume"
        />

        <p className="pdf-fallback">
          PDF not loading?{" "}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Open in new tab
          </a>{" "}
          or{" "}
          <a href="/resume.pdf" download="Shashank_Kammanahalli_Resume.pdf">
            download directly
          </a>.
        </p>
      </div>
    </>
  );
}
