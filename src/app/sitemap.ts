import type { MetadataRoute } from "next";

const BASE_URL = "https://profilekit.app";

// Only the public profile view belongs in the sitemap. /edit is the
// profile-editing form (noindex'd in its own metadata) and isn't a page
// worth surfacing to search engines or AI crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
