import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "nodejs"

// Helper: Extract JSON from a string that may include markdown fences or prose
function extractJsonFromText(text: string): any {
  // 1) Try direct JSON
  try {
    return JSON.parse(text)
  } catch {
    // continue
  }

  // 2) Try fenced code block \`\`\`json ... \`\`\`
  const codeBlockRegex = /\`\`\`json\s*([\s\S]*?)\`\`\`/i
  const m1 = text.match(codeBlockRegex)
  if (m1?.[1]) {
    try {
      return JSON.parse(m1[1].trim())
    } catch {
      // continue
    }
  }

  // 3) Try any fenced code block \`\`\`
  const anyCodeBlockRegex = /\`\`\`\s*([\s\S]*?)\`\`\`/i
  const m2 = text.match(anyCodeBlockRegex)
  if (m2?.[1]) {
    try {
      return JSON.parse(m2[1].trim())
    } catch {
      // continue
    }
  }

  // 4) Fallback: first {...} block
  const jsonRegex = /\{[\s\S]*\}/
  const m3 = text.match(jsonRegex)
  if (m3?.[0]) {
    try {
      return JSON.parse(m3[0])
    } catch {
      // continue
    }
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, resumeText } = body

    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    // Prompt now requests a first JSON block with extracted resume data
    const prompt = `
You are an expert immigration attorney specializing in EB-1 visa petitions.

First, OUTPUT ONLY a single JSON object (inside a fenced code block \`\`\`json ... \`\`\`) named "resumeData" extracted from the provided inputs, using this schema. If an item is not present, use empty arrays/false/0 accordingly. Do not add commentary in this block.

{
  "publications": { "count": number, "items": string[] },
  "awards": { "count": number, "items": string[] },
  "leadershipExperience": { "hasLeadership": boolean, "items": string[] },
  "patents": { "count": number, "items": string[] },
  "yearsOfExperience": { "years": number, "range": string },
  "notableEmployers": string[],
  "education": string[],
  "skills": string[],
  "links": string[]
}

After the JSON block, write a line with three dashes (---), then provide a comprehensive narrative assessment that includes:

Questionnaire Responses:
${Object.entries(answers)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}

${resumeText ? `Resume Content:\n${resumeText}` : ""}

Narrative requirements:

1. Eligibility Assessment: Strong/Moderate/Weak/Insufficient with percentage score
2. Recommended EB-1 Category: EB-1A, EB-1B, or EB-1C with detailed reasoning
3. Strengths Analysis: Top 5 strongest qualifications with specific examples
4. Improvement Areas: 5 key areas needing development with actionable steps
5. Evidence Strategy: Specific documents and proof needed
6. Timeline: Realistic timeline for petition preparation and filing
7. Success Probability: Estimated approval chances with current profile
8. Next Steps: Immediate action items prioritized by impact

Be specific, actionable, and encouraging while maintaining professional accuracy.
`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 2000,
      temperature: 0.2,
    })

    // Split out the JSON portion and the assessment
    const [jsonPart, ...rest] = text.split("---")
    const parsed = extractJsonFromText(jsonPart || "")
    const assessment = rest.join("---").trim() || text

    if (parsed) {
      console.log("enhanced-eligibility-evaluation: Extracted resumeData:", parsed)
    } else {
      console.warn("enhanced-eligibility-evaluation: No valid resumeData JSON extracted")
    }

    return NextResponse.json({
      assessment,
      resumeData: parsed || null,
    })
  } catch (error) {
    console.error("Error in enhanced eligibility evaluation:", error)
    return NextResponse.json({ error: "Failed to process enhanced eligibility evaluation" }, { status: 500 })
  }
}
