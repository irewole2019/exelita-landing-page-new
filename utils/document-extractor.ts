"use client"

import { extractTextFromDOCX } from "./docx-extractor"
import { extractTextFromPDF } from "@/app/utils/pdf"

interface ExtractionResult {
  text: string
  isPlaceholder: boolean
  debugInfo?: string
  preview?: string
  wordCount?: number
}

export async function extractTextFromDocument(file: File): Promise<ExtractionResult> {
  try {
    const fileType = file.type
    const fileName = file.name.toLowerCase()

    // Handle text files
    if (fileType === "text/plain" || fileName.endsWith(".txt")) {
      const text = await file.text()
      const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length
      const preview = text.substring(0, 500)

      return {
        text,
        isPlaceholder: false,
        debugInfo: `Successfully extracted ${text.length} characters from text file`,
        preview,
        wordCount,
      }
    } else if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
      const text = await extractTextFromPDF(file)

      if (!text || text.trim().length < 50) {
        throw new Error("PDF text extraction returned insufficient content. The PDF may be image-based or corrupted.")
      }

      const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length
      const preview = text.substring(0, 500)

      return {
        text,
        isPlaceholder: false,
        debugInfo: `Successfully extracted ${text.length} characters from PDF`,
        preview,
        wordCount,
      }
    } else if (
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileName.endsWith(".docx")
    ) {
      try {
        const text = await extractTextFromDOCX(file)
        const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length
        const preview = text.substring(0, 500)

        return {
          text,
          isPlaceholder: false,
          debugInfo: `Successfully extracted ${text.length} characters from DOCX`,
          preview,
          wordCount,
        }
      } catch (error) {
        throw new Error(
          `DOCX extraction failed: ${error instanceof Error ? error.message : "Unknown error"}. Please try converting to PDF.`,
        )
      }
    }

    // Handle DOC files - provide placeholder
    else if (fileType === "application/msword" || fileName.endsWith(".doc")) {
      throw new Error("Legacy .DOC files are not supported. Please save as .DOCX or convert to PDF.")
    }

    // For other file types, return error
    else {
      throw new Error(`Unsupported file type: ${fileType}. Please upload PDF, DOCX, or TXT files.`)
    }
  } catch (error) {
    console.error("Error extracting text from document:", error)
    throw error
  }
}
