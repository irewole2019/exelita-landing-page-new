import { seoConfig, organizationSchema, serviceSchema, faqSchema, productSchema, howToSchema } from "@/lib/seo-config"
import Script from "next/script"

export default function StructuredData() {
  // Combine all schemas into a graph
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization
      organizationSchema,

      // Main Software Application
      {
        "@type": "SoftwareApplication",
        name: "Exelita EB-1 Petition Builder",
        description: seoConfig.description,
        url: seoConfig.url,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: productSchema.offers,
        aggregateRating: productSchema.aggregateRating,
        creator: organizationSchema,
      },

      // Service
      serviceSchema,

      // FAQ
      faqSchema,

      // Product with updated pricing
      productSchema,

      // HowTo Guide
      howToSchema,

      // WebSite schema for sitelinks search
      {
        "@type": "WebSite",
        name: seoConfig.name,
        url: seoConfig.url,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${seoConfig.url}/?s={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },

      // Breadcrumb for navigation
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: seoConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Features",
            item: `${seoConfig.url}/#features`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Pricing",
            item: `${seoConfig.url}/#pricing`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Additional AI-specific meta tags in head */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    </>
  )
}
