import type React from "react"
import type { Metadata } from "next"
import { generateMetadata } from "@/lib/seo-config"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import StructuredData from "@/components/seo/structured-data"
import "./globals.css"
import { Suspense } from "react"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = generateMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <StructuredData />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/images/exelita-logo.png" />
        <link rel="apple-touch-icon" href="/images/exelita-logo.png" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://exelita.com" />

        {/* Additional SEO meta tags */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
            `,
          }}
        />
      </head>
      <body className={`${inter.className} font-sans`}>
        <Suspense fallback={null}>
          {children}

          {/* Analytics Scripts - Only Google Analytics for now */}
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  )
}
