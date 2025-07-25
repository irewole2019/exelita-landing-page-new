// PDF text extraction utility
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Import PDF.js dynamically to avoid SSR issues
    const pdfjsLib = await import("pdfjs-dist")

    // Set worker source
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

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
    throw new Error("Failed to extract text from PDF")
  }
}
