import type { ReactNode } from "react";

interface PageHeroProps {
  children: ReactNode;
  className?: string;
}

export function PageHero({ children, className = "" }: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-warm-gray px-6 text-white ${className}`}
    >
      {/* Radial gold glow — top-right */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, #D4A843 0%, #9B7A2D 40%, transparent 70%)",
        }}
      />

      {/* Soft glow — bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-[320px] w-[320px] rounded-full opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle, #D4A843 0%, transparent 65%)",
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D4A843 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Thin gold top border */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent" />

      {/* Content */}
      <div className="relative">{children}</div>
    </section>
  );
}
