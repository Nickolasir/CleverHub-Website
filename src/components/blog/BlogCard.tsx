"use client";

import type { BlogPost } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  "Family Living": "bg-[#FFF3D4] text-[#9B7A2D]",
  "Accessibility & Wellbeing": "bg-[#EFF6EF] text-[#3A6B3A]",
};

function SphereArt({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "md" ? 128 : 96;
  const rings = size === "md"
    ? [0, 12, 24, 36]
    : [0, 10, 20, 30];
  const coreInset = size === "md" ? 48 : 36;
  const dotTop = size === "md" ? "top-1 right-9" : "top-0.5 right-7";
  const dotSize = size === "md" ? "h-2 w-2" : "h-1.5 w-1.5";

  return (
    <div
      className="relative"
      style={{ width: dim, height: dim }}
    >
      {rings.map((inset, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-[#D4A843]"
          style={{
            inset,
            opacity: 0.12 + i * 0.1,
          }}
        />
      ))}
      <div
        className="absolute rounded-full bg-gradient-to-br from-[#D4A843] to-[#9B7A2D]"
        style={{ inset: coreInset }}
      />
      <div className={`absolute ${dotTop} ${dotSize} rounded-full bg-[#E8B84B]`} />
    </div>
  );
}

export function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const badgeClass =
    categoryColors[post.category] ?? "bg-[#FFF3D4] text-[#9B7A2D]";

  if (featured) {
    return (
      <a
        href={`/blog/${post.slug}`}
        className="blog-card group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--card-border)] bg-card shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] md:flex-row"
      >
        {/* Decorative cover panel */}
        <div className="relative flex h-64 w-full shrink-0 items-center justify-center overflow-hidden bg-[#111] md:h-auto md:w-[38%]">
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle at 60% 40%, #D4A843 0%, transparent 60%)",
            }}
          />
          <SphereArt size="md" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col justify-between p-8 md:p-10">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${badgeClass}`}>
                {post.category}
              </span>
              <span className="text-xs text-[var(--muted)]/60">
                {post.publishedAt} &middot; {post.readTime}
              </span>
            </div>
            <h2 className="font-[var(--font-outfit)] text-2xl font-semibold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-[var(--accent)] md:text-3xl">
              {post.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              {post.subtitle}
            </p>
          </div>
          <div className="mt-8 flex items-center gap-2 border-t border-[var(--card-border)] pt-6">
            <span className="text-sm font-medium text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-1">
              Read article →
            </span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={`/blog/${post.slug}`}
      className="blog-card group flex flex-col rounded-2xl border border-[var(--card-border)] bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      {/* Cover tile */}
      <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-[#111]">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "radial-gradient(circle at 55% 45%, #D4A843 0%, transparent 65%)",
          }}
        />
        <SphereArt size="sm" />
        <div className="absolute bottom-4 left-4">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${badgeClass}`}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h2 className="font-[var(--font-outfit)] text-lg font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-[var(--accent)]">
          {post.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
          {post.subtitle}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-[var(--card-border)] pt-4">
          <span className="text-xs text-[var(--muted)]/70">
            {post.publishedAt} &middot; {post.readTime}
          </span>
          <span className="text-xs font-medium text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-0.5">
            Read →
          </span>
        </div>
      </div>
    </a>
  );
}
