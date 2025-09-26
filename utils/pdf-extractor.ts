// PDF text extraction utility
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Import PDF.js dynamically to avoid SSR issues
    const pdfjsLib = await import("pdfjs-dist")

    // Set worker source - use a more reliable CDN URL
    if (typeof window !== "undefined") {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`
    }

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

    let fullText = ""

    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map((item: any) => item.str).join(" ")
      fullText += pageText + "\n"
    }

    return fullText.trim()
  } catch (error) {
    console.error("Error extracting PDF text:", error)
    // Return placeholder text if extraction fails
    return `PDF file: ${file.name}\nThis is placeholder text for PDF content. PDF text extraction failed, but the file was uploaded successfully.`
  }
}
