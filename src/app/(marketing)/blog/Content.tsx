"use client";

import { useFadeIn, useStaggerReveal } from "@/hooks/useGSAP";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";
import { PageHero } from "@/components/ui/PageHero";

const posts = getAllPosts();
const [featured, ...rest] = posts;

export default function BlogContent() {
  const heroRef    = useFadeIn<HTMLDivElement>({ y: 24 });
  const featuredRef = useFadeIn<HTMLDivElement>({ y: 20, delay: 0.12 });
  const gridRef    = useStaggerReveal<HTMLDivElement>(".blog-card", { stagger: 0.14, y: 20 });

  return (
    <>
      {/* ── Hero ── */}
      <PageHero className="pb-24 pt-40 md:pb-28 md:pt-52">
        <div ref={heroRef} className="mx-auto max-w-3xl text-center">
          <span className="mb-5 inline-block rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium tracking-widest text-white/50 uppercase">
            Insights &amp; Guides
          </span>
          <h1 className="font-[var(--font-outfit)] text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            The CleverHub Blog
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
            Practical guides, real stories, and ideas on how smart home
            technology can improve everyday life — for every kind of household.
          </p>
        </div>
      </PageHero>

      {/* ── Posts ── */}
      <section className="relative overflow-hidden bg-background px-6 pb-28 pt-20 md:pb-36 md:pt-28">

        {/* Giant faded editorial word — background texture */}
        <div
          className="pointer-events-none absolute -top-4 left-0 right-0 select-none text-center"
          aria-hidden="true"
        >
          <span className="font-[var(--font-outfit)] text-[9rem] font-black uppercase leading-none tracking-tighter text-[#D4A843]/[0.045] md:text-[15rem]">
            Stories
          </span>
        </div>

        <div className="relative mx-auto max-w-5xl">

          {/* ── Cover story ── */}
          {featured && (
            <div ref={featuredRef} className="mb-24">
              {/* Masthead label */}
              <div className="mb-7 flex items-center gap-4">
                <div className="h-px w-10 bg-[var(--accent)]" />
                <span className="font-[var(--font-outfit)] text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                  Cover Story
                </span>
                <div className="h-px flex-1 bg-[var(--card-border)]" />
              </div>
              <BlogCard post={featured} featured />
            </div>
          )}

          {/* ── More stories ── */}
          {rest.length > 0 && (
            <div>
              {/* Section break — bold editorial rule */}
              <div className="mb-10 flex items-end justify-between border-b-[2px] border-foreground pb-3">
                <h2 className="font-[var(--font-outfit)] text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  More Stories
                </h2>
                <span className="mb-0.5 font-[var(--font-outfit)] text-xs tabular-nums text-[var(--muted)]/40">
                  {rest.length} article{rest.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div ref={gridRef} className="grid gap-8 sm:grid-cols-2">
                {rest.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 && (
            <p className="text-center text-[var(--muted)]">No posts yet — check back soon.</p>
          )}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="bg-[var(--section-alt)] px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[var(--font-outfit)] text-2xl font-semibold text-foreground md:text-3xl">
            See what CleverHub can do for your home
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
            Every home is different. Book a free consultation and we'll design
            a system that fits your household perfectly.
          </p>
          <a
            href="/#consultation"
            className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-light"
          >
            Book a Free Consultation
          </a>
        </div>
      </section>
    </>
  );
}
