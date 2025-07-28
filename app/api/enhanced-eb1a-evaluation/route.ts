import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cvText, questionnaire } = body

    if (!questionnaire || typeof questionnaire !== "object") {
      return NextResponse.json({ error: "Questionnaire responses are required" }, { status: 400 })
    }

    // Construct the comprehensive prompt
    const prompt = `You are an expert U.S. immigration advisor specializing in the EB-1A visa for individuals with extraordinary ability. Your role is to evaluate whether a user is likely eligible for the EB-1A visa, based on their CV and responses to a structured questionnaire. Your output should follow these rules:

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
4. Provide a final score out of 100, calculated by summing:
   - Up to 70 points from individual criteria (max 10 each for best 7 criteria)
   - Up to 20 points for overall intent, documentation quality, and field continuity
   - Up to 10 points for evidence that the user's work would substantially benefit the U.S.

5. Categorize confidence per criterion: High / Medium / Low
6. Explain in plain language:
   - Which criteria appear strong
   - Which need improvement
   - Whether the user is likely eligible

7. Conclude with next-step recommendations:
   - Which 3–5 criteria to prioritize
   - What types of documents or accomplishments to focus on next

Use clear, structured, professional formatting.

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

5. Awards: Have you won any nationally or internationally recognized prizes for excellence?
→ ${questionnaire.awards || "Not provided"}

6. Memberships: Are you a member of associations that require outstanding achievement?
→ ${questionnaire.memberships || "Not provided"}

7. Media: Have you been featured in media or trade publications?
→ ${questionnaire.media || "Not provided"}

8. Judging: Have you judged the work of others (e.g., peer review, competitions)?
→ ${questionnaire.judging || "Not provided"}

9. Contributions: Have you made original contributions of major significance in your field?
→ ${questionnaire.contributions || "Not provided"}

10. Publications: Have you authored scholarly or professional articles?
→ ${questionnaire.publications || "Not provided"}

11. Exhibitions: Have your works been displayed at artistic exhibitions or showcases?
→ ${questionnaire.exhibitions || "Not provided"}

12. Leading Roles: Have you served in a leading or critical role at a distinguished organization?
→ ${questionnaire.leadingRoles || "Not provided"}

13. Compensation: Have you earned a high salary or remuneration compared to peers?
→ ${questionnaire.compensation || "Not provided"}

14. Commercial Success: Have you had commercial success in performing arts (e.g., ticket sales, royalties)?
→ ${questionnaire.commercialSuccess || "Not provided"}

---
Evaluate and respond as described.`

    console.log("Calling OpenAI API for EB-1A evaluation...")

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.2,
      maxTokens: 2500,
    })

    console.log("EB-1A evaluation completed successfully")

    return NextResponse.json({
      success: true,
      evaluation: text,
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
