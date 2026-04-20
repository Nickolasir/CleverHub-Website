"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Features", href: "#features" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const { isAuthenticated, loading: authLoading } = useAuth();
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
          ? "bg-white/80 backdrop-blur-xl shadow-[0_0.5px_0_rgba(0,0,0,0.08)] py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-full bg-gradient-to-br from-[#0a0a0a] to-[#333] shadow-lg ring-1 ${
              scrolled ? "ring-accent/20" : "ring-white/15"
            }`}
          />
          <span
            className={`font-[var(--font-outfit)] text-lg font-semibold tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            CleverHub
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-medium tracking-wide transition-colors duration-300 ${
                scrolled
                  ? "text-foreground/60 hover:text-foreground"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          {!authLoading && (
            <a
              href={isAuthenticated ? "/portal" : "/login"}
              className={`text-xs font-medium tracking-wide transition-colors duration-300 ${
                scrolled
                  ? "text-foreground/60 hover:text-foreground"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {isAuthenticated ? "My Account" : "Client Portal"}
            </a>
          )}
          <a
            href="#consultation"
            className="rounded-full bg-accent px-5 py-2 text-xs font-medium tracking-wide text-white transition-all duration-300 hover:bg-accent-light"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
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
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground/70 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            {!authLoading && (
              <a
                href={isAuthenticated ? "/portal" : "/login"}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-accent hover:text-accent-light"
              >
                {isAuthenticated ? "My Account" : "Client Portal"}
              </a>
            )}
            <a
              href="#consultation"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-2.5 text-center text-xs font-medium tracking-wide text-white"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
