import type { Metadata } from "next"

// SEO Configuration
export const siteConfig = {
  name: "Exelita",
  title: "Exelita - AI-Powered EB-1 Visa Petition Builder",
  description:
    "AI-powered EB-1 visa petition builder for extraordinary professionals, outstanding researchers, and multinational executives. Complete your EB-1A, EB-1B, or EB-1C petition in 2-3 weeks.",
  url: "https://exelita.com",
  ogImage: "/images/og-image.png",
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
  links: {
    twitter: "https://twitter.com/exelita_ai",
    github: "https://github.com/exelita",
    instagram: "https://www.instagram.com/exelita_ai/",
    linkedin: "https://www.linkedin.com/company/exelita",
  },
}

// Export as seoConfig for backward compatibility
export const seoConfig = siteConfig

export type SiteConfig = typeof siteConfig

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
      creator: siteConfig.links.twitter,
      site: siteConfig.links.twitter,
    },

    // Additional meta tags
    other: {
      "application-name": siteConfig.name,
      "apple-mobile-web-app-title": siteConfig.name,
      "format-detection": "telephone=no",
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#7c3aed",
      "theme-color": "#7c3aed",
      // AI Crawler tags for better discovery
      "ai:title": pageTitle,
      "ai:description": pageDescription,
      "ai:category": "Immigration Services, Legal Technology, AI Software",
      "ai:keywords": siteConfig.keywords.join(", "),
      // ChatGPT and other AI assistants
      "chatgpt:summary": pageDescription,
      "chatgpt:category": "Legal Services",
      // Bing/Copilot optimization
      bingbot: "index, follow, max-snippet:-1, max-image-preview:large",
      // Article schema hints
      "article:publisher": siteConfig.url,
      "article:author": "Exelita Team",
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
  sameAs: [siteConfig.links.linkedin, siteConfig.links.instagram],
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
    {
      "@type": "Question",
      name: "What is Exelita and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Exelita is an AI-powered platform that helps professionals prepare EB-1 visa petitions. It guides you through USCIS requirements, structures your petition, helps draft recommendation letters, and provides expert review - all at a fraction of traditional attorney costs ($1,500-$2,500 vs $7,000-$15,000).",
      },
    },
    {
      "@type": "Question",
      name: "What EB-1 categories does Exelita support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Exelita currently supports EB-1A (Extraordinary Ability) petitions. The platform tailors guidance to your specific field and achievements, helping you meet USCIS criteria for extraordinary ability in sciences, arts, education, business, or athletics.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Exelita cost compared to immigration lawyers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Exelita offers three plans: Essential ($1,500), Pro ($2,000), and Premium ($2,500). Traditional immigration attorneys typically charge $7,000-$15,000 for EB-1 petition preparation. You save thousands while maintaining quality through AI guidance and expert review.",
      },
    },
    {
      "@type": "Question",
      name: "Can I complete an EB-1 petition without a lawyer using Exelita?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Exelita provides comprehensive AI-powered guidance to self-prepare your EB-1 petition. The platform includes USCIS-compliant templates, expert reviews, and recommendation letter assistance. For additional legal oversight, the Premium plan includes licensed attorney review.",
      },
    },
  ],
}

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Exelita EB-1 Petition Builder",
  description:
    "AI-powered platform to build EB-1A visa petitions with expert guidance, recommendation letter system, and attorney review options.",
  brand: {
    "@type": "Brand",
    name: "Exelita",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Essential Plan",
      price: "1500",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://buy.stripe.com/fZu9AMg7w6f0eiq2GI6g802",
      description: "AI petition builder with 2 recommendation letters and professional templates",
    },
    {
      "@type": "Offer",
      name: "Pro Plan",
      price: "2000",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://buy.stripe.com/9B69AMcVkgTEfmuchi6g803",
      description: "Essential plan plus 1 expert review and 5 recommendation letters",
    },
    {
      "@type": "Offer",
      name: "Premium Plan",
      price: "2500",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://buy.stripe.com/dRm6oA7B0bzkgqygxy6g804",
      description: "Complete solution with 2 expert reviews, 10 recommendation letters, and attorney review",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
  },
}

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Complete an EB-1A Visa Petition",
  description: "Step-by-step guide to completing your EB-1A extraordinary ability visa petition using Exelita",
  totalTime: "P14D",
  step: [
    {
      "@type": "HowToStep",
      name: "Take Eligibility Assessment",
      text: "Complete the free EB-1 eligibility quiz to evaluate your qualifications against USCIS criteria",
      url: "https://exelita.com#quiz",
    },
    {
      "@type": "HowToStep",
      name: "Choose Your Plan",
      text: "Select Essential ($1,500), Pro ($2,000), or Premium ($2,500) based on your support needs",
      url: "https://exelita.com#pricing",
    },
    {
      "@type": "HowToStep",
      name: "Build Your Petition",
      text: "Use AI-powered guidance to structure your I-140 petition with personalized prompts",
    },
    {
      "@type": "HowToStep",
      name: "Gather Recommendation Letters",
      text: "Invite recommenders to secure portal where AI helps craft compelling support letters",
    },
    {
      "@type": "HowToStep",
      name: "Expert Review",
      text: "Get professional feedback from successful EB-1 petitioners and optional attorney review",
    },
    {
      "@type": "HowToStep",
      name: "File with USCIS",
      text: "Export your professionally formatted petition and submit to USCIS",
    },
  ],
}
