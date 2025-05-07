import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json()
    const { parsedResume, category, answers } = body

    if (!parsedResume) {
      return NextResponse.json({ error: "Missing required field: parsedResume" }, { status: 400 })
    }

    // Format the answers as a list for better prompt readability
    const formattedAnswers = Object.entries(answers || {})
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")

    // Construct the prompt with the new instruction
    const prompt = `You are acting as an expert in U.S. employment-based immigration (specifically EB-1A, EB-1B, and EB-1C). Given the candidate's resume/CV or background text, generate a clear, organized EB-1 eligibility assessment suitable for showcasing an automated analysis platform.

Resume:
${parsedResume}

Selected or inferred category:
${category || "null"}

Questionnaire Answers:
${formattedAnswers}

Follow this structure in your response:

1. Category Recommendation

Recommend the single best-fit EB-1 category (EB-1A, EB-1B, or EB-1C).
Include a one-sentence rationale referencing how the candidate's achievements align with this category, using resume examples.

2. Eligibility Score

Assign a score from 0–100 reflecting the overall likelihood of approval, citing key evidence or overall impression in one sentence.

3. USCIS Criteria Breakdown

State the total number of USCIS criteria for the chosen category and the number credibly met.
For each criterion, provide:
Criterion name
Status ("Met", "Likely Met", "Not Met")
1–2 sentences justifying your evaluation, with explicit, concrete evidence from the résumé/CV.

4. Summary

In 3–5 sentences, write a plain-English analysis that highlights:
The candidate's most persuasive eligibility factors,
Any critical gaps,
And overall competitiveness for the selected category.
Ensure the summary references specific, notable accomplishments or roles (e.g., product launches at Microsoft, entrepreneurship, awards) pulled directly from the resume for a personalized, value-rich result.

Instructions:
Format the output with clear section headers and concise, reader-friendly bullet points or short paragraphs for maximum professional readability. Do not include next steps or recommendations; focus solely on eligibility analysis and resume-specific detail to illustrate the platform's analytic power.

Respond in valid JSON format with the following structure:
{
  "category": "EB-1A", // The recommended category
  "categoryRationale": "One-sentence rationale for category selection",
  "score": 75, // Eligibility score (0-100)
  "scoreJustification": "One-sentence justification for the score",
  "totalCriteria": 10, // Total number of criteria for the category
  "criteriaMet": 6, // Number of criteria met
  "criteriaBreakdown": [
    {
      "name": "Criterion name",
      "status": "Met", // "Met", "Likely Met", or "Not Met"
      "justification": "1-2 sentences justifying the evaluation"
    },
    // Additional criteria...
  ],
  "summary": "3-5 sentence evaluation summary"
}
`

    // Call OpenAI API using AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.2, // Lower temperature for more consistent, factual responses
      maxTokens: 1000,
    })

    // Parse the response as JSON
    // The AI might return JSON wrapped in markdown code blocks, so we need to handle that
    try {
      // First, try to parse the raw response
      try {
        const jsonResponse = JSON.parse(text)
        return NextResponse.json(jsonResponse)
      } catch (initialParseError) {
        // If direct parsing fails, try to extract JSON from markdown code blocks
        console.log("Initial parse failed, trying to extract JSON from markdown")

        // Check for JSON code blocks (\`\`\`json ... \`\`\`)
        const jsonCodeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
        if (jsonCodeBlockMatch && jsonCodeBlockMatch[1]) {
          try {
            const extractedJson = JSON.parse(jsonCodeBlockMatch[1].trim())
            return NextResponse.json(extractedJson)
          } catch (codeBlockError) {
            console.error("Failed to parse JSON from code block:", codeBlockError)
          }
        }

        // Try to find any JSON-like structure with curly braces
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          try {
            const extractedJson = JSON.parse(jsonMatch[0])
            return NextResponse.json(extractedJson)
          } catch (extractError) {
            console.error("Failed to extract JSON from response:", extractError)
          }
        }

        // If all parsing attempts fail, return the error
        return NextResponse.json(
          {
            error: "Failed to parse AI response",
            rawResponse: text,
          },
          { status: 500 },
        )
      }
    } catch (error) {
      console.error("Error in JSON parsing logic:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing eligibility evaluation:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
