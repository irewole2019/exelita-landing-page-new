import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "nodejs"

// Helper function to ensure the response has the expected structure
function ensureValidResponse(data: any) {
  // Create a base structure with default values
  const validResponse = {
    publications: {
      count: 0,
      items: [],
    },
    awards: {
      count: 0,
      items: [],
    },
    leadershipExperience: {
      hasLeadership: false,
      items: [],
    },
    patents: {
      count: 0,
      items: [],
    },
    yearsOfExperience: {
      years: 0,
      range: "N/A",
    },
    eb1Category: {
      recommendation: "EB-1A",
      rationale: "Based on the limited information available, Extraordinary Ability (EB-1A) may be worth exploring.",
    },
  }

  // If data is not an object, return the default structure
  if (!data || typeof data !== "object") {
    console.error("Invalid data format received:", data)
    return validResponse
  }

  // Merge the received data with the default structure
  return {
    publications: {
      count: data.publications?.count || 0,
      items: Array.isArray(data.publications?.items) ? data.publications.items : [],
    },
    awards: {
      count: data.awards?.count || 0,
      items: Array.isArray(data.awards?.items) ? data.awards.items : [],
    },
    leadershipExperience: {
      hasLeadership: Boolean(data.leadershipExperience?.hasLeadership),
      items: Array.isArray(data.leadershipExperience?.items) ? data.leadershipExperience.items : [],
    },
    patents: {
      count: data.patents?.count || 0,
      items: Array.isArray(data.patents?.items) ? data.patents.items : [],
    },
    yearsOfExperience: {
      years: data.yearsOfExperience?.years || 0,
      range: data.yearsOfExperience?.range || "N/A",
    },
    eb1Category: {
      recommendation: data.eb1Category?.recommendation || "EB-1A",
      rationale:
        data.eb1Category?.rationale ||
        "Based on the limited information available, Extraordinary Ability (EB-1A) may be worth exploring.",
    },
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
  // Match ```json ... ``` or just ``` ... ``` patterns
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

    if (!resumeText) {
      return NextResponse.json({ error: "Missing required field: resumeText" }, { status: 400 })
    }

    console.log("Resume text received, length:", resumeText.length)
    console.log("Sample:", resumeText.substring(0, 200))

    // Truncate resume if it's too long (OpenAI has token limits)
    const truncatedResume = resumeText.length > 15000 ? resumeText.substring(0, 15000) + "..." : resumeText

    // Construct the prompt
    const prompt = `You are an expert resume analyst. Given the text of a resume or CV, scan and extract the following five data points. Your output should be well-structured, concise, and comprehensive, using only information found in the provided text.

Publications:
Count the number of journal articles, conference papers, books, whitepapers, or notable published works or presentations, including title and publication/presentation venue when possible.

Awards:
Extract all professional, academic, or industry awards, scholarships, grants, or special honors. Include name of the award, issuing organization, and date/period if available.

Leadership Experience:
List roles (job titles, or volunteer/organizational positions) which demonstrate leadership or supervisory responsibility. For each, include position title, organization, dates, and a brief description emphasizing leadership scope (teams, budgets, projects, etc.).

Patents:
List any patents described. For each, include patent name/number (if stated), a brief description, and role (e.g., inventor, co-inventor).

Years of Experience:
Calculate the total number of distinct years of professional (post-education) experience documented in the resume. Summarize the range (e.g., "2012–2024, 12 years").

Format your answer under each heading. If a section is empty or the information is not found, simply state: "Not found in resume." Ensure all findings are precise and cite only details present in the provided text.

Resume:
${truncatedResume}

IMPORTANT: You MUST respond with ONLY a valid JSON object in the following format. Do not include any explanatory text, markdown formatting, or code blocks outside the JSON:

{
  "publications": {
    "count": 5,
    "items": ["Publication 1", "Publication 2", "Publication 3"]
  },
  "awards": {
    "count": 3,
    "items": ["Award 1", "Award 2", "Award 3"]
  },
  "leadershipExperience": {
    "hasLeadership": true,
    "items": ["Leadership role 1", "Leadership role 2"]
  },
  "patents": {
    "count": 2,
    "items": ["Patent 1", "Patent 2"]
  },
  "yearsOfExperience": {
    "years": 10,
    "range": "2014-2024"
  },
  "eb1Category": {
    "recommendation": "EB-1A",
    "rationale": "Based on the analysis of the resume, EB-1A (Extraordinary Ability) appears to be the most appropriate category due to the significant number of publications, patents, and awards which demonstrate sustained national or international acclaim in the field."
  }
}

If no information is found for a category, use empty arrays and zeros as appropriate. For example, if no publications are found, use "count": 0 and "items": [].

DO NOT wrap your response in markdown code blocks or any other formatting. Just provide the raw JSON object.
`

    try {
      console.log("Calling OpenAI API...")

      // Call OpenAI API using AI SDK
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
        temperature: 0.2, // Lower temperature for more consistent, factual responses
        maxTokens: 2000,
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
    return NextResponse.json(ensureValidResponse({}), { status: 200 })
  }
}
