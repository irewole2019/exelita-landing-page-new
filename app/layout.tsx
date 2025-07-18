import type React from "react"
import type { Metadata } from "next"
import { generateMetadata } from "@/lib/seo-config"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import StructuredData from "@/components/seo/structured-data"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = generateMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/images/exelita-logo.png" />
        <link rel="apple-touch-icon" href="/images/exelita-logo.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://exelita.com" />

        {/* Additional SEO meta tags */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
      </head>
      <body>
        <Suspense fallback={null}>
          {children}

          {/* Analytics Scripts - Only Google Analytics for now */}
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  )
}
