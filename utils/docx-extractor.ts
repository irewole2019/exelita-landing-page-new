// DOCX text extraction utility
export async function extractTextFromDOCX(file: File): Promise<string> {
  try {
    // Import mammoth dynamically
    const mammoth = await import("mammoth")

    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })

    return result.value.trim()
  } catch (error) {
    console.error("Error extracting DOCX text:", error)
    throw new Error("Failed to extract text from DOCX")
  }
}
