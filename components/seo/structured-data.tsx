import { seoConfig } from "@/lib/seo-config"
import Script from "next/script"

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

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
