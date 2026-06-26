import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/catalog";

// Mirrors metadataBase in app/layout.tsx — swap NEXT_PUBLIC_SITE_URL in once the
// domain is bought; falls back to localhost in dev.
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  // Public routes (account / wishlist stay out — see robots.ts).
  const pages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/catalog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/individual`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/showroom`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contacts`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const products: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${baseUrl}/catalog/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...products];
}
