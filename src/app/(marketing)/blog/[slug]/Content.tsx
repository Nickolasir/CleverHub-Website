"use client";

import { useFadeIn } from "@/hooks/useGSAP";
import type { BlogPost } from "@/lib/blog";
import { PageHero } from "@/components/ui/PageHero";

const categoryBadge: Record<string, string> = {
  "Family Living":             "bg-[#FFF3D4] text-[#9B7A2D]",
  "Accessibility & Wellbeing": "bg-[#EFF6EF] text-[#3A6B3A]",
};

function SectionOrnament() {
  return (
    <div className="my-8 flex items-center justify-center gap-2.5" aria-hidden="true">
      <div className="h-px w-12 bg-[var(--card-border)]" />
      <div className="h-1 w-1 rounded-full bg-[var(--accent)]/30" />
      <div className="h-[5px] w-[5px] rounded-full bg-[var(--accent)]/55" />
      <div className="h-1 w-1 rounded-full bg-[var(--accent)]/30" />
      <div className="h-px w-12 bg-[var(--card-border)]" />
    </div>
  );
}

export default function PostContent({ post }: { post: BlogPost }) {
  const headerRef = useFadeIn<HTMLDivElement>({ y: 20 });
  const bodyRef   = useFadeIn<HTMLDivElement>({ y: 16, delay: 0.1 });

  const badgeClass = categoryBadge[post.category] ?? "bg-[#FFF3D4] text-[#9B7A2D]";

  const introFirstChar = post.intro[0] ?? "";
  const introRest      = post.intro.slice(1);

  return (
    <>
      {/* ── Hero ── */}
      <PageHero className="pb-20 pt-40 md:pb-28 md:pt-52">
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
      </PageHero>

      {/* ── Article body ── */}
      <section className="bg-background px-6 py-20 md:py-28">
        <article ref={bodyRef} className="mx-auto max-w-[680px]">

          {/* Article open rule */}
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--card-border)]" />
            <div className="h-[5px] w-[5px] rounded-full bg-[var(--accent)]/60" />
            <div className="h-px w-8 bg-[var(--card-border)]" />
          </div>

          {/* Intro — drop cap */}
          <p className="mb-10 text-justify text-lg leading-[1.85] text-foreground/80 md:text-[1.2rem]">
            <span
              className="float-left mr-3 mt-1 font-[var(--font-outfit)] text-[5rem] font-bold leading-[0.75] text-[var(--accent)]"
              aria-hidden="true"
            >
              {introFirstChar}
            </span>
            {introRest}
          </p>

          {/* ── Sections ── */}
          {post.sections.map((section, i) => (
            <div key={i}>
              {/* Section number + heading + body */}
              <div className="relative">
                {/* Faded section number — background */}
                <span
                  className="pointer-events-none absolute -left-2 -top-3 select-none font-[var(--font-outfit)] text-[5.5rem] font-black leading-none tabular-nums text-[#D4A843]/[0.07]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Heading with gold left bar */}
                <div className="relative border-l-[3px] border-[var(--accent)] pl-5">
                  <h2 className="font-[var(--font-outfit)] text-xl font-semibold leading-snug text-foreground md:text-2xl">
                    {section.heading}
                  </h2>
                </div>

                {/* Body */}
                <p className="mt-5 text-justify text-base leading-[1.95] text-[var(--muted)]">
                  {section.body}
                </p>
              </div>

              {/* Ornamental divider — except after last */}
              {i < post.sections.length - 1 && <SectionOrnament />}
            </div>
          ))}

          {/* ── CTA block ── */}
          <div className="mt-20 overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[#111009] shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
            <div className="h-[3px] bg-gradient-to-r from-[var(--accent)] via-[var(--accent-light)] to-[var(--accent)]" />
            <div className="px-8 py-10 text-center md:px-12 md:py-12">
              <p className="mb-7 text-base leading-relaxed text-white/75">
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

          {/* ── Sources ── */}
          {post.sources && post.sources.length > 0 && (
            <div className="mt-16 border-t border-[var(--card-border)] pt-10">
              <h3 className="mb-5 font-[var(--font-outfit)] text-[0.65rem] font-bold uppercase tracking-[0.28em] text-[var(--muted)]/50">
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

          {/* ── Back link ── */}
          <div className="mt-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--card-border)]" />
            <a
              href="/blog"
              className="text-xs font-medium uppercase tracking-widest text-[var(--muted)]/60 transition-colors duration-200 hover:text-[var(--accent)]"
            >
              ← Back to Blog
            </a>
            <div className="h-px flex-1 bg-[var(--card-border)]" />
          </div>
        </article>
      </section>
    </>
  );
}
