import type { Metadata } from "next";
import BlogContent from "./Content";

export const metadata: Metadata = {
  title: "Blog - CleverHub | Smart Home Insights & Guides",
  description:
    "Practical guides and real stories on how smart home automation can improve everyday life — for busy families, older adults, and every kind of household.",
  alternates: { canonical: "/blog" },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "The CleverHub Blog",
  description:
    "Smart home insights, guides, and stories from CleverHub — Houston's leading home automation company.",
  publisher: { "@type": "Organization", name: "CleverHub" },
  url: "https://cleverhub.space/blog",
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogContent />
    </>
  );
}
