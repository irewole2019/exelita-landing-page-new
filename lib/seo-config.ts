import type { Metadata } from "next"

// SEO Configuration
export const siteConfig = {
  name: "Exelita",
  title: "Exelita - AI-Powered EB-1 Visa Petition Builder",
  description:
    "Build a winning EB-1 petition in 2-3 weeks with AI guidance. Complete your extraordinary ability, outstanding researcher, or multinational executive petition without expensive lawyers. Get expert review and USCIS-ready formatting.",
  url: "https://exelita.com",
  ogImage: "https://exelita.com/images/og-image.jpg",
  keywords: [
    "EB-1 visa",
    "EB-1A petition",
    "EB-1B petition",
    "EB-1C petition",
    "extraordinary ability visa",
    "outstanding researcher visa",
    "multinational executive visa",
    "AI petition builder",
    "immigration lawyer alternative",
    "self petition EB-1",
    "USCIS petition help",
    "green card application",
    "immigration AI tool",
    "visa petition software",
  ],
  authors: [
    {
      name: "Exelita Team",
      url: "https://exelita.com",
    },
  ],
  creator: "Exelita",
  publisher: "Exelita",
  category: "Immigration Services",
}

export const generateMetadata = (title?: string, description?: string, path?: string, noIndex?: boolean): Metadata => {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const pageDescription = description || siteConfig.description
  const pageUrl = path ? `${siteConfig.url}${path}` : siteConfig.url

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    category: siteConfig.category,
    robots: noIndex ? "noindex,nofollow" : "index,follow",

    // Open Graph
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [siteConfig.ogImage],
      creator: "@exelita_ai",
      site: "@exelita_ai",
    },

    // Additional meta tags
    other: {
      "application-name": siteConfig.name,
      "apple-mobile-web-app-title": siteConfig.name,
      "format-detection": "telephone=no",
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#7c3aed",
      "theme-color": "#7c3aed",
    },
  }
}

// Structured Data (JSON-LD)
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Exelita",
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/exelita-logo.png`,
  sameAs: ["https://www.linkedin.com/company/exelita", "https://www.instagram.com/exelita_ai/"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "exelitaai@gmail.com",
    contactType: "Customer Service",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
}

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "EB-1 Visa Petition Builder",
  description:
    "AI-powered platform to build EB-1 visa petitions for extraordinary ability, outstanding researchers, and multinational executives.",
  provider: {
    "@type": "Organization",
    name: "Exelita",
    url: siteConfig.url,
  },
  serviceType: "Immigration Services",
  areaServed: "United States",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "EB-1 Petition Plans",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Essential Plan",
          description: "AI petition builder with basic features",
        },
        price: "599",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pro Plan",
          description: "AI petition builder with expert review and recommendation letters",
        },
        price: "999",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pro Max Plan",
          description: "Complete solution with attorney review",
        },
        price: "1499",
        priceCurrency: "USD",
      },
    ],
  },
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this a lawyer replacement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, Exelita is not a substitute for legal advice. We provide tools and guidance to help you prepare your own EB-1 petition. For those who want legal oversight, our Pro Max plan includes attorney review to ensure your petition is legally sound.",
      },
    },
    {
      "@type": "Question",
      name: "How does the recommender portal work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You'll invite your recommenders to our secure portal where they can input their information and qualifications. Our AI helps them structure their input into compelling recommendation letters that highlight your achievements effectively.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the process take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most users complete their petitions in 2-3 weeks using our platform. This is significantly faster than the typical 3-6 months it takes when working with traditional law firms.",
      },
    },
  ],
}
