"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Eye, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function ToolkitPage() {
  const [isPurchased, setIsPurchased] = useState(false)

  // In production, check if user has purchased via URL parameter or session
  // For now, we'll show as if purchased
  const handleDownload = () => {
    // Trigger download of the worksheet PDF
    const link = document.createElement("a")
    link.href = "/pdfs/exelita-eb1a-worksheet.pdf"
    link.download = "Exelita-EB1A-Worksheet.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="w-full py-4 bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/exelita-logo.png" alt="Exelita Logo" width={40} height={40} className="mr-2" />
            <span className="font-bold text-xl text-indigo-950">Exelita</span>
          </Link>
          <Link href="/" className="text-gray-700 hover:text-purple-700 transition-colors font-medium">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Exelita <span className="text-purple-700">Success Toolkit</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive resources for building a winning EB-1A petition. Get expert guidance and proven templates
            to streamline your application process.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Comprehensive Guide (View-Only) */}
          <Card className="border-2 border-purple-200 hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-br from-purple-50 to-white">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-purple-700" />
                </div>
                <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  View-Only
                </span>
              </div>
              <CardTitle className="text-xl sm:text-2xl mb-2">
                Comprehensive EB-1A Petition Step-by-Step Guide
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Complete walkthrough of every stage in the EB-1A petition process
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-6">
                {[
                  "9 detailed stages from eligibility to filing",
                  "Expert strategies and insider tips",
                  "Real-world examples and case studies",
                  "USCIS criteria breakdown and analysis",
                  "Risk mitigation and RFE prevention",
                  "Secure embedded viewer (no download)",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-xs sm:text-sm text-purple-900">
                  <strong>Note:</strong> This guide opens in a secure embedded viewer. You can read and navigate through
                  all pages, but downloading and printing are disabled to protect the content.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/toolkit/guide-viewer" className="w-full">
                <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-6 text-base sm:text-lg font-semibold">
                  <Eye className="mr-2 h-5 w-5" />
                  Open Secure Viewer
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Worksheet (Downloadable) */}
          <Card className="border-2 border-amber-200 hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-br from-amber-50 to-white">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-amber-700" />
                </div>
                <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Downloadable
                </span>
              </div>
              <CardTitle className="text-xl sm:text-2xl mb-2">Exelita EB-1A Worksheet</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Interactive templates and fill-in forms for your petition
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-6">
                {[
                  "Self-assessment checklists and scoring",
                  "Evidence gathering templates",
                  "Criteria-by-criterion organizers",
                  "Timeline and milestone planner",
                  "Risk log and mitigation tracker",
                  "Exhibit index and labeling system",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-xs sm:text-sm text-amber-900">
                  <strong>Delivered immediately:</strong> Click below to download your worksheet as a secure PDF. Fill
                  it out digitally or print for manual completion.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleDownload}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black py-6 text-base sm:text-lg font-semibold"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Worksheet
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Support Section */}
        <div className="mt-12 sm:mt-16 text-center max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Need Help Getting Started?</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              These resources work best alongside the Exelita platform. Ready to build your petition with AI-powered
              guidance?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.exelita.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
              >
                Start here
              </a>
              <Link href="/">
                <Button className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3">
                  Return to homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
