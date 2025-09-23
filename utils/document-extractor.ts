import { extractTextFromPdf } from "./pdf-extractor"
import { extractTextFromDocx } from "./docx-extractor"

export async function extractTextFromDocument(file: File): Promise<{
  text: string
  isPlaceholder: boolean
  debugInfo?: string
}> {
  try {
    const fileType = file.type
    const fileName = file.name.toLowerCase()

    // Handle text files
    if (fileType === "text/plain") {
      const text = await readTextFile(file)
      return {
        text,
        isPlaceholder: false,
        debugInfo: `Successfully extracted ${text.length} characters from text file`,
      }
    }

    // Handle PDF files
    else if (fileType === "application/pdf") {
      const text = await extractTextFromPdf(file)
      return {
        text,
        isPlaceholder: false,
        debugInfo: `Successfully extracted ${text.length} characters from PDF`,
      }
    }

    // Handle DOCX files
    else if (
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileName.endsWith(".docx")
    ) {
      const text = await extractTextFromDocx(file)
      return {
        text,
        isPlaceholder: false,
        debugInfo: `Successfully extracted ${text.length} characters from DOCX`,
      }
    }

    // Handle DOC files - attempt to extract but may not work well in browser
    else if (fileType === "application/msword" || fileName.endsWith(".doc")) {
      // For DOC files, we'll provide a more informative placeholder
      // as browser-based extraction is limited
      return {
        text: createPlaceholderText(
          file.name,
          "DOC files cannot be fully processed in the browser. For best results, please convert to DOCX or PDF.",
        ),
        isPlaceholder: true,
        debugInfo:
          "DOC files cannot be fully processed in the browser. For best results, please convert to DOCX or PDF.",
      }
    }

    // For other file types, return placeholder text
    else {
      return {
        text: createPlaceholderText(file.name),
        isPlaceholder: true,
        debugInfo: `Unsupported file type: ${fileType}. Generated placeholder text.`,
      }
    }
  } catch (error) {
    console.error("Error extracting text from document:", error)
    return {
      text: createPlaceholderText(file.name, error instanceof Error ? error.message : "Unknown error"),
      isPlaceholder: true,
      debugInfo: `Error extracting text: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Helper function to read text files
async function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string)
      } else {
        reject(new Error("Failed to read text file"))
      }
    }
    reader.onerror = () => reject(new Error("Failed to read text file"))
    reader.readAsText(file)
  })
}

// Helper function to create placeholder text
function createPlaceholderText(fileName: string, errorMessage?: string): string {
  // Extract potential name from filename (e.g., "John_Smith.pdf" -> "John Smith")
  const name = fileName.split(".")[0].replace(/_/g, " ").replace(/-/g, " ")

  // Make a more random placeholder that will generate different results
  const randomPublications = Math.floor(Math.random() * 5) + 1 // 1-5 publications
  const randomPatents = Math.floor(Math.random() * 3) // 0-2 patents
  const randomAwards = Math.floor(Math.random() * 4) // 0-3 awards
  const randomYearsStart = 2010 + Math.floor(Math.random() * 5) // 2010-2014
  const randomYearsEnd = 2020 + Math.floor(Math.random() * 4) // 2020-2023
  const randomYears = randomYearsEnd - randomYearsStart

  const hasLeadership = Math.random() > 0.5 // 50% chance of leadership
  const leadershipText = hasLeadership
    ? `- Leadership experience managing a team of ${Math.floor(Math.random() * 10) + 2} people`
    : ""

  return `PLACEHOLDER TEXT FOR: ${fileName}
  
NOTE: We attempted to extract text from your file but were unable to fully process it.
${errorMessage ? `Error: ${errorMessage}\n` : ""}
Please review and edit this placeholder text to match your actual resume content.

Resume for: ${name}
  
It includes:
- ${randomPublications} publication${randomPublications !== 1 ? "s" : ""} in academic journals
${randomPatents > 0 ? `- ${randomPatents} patent application${randomPatents !== 1 ? "s" : ""}` : ""}
${leadershipText}
- ${randomYears} years of professional experience from ${randomYearsStart}-${randomYearsEnd}
${randomAwards > 0 ? `- ${randomAwards} industry award${randomAwards !== 1 ? "s" : ""}` : ""}

The candidate has experience in software development and has worked at various technology companies.`
}
