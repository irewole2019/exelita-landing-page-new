// Mammoth.js is loaded from CDN for simplicity
// In a production app, you would use npm packages

// Define types for Mammoth.js since we're loading it from CDN
declare global {
  interface Window {
    mammoth: {
      extractRawText: (options: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string; messages: any[] }>
    }
  }
}

// Load Mammoth.js script dynamically
const loadMammoth = async (): Promise<void> => {
  if (window.mammoth) return

  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"
    script.onload = () => {
      resolve()
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export async function extractTextFromDocx(file: File): Promise<string> {
  try {
    // Load Mammoth.js if not already loaded
    await loadMammoth()

    // Read the file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()

    // Extract text from DOCX
    const result = await window.mammoth.extractRawText({ arrayBuffer })

    return result.value || "No text content found in the document."
  } catch (error) {
    console.error("Error extracting text from DOCX:", error)
    throw new Error("Failed to extract text from DOCX")
  }
}
