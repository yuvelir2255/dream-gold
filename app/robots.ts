import type { MetadataRoute } from "next";

// Mirrors metadataBase in app/layout.tsx — swap NEXT_PUBLIC_SITE_URL in once the
// domain is bought; falls back to localhost in dev.
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Account + wishlist are personal-cabinet pages — keep them out of search.
      disallow: ["/account", "/wishlist"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
