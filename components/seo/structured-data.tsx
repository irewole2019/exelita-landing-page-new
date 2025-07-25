import { seoConfig } from "@/lib/seo-config"

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Exelita",
    description: seoConfig.description,
    url: seoConfig.siteUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "599",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Exelita",
      url: seoConfig.siteUrl,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
