import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers } = body

    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    const prompt = `
You are an expert immigration attorney specializing in EB-1 visa petitions. Based on the following information about a potential applicant, provide a detailed assessment of their eligibility for EB-1A, EB-1B, or EB-1C categories.

Applicant Information:
- Category Interest: ${answers.category || "Not specified"}
- Field of Expertise: ${answers.field || "Not specified"}
- Achievements: ${answers.achievements || "Not specified"}
- Recognition Level: ${answers.recognition || "Not specified"}
- Publications/Patents: ${answers.publications || "Not specified"}

Please provide:
1. Overall eligibility assessment (Strong, Moderate, Weak, or Insufficient)
2. Best-fit EB-1 category recommendation
3. Strengths in their profile
4. Areas that need improvement
5. Specific next steps and recommendations
6. Timeline estimate for petition preparation

Format your response as a structured assessment that is professional yet encouraging.
`

    const { text } = await generateText({
      model: "openai/gpt-5.1",
      prompt,
      maxTokens: 1000,
    })

    return NextResponse.json({ assessment: text })
  } catch (error) {
    console.error("Error in eligibility evaluation:", error)
    return NextResponse.json({ error: "Failed to process eligibility evaluation" }, { status: 500 })
  }
}
