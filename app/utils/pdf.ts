"use client"

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/extract-pdf", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }

    return data.text
  } catch (error) {
    console.error("[v0] Error extracting PDF text:", error)
    return `PDF Document: ${file.name}\n\nNote: PDF text extraction is temporarily unavailable. Please convert your resume to TXT or DOCX format, or manually enter your information in the questionnaire.`
  }
}
