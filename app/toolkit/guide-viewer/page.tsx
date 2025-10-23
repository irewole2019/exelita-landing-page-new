"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function GuideViewer() {
  const [pageNumber, setPageNumber] = useState(1)
  const [numPages, setNumPages] = useState(0)
  const [scale, setScale] = useState(1.0)

  // In production, you would use PDF.js here
  // This is a placeholder implementation
  useEffect(() => {
    // Load PDF.js and render the PDF
    // For now, showing placeholder
    setNumPages(50) // Placeholder page count
  }, [])

  const goToPrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1)
  }

  const goToNextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1)
  }

  const zoomIn = () => {
    if (scale < 2.0) setScale(scale + 0.1)
  }

  const zoomOut = () => {
    if (scale > 0.5) setScale(scale - 0.1)
  }

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Viewer Header */}
      <nav className="w-full bg-gray-800 border-b border-gray-700 py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/toolkit" className="flex items-center text-white hover:text-purple-400 transition-colors">
              <Home className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Back to Toolkit</span>
            </Link>
            <span className="text-gray-400 hidden md:inline">|</span>
            <span className="text-white font-semibold hidden md:inline">EB-1A Step-by-Step Guide</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-white text-sm px-2">{Math.round(scale * 100)}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={zoomIn}
              disabled={scale >= 2.0}
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* PDF Viewer Area */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Placeholder for PDF.js canvas */}
          <div className="relative bg-gray-100 min-h-[600px] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="bg-purple-100 rounded-full p-6 inline-block mb-4">
                <Image src="/images/exelita-logo.png" alt="Exelita Logo" width={80} height={80} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">PDF Viewer</h3>
              <p className="text-gray-600 mb-4">In production, this would display the secure PDF using PDF.js</p>
              <p className="text-sm text-gray-500">
                Current Page: {pageNumber} / {numPages}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="bg-gray-800 p-4 flex items-center justify-between">
            <Button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="bg-purple-700 hover:bg-purple-800 text-white"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous
            </Button>

            <div className="text-white font-semibold">
              Page {pageNumber} of {numPages}
            </div>

            <Button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="bg-purple-700 hover:bg-purple-800 text-white"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-gray-800 rounded-lg p-6 text-white">
          <h4 className="font-semibold mb-2">Viewer Instructions:</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• Use the Previous/Next buttons or arrow keys to navigate pages</li>
            <li>• Zoom in/out using the buttons above or scroll while holding Ctrl/Cmd</li>
            <li>• This viewer is read-only - downloading and printing are disabled</li>
            <li>• Bookmark this page to access the guide anytime after purchase</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
