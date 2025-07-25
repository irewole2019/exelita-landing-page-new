import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "nodejs"

// Helper function to ensure the response has the expected structure
function ensureValidResponse(data: any) {
  // Create a base structure with default values
  const validResponse = {
    score: 0,
    category: "N/A",
    strengths: [],
    improvements: [],
    recommendations: [],
    evidenceGaps: [],
    timelineAssessment: "N/A",
    rawAnalysis: "N/A",
  }

  // If data is not an object, return the default structure
  if (!data || typeof data !== "object") {
    console.error("Invalid data format received:", data)
    return validResponse
  }

  // Merge the received data with the default structure
  return {
    score: data.score || 0,
    category: data.category || "N/A",
    strengths: Array.isArray(data.strengths) ? data.strengths : [],
    improvements: Array.isArray(data.improvements) ? data.improvements : [],
    recommendations: Array.isArray(data.recommendations) ? data.recommendations : [],
    evidenceGaps: Array.isArray(data.evidenceGaps) ? data.evidenceGaps : [],
    timelineAssessment: data.timelineAssessment || "N/A",
    rawAnalysis: data.rawAnalysis || "N/A",
  }
}

// Helper function to extract JSON from text that might be wrapped in markdown code blocks
function extractJsonFromText(text: string): any {
  console.log("Attempting to extract JSON from text:", text.substring(0, 100) + "...")

  // First, try to parse the text directly as JSON
  try {
    return JSON.parse(text)
  } catch (error) {
    console.log("Direct JSON parsing failed, trying to extract from markdown")
  }

  // Try to extract JSON from markdown code blocks
  // Match \`\`\`json ... \`\`\` or just \`\`\` ... \`\`\` patterns
  const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)```/
  const match = text.match(codeBlockRegex)

  if (match && match[1]) {
    const extractedContent = match[1].trim()
    console.log("Extracted content from code block:", extractedContent.substring(0, 100) + "...")

    try {
      return JSON.parse(extractedContent)
    } catch (error) {
      console.error("Failed to parse extracted content as JSON:", error)
    }
  }

  // If we couldn't extract from code blocks, try to find anything that looks like JSON
  // This is a more aggressive approach that looks for content between curly braces
  const jsonRegex = /\{[\s\S]*\}/
  const jsonMatch = text.match(jsonRegex)

  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0])
    } catch (error) {
      console.error("Failed to parse content between curly braces as JSON:", error)
    }
  }

  // If all extraction attempts fail, return null
  console.error("All JSON extraction attempts failed")
  return null
}

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json()
    const { resumeText } = body

    if (!resumeText || typeof resumeText !== "string") {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    console.log("Resume text received, length:", resumeText.length)
    console.log("Sample:", resumeText.substring(0, 200))

    // Truncate resume if it's too long (OpenAI has token limits)
    const truncatedResume = resumeText.length > 15000 ? resumeText.substring(0, 15000) + "..." : resumeText

    // Construct the prompt
    const prompt = `
You are an expert immigration attorney specializing in EB-1 visa petitions. Analyze the following resume and provide a detailed assessment for EB-1 eligibility.

Resume Content:
${truncatedResume}

Please provide a comprehensive analysis including:

1. **Overall EB-1 Eligibility Score** (0-100): Rate the overall strength
2. **Best EB-1 Category**: Recommend EB-1A, EB-1B, or EB-1C with reasoning
3. **Key Strengths**: Identify 3-5 strongest qualifications
4. **Areas for Improvement**: Identify 3-5 areas that need strengthening
5. **Specific Recommendations**: Actionable steps to improve the petition
6. **Evidence Gaps**: What documentation or achievements are missing
7. **Timeline Assessment**: Estimated time to strengthen the profile

Format your response as a structured JSON object with these sections. Be specific and actionable in your recommendations.
`

    try {
      console.log("Calling OpenAI API...")

      // Call OpenAI API using AI SDK
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
        temperature: 0.2, // Lower temperature for more consistent, factual responses
        maxTokens: 1500,
      })

      console.log("OpenAI API response received")
      console.log("Response length:", text.length)
      console.log("Response sample (first 200 chars):", text.substring(0, 200))

      // Extract and parse JSON from the response
      const extractedJson = extractJsonFromText(text)

      if (extractedJson) {
        console.log("Successfully extracted JSON from response")
        return NextResponse.json(ensureValidResponse(extractedJson))
      } else {
        console.error("Failed to extract valid JSON from response")
        // Return a default response
        return NextResponse.json(ensureValidResponse({}), { status: 200 })
      }
    } catch (openaiError) {
      console.error("Error calling OpenAI API:", openaiError)

      // Create a fallback response
      return NextResponse.json(ensureValidResponse({}), { status: 200 })
    }
  } catch (error) {
    console.error("Error processing resume analysis:", error)
    return NextResponse.json({ error: "Failed to analyze resume with AI" }, { status: 500 })
  }
}
