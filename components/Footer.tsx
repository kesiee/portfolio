export default function Footer() {
  return (
    <footer
      className="py-8 border-t"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-2">
        <p
          className="text-sm"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          &copy; 2025 Shashank Kammanahalli
        </p>
        <p
          className="text-xs"
          style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
        >
          Vibe coded with Claude &#10022; Built with Next.js &amp; Tailwind &#10022;{" "}
          <a
            href="https://github.com/kesiee/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            View Source
          </a>
        </p>
      </div>
    </footer>
  );
}
