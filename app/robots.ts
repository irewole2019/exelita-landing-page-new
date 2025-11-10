import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/upload-worksheet/"],
      },
      {
        userAgent: "GPTBot", // OpenAI ChatGPT
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User", // ChatGPT browsing
        allow: "/",
      },
      {
        userAgent: "Google-Extended", // Google Bard/Gemini
        allow: "/",
      },
      {
        userAgent: "anthropic-ai", // Claude
        allow: "/",
      },
      {
        userAgent: "ClaudeBot", // Claude web crawler
        allow: "/",
      },
      {
        userAgent: "PerplexityBot", // Perplexity AI
        allow: "/",
      },
    ],
    sitemap: "https://exelita.com/sitemap.xml",
  }
}
