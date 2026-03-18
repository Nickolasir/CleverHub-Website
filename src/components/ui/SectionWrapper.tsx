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
  const ref = useFadeIn<HTMLElement>({ y: 30 });

  return (
    <section
      id={id}
      ref={ref}
      className={`px-6 py-24 md:py-32 ${
        dark ? "bg-warm-gray text-white" : "bg-background"
      } ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
