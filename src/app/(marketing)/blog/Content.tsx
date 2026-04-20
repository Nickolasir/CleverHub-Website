"use client";

import { useFadeIn, useStaggerReveal } from "@/hooks/useGSAP";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

const posts = getAllPosts();

export default function BlogContent() {
  const heroRef = useFadeIn<HTMLDivElement>({ y: 24 });
  const gridRef = useStaggerReveal<HTMLDivElement>(".blog-card", {
    stagger: 0.14,
    y: 20,
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-gray px-6 pb-28 pt-40 text-white md:pb-32 md:pt-52">
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
      </section>

      {/* Post grid */}
      <section className="bg-background px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div
            ref={gridRef}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
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
