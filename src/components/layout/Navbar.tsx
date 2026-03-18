"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Features", href: "#features" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-full bg-gradient-to-br from-[#0a0a0a] to-[#333] shadow-lg ring-2 ${
              scrolled ? "ring-accent/30" : "ring-white/20"
            }`}
          />
          <span
            className={`font-[var(--font-outfit)] text-xl font-bold tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            CleverHub
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                scrolled ? "text-foreground/70" : "text-white/80"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#consultation"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/25"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 transition-all ${
              scrolled ? "bg-foreground" : "bg-white"
            } ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 transition-all ${
              scrolled ? "bg-foreground" : "bg-white"
            } ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 transition-all ${
              scrolled ? "bg-foreground" : "bg-white"
            } ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 border-b border-card-border bg-white/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-foreground/80 hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#consultation"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
