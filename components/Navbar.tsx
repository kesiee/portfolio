"use client";

import { useState, useEffect } from "react";
import { personal } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo — first name as brand mark */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-lg font-extrabold tracking-tight transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-display)", color: "var(--amber)" }}
            >
              {personal.firstName}
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="text-sm font-medium transition-colors duration-200 hover:text-amber-400"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                >
                  {link.label}
                </a>
              ))}

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--muted)",
                  backgroundColor: "var(--card)",
                }}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium px-4 py-1.5 rounded border transition-colors duration-200 hover:bg-amber-500 hover:border-amber-500"
                style={{
                  color: "var(--amber)",
                  borderColor: "var(--amber)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Resume
              </a>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--muted)",
                  backgroundColor: "var(--card)",
                }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
              <button
                className="flex flex-col gap-1.5 p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span
                  className="block w-6 h-0.5 transition-all duration-300"
                  style={{
                    backgroundColor: "var(--text)",
                    transform: menuOpen ? "rotate(45deg) translate(3px, 7px)" : "none",
                  }}
                />
                <span
                  className="block w-6 h-0.5 transition-all duration-300"
                  style={{ backgroundColor: "var(--text)", opacity: menuOpen ? 0 : 1 }}
                />
                <span
                  className="block w-6 h-0.5 transition-all duration-300"
                  style={{
                    backgroundColor: "var(--text)",
                    transform: menuOpen ? "rotate(-45deg) translate(3px, -7px)" : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{ pointerEvents: menuOpen ? "auto" : "none", opacity: menuOpen ? 1 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--mobile-overlay)" }}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className="absolute top-16 right-0 w-64 h-screen flex flex-col gap-2 p-6 transition-transform duration-300"
          style={{
            backgroundColor: "var(--surface)",
            borderLeft: "1px solid var(--border)",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="text-base font-medium py-2 transition-colors duration-200 hover:text-amber-400"
              style={{ color: "var(--text)", fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm font-medium px-4 py-2 rounded border text-center transition-colors duration-200 hover:bg-amber-500 hover:border-amber-500"
            style={{
              color: "var(--amber)",
              borderColor: "var(--amber)",
              fontFamily: "var(--font-body)",
            }}
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
