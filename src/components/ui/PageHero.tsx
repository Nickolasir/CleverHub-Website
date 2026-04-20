import type { ReactNode } from "react";

interface PageHeroProps {
  children: ReactNode;
  className?: string;
}

export function PageHero({ children, className = "" }: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-[#111009] px-6 text-white ${className}`}
    >
      {/* ── CSS animations ── */}
      <style>{`
        @keyframes ch-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ch-pulse {
          0%, 100% { opacity: 0.82; }
          50%       { opacity: 1; }
        }
        @keyframes ch-dot-fade {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        .ch-ring-spin {
          transform-box: fill-box;
          transform-origin: center;
          animation: ch-orbit 24s linear infinite;
        }
        .ch-ring-spin-slow {
          transform-box: fill-box;
          transform-origin: center;
          animation: ch-orbit 38s linear infinite reverse;
        }
        .ch-sphere {
          animation: ch-pulse 5s ease-in-out infinite;
        }
        .ch-sat-1 { animation: ch-dot-fade 4s ease-in-out infinite; }
        .ch-sat-2 { animation: ch-dot-fade 4s ease-in-out 1.3s infinite; }
        .ch-sat-3 { animation: ch-dot-fade 4s ease-in-out 2.6s infinite; }
      `}</style>

      {/* ── Orbital sphere — bleeds in from right ── */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
        <svg
          viewBox="0 0 500 500"
          fill="none"
          className="h-[420px] w-[420px] translate-x-[28%] md:h-[560px] md:w-[560px] md:translate-x-[22%]"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="ph-atmo" cx="40%" cy="35%" r="65%">
              <stop offset="0%"   stopColor="#D4A843" stopOpacity="0.22" />
              <stop offset="60%"  stopColor="#D4A843" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#D4A843" stopOpacity="0"    />
            </radialGradient>
            <radialGradient id="ph-core" cx="36%" cy="30%" r="68%">
              <stop offset="0%"   stopColor="#F4D06A" />
              <stop offset="42%"  stopColor="#D4A843" />
              <stop offset="78%"  stopColor="#8A5E1A" />
              <stop offset="100%" stopColor="#3C2508" />
            </radialGradient>
            <radialGradient id="ph-spec" cx="30%" cy="28%" r="55%">
              <stop offset="0%"   stopColor="white" stopOpacity="0.14" />
              <stop offset="100%" stopColor="white" stopOpacity="0"    />
            </radialGradient>
          </defs>

          {/* Atmosphere halo */}
          <circle cx="250" cy="250" r="246" fill="url(#ph-atmo)" />

          {/* Ring 1 — equatorial, rotating */}
          <g className="ch-ring-spin">
            <ellipse
              cx="250" cy="250" rx="220" ry="70"
              stroke="#D4A843" strokeWidth="0.9" strokeOpacity="0.35" fill="none"
            />
            {/* satellite node on ring 1 */}
            <circle cx="470" cy="250" r="6" fill="#E8C84B" className="ch-sat-1" />
            <circle cx="30"  cy="250" r="4" fill="#D4A843" fillOpacity="0.6" className="ch-sat-2" />
          </g>

          {/* Ring 2 — tilted 58°, slow reverse spin */}
          <g transform="rotate(58 250 250)">
            <g className="ch-ring-spin-slow">
              <ellipse
                cx="250" cy="250" rx="185" ry="58"
                stroke="#D4A843" strokeWidth="0.6" strokeOpacity="0.22" fill="none"
              />
              <circle cx="435" cy="250" r="4.5" fill="#D4A843" className="ch-sat-3" />
            </g>
          </g>

          {/* Ring 3 — static, different tilt, faint */}
          <ellipse
            cx="250" cy="250" rx="150" ry="48"
            stroke="#E8B84B" strokeWidth="0.5" strokeOpacity="0.13" fill="none"
            transform="rotate(-38 250 250)"
          />

          {/* Sphere core */}
          <circle cx="250" cy="250" r="112" fill="url(#ph-core)" className="ch-sphere" />

          {/* Specular layer */}
          <circle cx="250" cy="250" r="112" fill="url(#ph-spec)" />

          {/* Hard specular dot */}
          <ellipse
            cx="210" cy="205" rx="28" ry="17"
            fill="white" fillOpacity="0.07"
            transform="rotate(-22 210 205)"
          />
        </svg>
      </div>

      {/* ── Left-to-right fade — keeps text readable ── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#111009] from-35% via-[#111009]/75 to-transparent" />

      {/* ── Gold hairline top ── */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/45 to-transparent" />

      {/* ── Content ── */}
      <div className="relative">{children}</div>
    </section>
  );
}
