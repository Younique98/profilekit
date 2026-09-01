import type { MetadataRoute } from "next";

// Named explicitly (rather than relying only on the "*" wildcard below) so
// the policy toward AI crawlers and answer engines is a deliberate,
// visible choice, not an accident of the default.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "Amazonbot",
  "Meta-ExternalAgent",
];

// /edit and /login are the owner's editing/auth surface, not public
// content — keep them out of search/AI-crawler indexes the same way any
// settings/dashboard route would be, while still allowing the public
// profile view at "/".
const DISALLOWED_PATHS = ["/edit", "/login", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: "https://profilekit.app/sitemap.xml",
  };
}
