"use client"

import mammoth from "mammoth"

export async function extractTextFromDOCX(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })

    if (result.value && result.value.trim().length > 0) {
      return result.value.trim()
    }

    // If extraction returned empty, throw error
    throw new Error("DOCX file appears to be empty or unreadable")
  } catch (error) {
    console.error("Error extracting DOCX text:", error)
    throw new Error(`Failed to extract text from DOCX: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
