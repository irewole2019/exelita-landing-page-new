import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "nodejs"

// Helper: Extract JSON from a string that may include markdown fences or prose
function extractJsonFromText(text: string): any {
  try {
    return JSON.parse(text)
  } catch {
    // continue
  }
  const codeBlockRegex = /```json\s*([\s\S]*?)```/i
  const m1 = text.match(codeBlockRegex)
  if (m1?.[1]) {
    try {
      return JSON.parse(m1[1].trim())
    } catch {}
  }
  const anyCodeBlockRegex = /```\s*([\s\S]*?)```/i
  const m2 = text.match(anyCodeBlockRegex)
  if (m2?.[1]) {
    try {
      return JSON.parse(m2[1].trim())
    } catch {}
  }
  const jsonRegex = /\{[\s\S]*\}/
  const m3 = text.match(jsonRegex)
  if (m3?.[0]) {
    try {
      return JSON.parse(m3[0])
    } catch {}
  }
  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cvText, questionnaire } = body

    if (!questionnaire || typeof questionnaire !== "object") {
      return NextResponse.json({ error: "Questionnaire responses are required" }, { status: 400 })
    }

    // Prompt now produces a JSON resumeData block first, then the full EB-1A evaluation
    const prompt = `You are an expert U.S. immigration advisor specializing in the EB-1A visa for individuals with extraordinary ability.

First, OUTPUT ONLY a single JSON object (inside a fenced code block \`\`\`json ... \`\`\`) named "resumeData" extracted from the user's CV and questionnaire. If an item is not present, use empty arrays/false/0 accordingly. Do not add commentary in this block.

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

After the JSON block, write a line with three dashes (---), then provide the comprehensive EB-1A evaluation with the following rules:

1. Analyze the user's CV and questionnaire answers carefully.
2. Compare the user's experience to the 10 USCIS EB-1A criteria:
   - (1) Nationally or internationally recognized awards
   - (2) Membership in selective associations
   - (3) Published material about the person in major media
   - (4) Participation as a judge of others' work
   - (5) Original contributions of major significance
   - (6) Authorship of scholarly or professional articles
   - (7) Artistic exhibitions or showcases (if applicable)
   - (8) Leading or critical role in distinguished organizations
   - (9) High salary/remuneration compared to peers
   - (10) Commercial success in the performing arts

3. Score each criterion between 0 and 10 based on the strength and quality of the evidence.
4. Provide a final score out of 100:
   - Up to 70 points from individual criteria (max 10 each for best 7 criteria)
   - Up to 20 points for overall intent, documentation quality, and field continuity
   - Up to 10 points for evidence that the user's work would substantially benefit the U.S.

5. For each criterion: include confidence as High / Medium / Low.
6. Explain clearly:
   - Which criteria appear strong
   - Which need improvement
   - Whether the user is likely eligible

7. Conclude with next-step recommendations:
   - Which 3–5 criteria to prioritize
   - What documents or accomplishments to focus on next

---
User's CV:
${cvText || "No CV provided"}

---
User Questionnaire:
1. What is your profession or field of extraordinary ability?
→ ${questionnaire.profession || "Not provided"}

2. Are you currently in the U.S.?
→ ${questionnaire.currentlyInUS || "Not provided"}

3. What visa are you currently on?
→ ${questionnaire.currentVisa || "Not provided"}

4. Do you intend to continue working in your field in the U.S.?
→ ${questionnaire.continueWorking || "Not provided"}

5. Awards:
→ ${questionnaire.awards || "Not provided"}

6. Memberships:
→ ${questionnaire.memberships || "Not provided"}

7. Media:
→ ${questionnaire.media || "Not provided"}

8. Judging:
→ ${questionnaire.judging || "Not provided"}

9. Contributions:
→ ${questionnaire.contributions || "Not provided"}

10. Publications:
→ ${questionnaire.publications || "Not provided"}

11. Exhibitions:
→ ${questionnaire.exhibitions || "Not provided"}

12. Leading Roles:
→ ${questionnaire.leadingRoles || "Not provided"}

13. Compensation:
→ ${questionnaire.compensation || "Not provided"}

14. Commercial Success:
→ ${questionnaire.commercialSuccess || "Not provided"}

---
Evaluate and respond as described.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.2,
      maxTokens: 2500,
    })

    // Split out the JSON portion and the evaluation
    const [jsonPart, ...rest] = text.split("---")
    const parsed = extractJsonFromText(jsonPart || "")
    const evaluation = rest.join("---").trim() || text

    if (parsed) {
      console.log("enhanced-eb1a-evaluation: Extracted resumeData:", parsed)
    } else {
      console.warn("enhanced-eb1a-evaluation: No valid resumeData JSON extracted")
    }

    return NextResponse.json({
      success: true,
      evaluation,
      resumeData: parsed || null,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in EB-1A evaluation:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process EB-1A evaluation",
      },
      { status: 500 },
    )
  }
}
