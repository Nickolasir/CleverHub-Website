import { blogPosts } from "@/data/blog-posts";

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedAt: string;
  coverAlt: string;
  intro: string;
  sections: { heading: string; body: string }[];
  cta: string;
  sources: { label: string; url: string }[];
};

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
