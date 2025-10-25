"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function GuideViewerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/toolkit" className="flex items-center h-full">
              <Image
                src="/images/exelita-logo.png"
                alt="Exelita Logo"
                width={40}
                height={40}
                className="w-10 h-10"
                priority
              />
              <span className="font-bold text-xl text-indigo-950 ml-2">Exelita</span>
            </Link>

            <Link href="/toolkit">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Toolkit
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Canva Embed - Full Screen */}
      <div className="flex-1 w-full">
        <iframe
          src="https://www.canva.com/design/DAG0QPEHK0w/Sv2MPiGgfA-CvqXFXVce3g/view?embed"
          className="w-full h-full min-h-[calc(100vh-4rem)]"
          allowFullScreen
          allow="fullscreen"
          title="EB-1A Comprehensive Step-by-Step User Flow Guide"
        />
      </div>

      {/* CTA Section */}
      <section className="w-full py-12 sm:py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Need Help Getting Started?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              These resources work best alongside the Exelita platform. Ready to build your petition with AI-powered
              guidance?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <a href="https://app.exelita.com/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-8 py-6 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  Start Your Petition
                </Button>
              </a>

              <a href="mailto:irewole@exelita.com" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-purple-700 text-purple-700 hover:bg-purple-50 px-8 py-6 text-base sm:text-lg font-semibold rounded-lg transition-all duration-200 bg-transparent"
                >
                  Contact Support
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <Image src="/images/exelita-logo.png" alt="Exelita Logo" width={32} height={32} className="mr-2" />
              <span className="text-white font-semibold">Exelita</span>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-sm">
                © 2025 Exelita. All rights reserved. | Not a law firm. Not a substitute for legal advice.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
