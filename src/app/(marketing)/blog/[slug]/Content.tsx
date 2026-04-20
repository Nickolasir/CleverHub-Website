"use client";

import { useFadeIn } from "@/hooks/useGSAP";
import type { BlogPost } from "@/lib/blog";

const categoryBadge: Record<string, string> = {
  "Family Living": "bg-[#FFF3D4] text-[#9B7A2D]",
  "Accessibility & Wellbeing": "bg-[#EFF6EF] text-[#3A6B3A]",
};

export default function PostContent({ post }: { post: BlogPost }) {
  const headerRef = useFadeIn<HTMLDivElement>({ y: 20 });
  const bodyRef = useFadeIn<HTMLDivElement>({ y: 16, delay: 0.1 });

  const badgeClass =
    categoryBadge[post.category] ?? "bg-[#FFF3D4] text-[#9B7A2D]";

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-gray px-6 pb-20 pt-40 text-white md:pb-28 md:pt-52">
        <div ref={headerRef} className="mx-auto max-w-2xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${badgeClass}`}>
              {post.category}
            </span>
            <span className="text-xs text-white/40">
              {post.publishedAt} &middot; {post.readTime}
            </span>
          </div>
          <h1 className="font-[var(--font-outfit)] text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            {post.subtitle}
          </p>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-background px-6 py-20 md:py-28">
        <article ref={bodyRef} className="mx-auto max-w-2xl">

          {/* Intro — larger, more editorial */}
          <p className="mb-14 text-lg leading-[1.85] text-foreground/80 md:text-xl">
            {post.intro}
          </p>

          {/* Sections */}
          {post.sections.map((section, i) => (
            <div key={i} className="mb-14">
              {/* Section heading with gold left accent */}
              <div className="mb-5 flex items-start gap-4">
                <span className="mt-1.5 shrink-0 text-xs font-semibold tabular-nums text-[var(--accent)]/60 md:text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-[var(--font-outfit)] text-xl font-semibold leading-snug text-foreground md:text-2xl">
                  {section.heading}
                </h2>
              </div>
              <p className="ml-8 text-base leading-[1.9] text-[var(--muted)] md:ml-10">
                {section.body}
              </p>

              {/* Section divider — except after last section */}
              {i < post.sections.length - 1 && (
                <div className="ml-8 mt-14 flex items-center gap-3 md:ml-10">
                  <div className="h-px flex-1 bg-[var(--card-border)]" />
                  <div className="h-1 w-1 rounded-full bg-[var(--accent)]/40" />
                  <div className="h-px w-8 bg-[var(--card-border)]" />
                </div>
              )}
            </div>
          ))}

          {/* CTA block */}
          <div className="mt-16 overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--section-alt)] shadow-[var(--shadow-card)]">
            <div className="h-1 w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)]" />
            <div className="p-8 text-center md:p-10">
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
          </div>

          {/* Sources */}
          {post.sources && post.sources.length > 0 && (
            <div className="mt-16 border-t border-[var(--card-border)] pt-10">
              <h3 className="mb-5 font-[var(--font-outfit)] text-xs font-semibold uppercase tracking-widest text-[var(--muted)]/50">
                Sources
              </h3>
              <ul className="flex flex-col gap-3">
                {post.sources.map((source, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--muted)]">
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
