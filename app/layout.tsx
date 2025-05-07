import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Exelita - AI-Powered EB-1 Visa Petitions",
  description:
    "Build a winning EB-1 petition with AI. Complete your petition in 2-3 weeks using AI-powered guidance, expert feedback, and attorney-grade formatting.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
