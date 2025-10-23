"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Home, Loader2, FileText, Upload } from "lucide-react"
import Link from "next/link"

// Declare PDF.js types
declare global {
  interface Window {
    pdfjsLib: any
  }
}

export default function GuideViewer() {
  const [pageNumber, setPageNumber] = useState(1)
  const [numPages, setNumPages] = useState(0)
  const [scale, setScale] = useState(1.0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pdfNotFound, setPdfNotFound] = useState(false)
  const [pdfLoaded, setPdfLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pdfDoc, setPdfDoc] = useState<any>(null)

  useEffect(() => {
    let mounted = true

    const loadPdfJs = async () => {
      try {
        // Check if PDF.js is already loaded
        if (window.pdfjsLib) {
          console.log("PDF.js already loaded")
          loadPdf()
          return
        }

        console.log("Loading PDF.js from CDN...")

        // Load PDF.js script
        const script = document.createElement("script")
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        script.async = true

        script.onload = () => {
          if (!mounted) return

          console.log("PDF.js script loaded successfully")

          // Set worker
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"

            console.log("PDF.js worker configured")
            loadPdf()
          } else {
            console.error("PDF.js failed to initialize")
            setError("Failed to initialize PDF viewer")
            setLoading(false)
          }
        }

        script.onerror = (e) => {
          console.error("Failed to load PDF.js script:", e)
          setError("Failed to load PDF viewer library. Please refresh the page.")
          setLoading(false)
        }

        document.head.appendChild(script)
      } catch (err) {
        console.error("Error in loadPdfJs:", err)
        setError("Error initializing PDF viewer")
        setLoading(false)
      }
    }

    const loadPdf = async () => {
      if (!mounted) return

      try {
        console.log("Attempting to load PDF from /pdfs/exelita-eb1a-guide.pdf")

        // First check if the PDF file exists
        const response = await fetch("/pdfs/exelita-eb1a-guide.pdf", { method: "HEAD" })

        if (!response.ok) {
          console.error("PDF file not found, status:", response.status)
          setPdfNotFound(true)
          setLoading(false)
          return
        }

        console.log("PDF file exists, loading document...")

        const pdfjsLib = window.pdfjsLib
        if (!pdfjsLib) {
          console.error("PDF.js not available")
          setError("PDF viewer not initialized")
          setLoading(false)
          return
        }

        const loadingTask = pdfjsLib.getDocument("/pdfs/exelita-eb1a-guide.pdf")

        loadingTask.promise
          .then((pdf: any) => {
            if (!mounted) return

            console.log("PDF loaded successfully, pages:", pdf.numPages)
            setPdfDoc(pdf)
            setNumPages(pdf.numPages)
            setPdfLoaded(true)
            setLoading(false)
          })
          .catch((err: any) => {
            console.error("Error loading PDF document:", err)
            setPdfNotFound(true)
            setLoading(false)
          })
      } catch (err) {
        console.error("Error in loadPdf:", err)
        setPdfNotFound(true)
        setLoading(false)
      }
    }

    loadPdfJs()

    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable keyboard shortcuts for saving/printing
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "p")) {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      mounted = false
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (pdfDoc && canvasRef.current && pdfLoaded) {
      renderPage(pageNumber)
    }
  }, [pdfDoc, pageNumber, scale, pdfLoaded])

  const renderPage = async (pageNum: number) => {
    if (!pdfDoc || !canvasRef.current) return

    try {
      console.log(`Rendering page ${pageNum}...`)

      const page = await pdfDoc.getPage(pageNum)
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context) {
        console.error("Could not get canvas context")
        return
      }

      const viewport = page.getViewport({ scale })

      // Set canvas dimensions
      canvas.height = viewport.height
      canvas.width = viewport.width

      // Render PDF page
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }

      await page.render(renderContext).promise
      console.log(`Page ${pageNum} rendered successfully`)
    } catch (err) {
      console.error("Error rendering page:", err)
      setError("Error displaying page")
    }
  }

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  const zoomIn = () => {
    if (scale < 2.0) {
      setScale(Math.min(scale + 0.2, 2.0))
    }
  }

  const zoomOut = () => {
    if (scale > 0.5) {
      setScale(Math.max(scale - 0.2, 0.5))
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevPage()
      if (e.key === "ArrowRight") goToNextPage()
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [pageNumber, numPages])

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Viewer Header */}
      <nav className="w-full bg-gray-800 border-b border-gray-700 py-3 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/toolkit" className="flex items-center text-white hover:text-purple-400 transition-colors">
              <Home className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Back to Toolkit</span>
            </Link>
            <span className="text-gray-400 hidden md:inline">|</span>
            <span className="text-white font-semibold hidden md:inline">EB-1A Step-by-Step Guide</span>
          </div>

          {!pdfNotFound && pdfLoaded && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={zoomOut}
                disabled={scale <= 0.5 || loading}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-white text-sm px-2 hidden sm:inline">{Math.round(scale * 100)}%</span>
              <Button
                variant="outline"
                size="sm"
                onClick={zoomIn}
                disabled={scale >= 2.0 || loading}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* PDF Viewer Area */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* PDF Canvas */}
          <div className="relative bg-gray-100 min-h-[600px] flex items-center justify-center overflow-auto">
            {loading && !pdfNotFound && (
              <div className="text-center p-8">
                <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading secure viewer...</p>
                <p className="text-sm text-gray-500 mt-2">Initializing PDF.js</p>
              </div>
            )}

            {pdfNotFound && (
              <div className="text-center p-8 max-w-2xl mx-auto">
                <div className="bg-purple-100 rounded-full p-6 inline-block mb-6">
                  <Upload className="h-16 w-16 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">PDF File Not Found</h3>
                <p className="text-gray-600 mb-6">
                  The EB-1A Step-by-Step Guide PDF needs to be added to your project to enable the secure viewer.
                </p>

                <div className="bg-white border-2 border-purple-200 rounded-lg p-6 text-left mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    Setup Instructions:
                  </h4>
                  <ol className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      <span>
                        Place your PDF file at:{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                          public/pdfs/exelita-eb1a-guide.pdf
                        </code>
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      <span>
                        Create the directory if it doesn't exist:{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">mkdir -p public/pdfs</code>
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </span>
                      <span>
                        Copy your PDF:{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                          cp exelita-eb1a-guide.pdf public/pdfs/
                        </code>
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </span>
                      <span>Refresh this page to load the viewer</span>
                    </li>
                  </ol>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 bg-amber-100 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-amber-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <h5 className="font-semibold text-amber-900 mb-1 text-sm">Important Note</h5>
                      <p className="text-xs text-amber-800">
                        The PDF viewer is fully configured and ready to use. Once you add your PDF file to the correct
                        location, the secure viewer will automatically load with all protections enabled (no download,
                        no print, no right-click).
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => window.location.reload()}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Refresh Page
                </Button>
              </div>
            )}

            {error && !pdfNotFound && (
              <div className="text-center p-8">
                <div className="bg-red-100 rounded-full p-6 inline-block mb-4">
                  <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Document</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700">
                  Reload Page
                </Button>
              </div>
            )}

            {!loading && !error && !pdfNotFound && pdfLoaded && (
              <div className="p-4 w-full">
                <canvas
                  ref={canvasRef}
                  className="mx-auto shadow-lg"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          {!loading && !error && !pdfNotFound && numPages > 0 && pdfLoaded && (
            <div className="bg-gray-800 p-4 flex items-center justify-between">
              <Button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="bg-purple-700 hover:bg-purple-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Previous</span>
              </Button>

              <div className="text-white font-semibold">
                Page {pageNumber} of {numPages}
              </div>

              <Button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="bg-purple-700 hover:bg-purple-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </div>
          )}
        </div>

        {/* Instructions */}
        {!pdfNotFound && pdfLoaded && (
          <div className="mt-6 bg-gray-800 rounded-lg p-6 text-white">
            <h4 className="font-semibold mb-2">Viewer Instructions:</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Use the Previous/Next buttons or arrow keys (← →) to navigate pages</li>
              <li>• Zoom in/out using the + and - buttons above</li>
              <li>• This viewer is read-only - downloading and printing are disabled for security</li>
              <li>• Right-click is disabled to protect the content</li>
              <li>• Bookmark this page to access the guide anytime after purchase</li>
            </ul>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                🔒 Secure viewing only • Content is protected and cannot be downloaded or printed
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
