import type React from "react"
import type { Metadata } from "next"
import { generateMetadata } from "@/lib/seo-config"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import StructuredData from "@/components/seo/structured-data"
import "./globals.css"
import { Suspense } from "react"
import { Inter } from "next/font/google"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  ...generateMetadata(),
  icons: {
    icon: "/images/exelita-logo.png",
    apple: "/images/exelita-logo.png",
  },
  manifest: "/manifest.json",
  other: {
    ...generateMetadata().other,
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} font-sans`}>
        {/* Preconnect links */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://exelita.com" />

        <Suspense fallback={null}>
          {children}

          {/* Analytics Scripts */}
          <GoogleAnalytics />

          {/* Structured Data */}
          <StructuredData />
        </Suspense>

        {/* Service Worker Registration */}
        <Script id="service-worker-registration" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
