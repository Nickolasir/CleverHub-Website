"use client";

import { useFadeIn } from "@/hooks/useGSAP";
import type { BlogPost } from "@/lib/blog";

const categoryBadge: Record<string, string> = {
  "Family Living": "bg-[#FFF3D4] text-[#9B7A2D]",
  "Accessibility & Wellbeing": "bg-[#F0F7F0] text-[#3A6B3A]",
};

export default function PostContent({ post }: { post: BlogPost }) {
  const headerRef = useFadeIn<HTMLDivElement>({ y: 20 });
  const bodyRef = useFadeIn<HTMLDivElement>({ y: 16, delay: 0.1 });

  const badgeClass =
    categoryBadge[post.category] ?? "bg-[#FFF3D4] text-[#9B7A2D]";

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-gray px-6 pb-20 pt-40 text-white md:pb-24 md:pt-52">
        <div ref={headerRef} className="mx-auto max-w-2xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${badgeClass}`}
            >
              {post.category}
            </span>
            <span className="text-xs text-white/40">
              {post.publishedAt} &middot; {post.readTime}
            </span>
          </div>
          <h1 className="font-[var(--font-outfit)] text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            {post.subtitle}
          </p>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-background px-6 py-20 md:py-28">
        <article ref={bodyRef} className="mx-auto max-w-2xl">
          {/* Intro */}
          <p className="text-base leading-[1.9] text-[var(--muted)] mb-12 text-lg">
            {post.intro}
          </p>

          {/* Sections */}
          {post.sections.map((section, i) => (
            <div key={i} className="mb-12">
              {i > 0 && (
                <hr className="mb-12 border-[var(--card-border)]" />
              )}
              <h2 className="font-[var(--font-outfit)] text-xl font-semibold text-foreground mb-4 md:text-2xl">
                {section.heading}
              </h2>
              <p className="text-base leading-[1.9] text-[var(--muted)]">
                {section.body}
              </p>
            </div>
          ))}

          {/* CTA block */}
          <div className="mt-16 rounded-2xl border border-[var(--card-border)] bg-[var(--section-alt)] p-8 text-center shadow-[var(--shadow-card)]">
            <p className="mb-6 text-base leading-relaxed text-foreground">
              {post.cta}
            </p>
            <a
              href="/#consultation"
              className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-light"
            >
              Book a Free Consultation
            </a>
          </div>

          {/* Sources */}
          {post.sources && post.sources.length > 0 && (
            <div className="mt-16 border-t border-[var(--card-border)] pt-10">
              <h3 className="mb-4 font-[var(--font-outfit)] text-sm font-semibold uppercase tracking-widest text-[var(--muted)]/60">
                Sources
              </h3>
              <ul className="flex flex-col gap-2">
                {post.sources.map((source, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                    <span className="mt-0.5 shrink-0 text-[var(--accent)]">↗</span>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[var(--card-border)] underline-offset-4 transition-colors duration-200 hover:text-[var(--accent)]"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 text-center">
            <a
              href="/blog"
              className="text-sm text-[var(--muted)] underline decoration-[var(--card-border)] underline-offset-4 transition-colors duration-200 hover:text-[var(--accent)]"
            >
              ← Back to the Blog
            </a>
          </div>
        </article>
      </section>
    </>
  );
}
