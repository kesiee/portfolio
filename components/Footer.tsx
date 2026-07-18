export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-10 border-t" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
          © {year} Shashank Kammanahalli
        </p>
        <p className="text-xs flex items-center gap-3" style={{ color: "var(--faint)", fontFamily: "var(--font-mono)" }}>
          <span>Built with Next.js &amp; Tailwind</span>
          <span>·</span>
          <a
            href="https://github.com/kesiee/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-[var(--accent)]"
            style={{ color: "var(--faint)" }}
          >
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
