"use client";

import { useFadeIn } from "@/hooks/useGSAP";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className = "",
  dark = false,
}: SectionWrapperProps) {
  const ref = useFadeIn<HTMLElement>({ y: 16 });

  return (
    <section
      id={id}
      ref={ref}
      className={`px-6 py-12 md:py-16 ${
        dark ? "bg-warm-gray text-white" : "bg-background"
      } ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
