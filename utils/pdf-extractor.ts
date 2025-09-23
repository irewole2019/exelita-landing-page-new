// PDF.js is loaded from CDN for simplicity
// In a production app, you would use npm packages
import type { TextItem, TextContent } from "pdfjs-dist/types/src/display/api"

// Define types for PDF.js since we're loading it from CDN
declare global {
  interface Window {
    pdfjsLib: {
      getDocument: (source: { url: string } | { data: Uint8Array }) => Promise<PDFDocumentProxy>
      GlobalWorkerOptions: {
        workerSrc: string
      }
    }
  }
}

interface PDFDocumentProxy {
  numPages: number
  getPage: (pageNumber: number) => Promise<PDFPageProxy>
}

interface PDFPageProxy {
  getTextContent: () => Promise<TextContent>
}

// Load PDF.js script dynamically
const loadPdfJs = async (): Promise<void> => {
  if (window.pdfjsLib) return

  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"
    script.onload = () => {
      // Set worker source correctly
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js"
      resolve()
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    // Load PDF.js if not already loaded
    await loadPdfJs()

    // Read the file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    // Load the PDF document
    const pdfDocument = await window.pdfjsLib.getDocument({ data: uint8Array }).promise

    // Get total number of pages
    const numPages = pdfDocument.numPages
    let fullText = ""

    // Extract text from each page
    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDocument.getPage(i)
      const textContent = await page.getTextContent()

      // Concatenate text items
      const pageText = textContent.items.map((item: TextItem) => item.str).join(" ")

      fullText += pageText + "\n\n"
    }

    return fullText
  } catch (error) {
    console.error("Error extracting text from PDF:", error)
    throw new Error("Failed to extract text from PDF")
  }
}
