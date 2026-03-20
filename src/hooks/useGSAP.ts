"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

export function useFadeIn<T extends HTMLElement = HTMLDivElement>(
  options?: { delay?: number; y?: number; duration?: number }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { opacity: 0, y: options?.y ?? 20 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.9,
          delay: options?.delay ?? 0,
          ease: "power2.out",
        });
      },
    });

    return () => trigger.kill();
  }, [options?.delay, options?.y, options?.duration]);

  return ref;
}

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  childSelector: string,
  options?: { stagger?: number; y?: number }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const children = el.querySelectorAll(childSelector);
    gsap.set(children, { opacity: 0, y: options?.y ?? 20 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: options?.stagger ?? 0.08,
          ease: "power2.out",
        });
      },
    });

    return () => trigger.kill();
  }, [childSelector, options?.stagger, options?.y]);

  return ref;
}
