"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

interface VideoOverlayProps {
  text: string;
  subtext?: string;
  /** 0-1 range for when this overlay appears in scroll progress */
  startProgress: number;
  /** 0-1 range for when this overlay disappears */
  endProgress: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function VideoOverlay({
  text,
  subtext,
  startProgress,
  endProgress,
  containerRef,
}: VideoOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const container = containerRef.current;
    if (!overlay || !container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(overlay, { opacity: 0, y: 20 });

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        const fadeInEnd = startProgress + 0.02;
        const fadeOutStart = endProgress - 0.02;

        if (p >= startProgress && p <= endProgress) {
          let opacity = 1;
          let y = 0;
          if (p < fadeInEnd) {
            const t = (p - startProgress) / (fadeInEnd - startProgress);
            opacity = t;
            y = 20 * (1 - t);
          } else if (p > fadeOutStart) {
            const t = (p - fadeOutStart) / (endProgress - fadeOutStart);
            opacity = 1 - t;
            y = -10 * t;
          }
          gsap.set(overlay, { opacity, y });
        } else {
          gsap.set(overlay, { opacity: 0 });
        }
      },
    });

    return () => st.kill();
  }, [startProgress, endProgress, containerRef]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
    >
      <h2 className="font-[var(--font-outfit)] text-4xl font-bold text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
        {text}
      </h2>
      {subtext && (
        <p className="mt-4 max-w-lg text-lg text-white/70 drop-shadow-lg md:text-xl">
          {subtext}
        </p>
      )}
    </div>
  );
}
