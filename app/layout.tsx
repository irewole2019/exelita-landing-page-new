import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import VercelAnalytics from "@/components/analytics/vercel-analytics"
import StructuredData from "@/components/seo/structured-data"
import PageViewTracker from "@/components/analytics/page-view-tracker"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Exelita - AI-Powered EB-1 Visa Petition Builder | Build Winning EB-1A, EB-1B, EB-1C Petitions",
  description:
    "Build your EB-1 visa petition in 2-3 weeks with AI guidance. Save $10,000+ in legal fees. Expert review, attorney-grade formatting, and USCIS-compliant templates for EB-1A, EB-1B, and EB-1C petitions.",
  keywords:
    "EB-1 visa, EB-1A petition, EB-1B petition, EB-1C petition, immigration lawyer alternative, AI visa petition, extraordinary ability, outstanding researcher, multinational executive",
  authors: [{ name: "Exelita Team" }],
  creator: "Exelita",
  publisher: "Exelita",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://exelita.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Exelita - AI-Powered EB-1 Visa Petition Builder",
    description: "Build your EB-1 visa petition in 2-3 weeks with AI guidance. Save $10,000+ in legal fees.",
    url: "https://exelita.com",
    siteName: "Exelita",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Exelita - AI-Powered EB-1 Visa Petition Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exelita - AI-Powered EB-1 Visa Petition Builder",
    description: "Build your EB-1 visa petition in 2-3 weeks with AI guidance. Save $10,000+ in legal fees.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <StructuredData />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
          <VercelAnalytics />
          <PageViewTracker />
          {children}
        </Suspense>
      </body>
    </html>
  )
}
