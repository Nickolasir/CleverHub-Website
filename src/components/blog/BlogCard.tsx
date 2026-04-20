"use client";

import type { BlogPost } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  "Family Living": "bg-[#FFF3D4] text-[#9B7A2D]",
  "Accessibility & Wellbeing": "bg-[#F0F7F0] text-[#3A6B3A]",
};

const categoryGradients: Record<string, string> = {
  "Family Living": "from-[#D4A843]/20 to-[#E8B84B]/10",
  "Accessibility & Wellbeing": "from-[#6B9E6B]/15 to-[#8BC48B]/8",
};

export function BlogCard({ post }: { post: BlogPost }) {
  const badgeClass =
    categoryColors[post.category] ?? "bg-[#FFF3D4] text-[#9B7A2D]";
  const gradientClass =
    categoryGradients[post.category] ?? "from-[#D4A843]/20 to-[#E8B84B]/10";

  return (
    <a
      href={`/blog/${post.slug}`}
      className="blog-card group flex flex-col rounded-2xl border border-[var(--card-border)] bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      {/* Cover tile */}
      <div
        className={`h-44 w-full rounded-t-2xl bg-gradient-to-br ${gradientClass} flex items-end p-5`}
      >
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${badgeClass}`}
        >
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h2 className="font-[var(--font-outfit)] text-xl font-semibold leading-snug text-foreground group-hover:text-[var(--accent)] transition-colors duration-200">
          {post.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
          {post.subtitle}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
          <span className="text-xs text-[var(--muted)]/70">
            {post.publishedAt} &middot; {post.readTime}
          </span>
          <span className="text-xs font-medium text-[var(--accent)] group-hover:translate-x-0.5 transition-transform duration-200">
            Read article →
          </span>
        </div>
      </div>
    </a>
  );
}
