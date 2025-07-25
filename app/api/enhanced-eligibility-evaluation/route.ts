import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "nodejs"

// Enhanced EB-1 criteria definitions with weights and validation rules
const EB1_CRITERIA = {
  "EB-1A": {
    totalCriteria: 10,
    minimumRequired: 3,
    criteria: [
      {
        id: "nationally_recognized_award",
        name: "Nationally or internationally recognized prizes or awards",
        weight: 0.15,
        keywords: ["nobel", "pulitzer", "academy award", "olympic", "national award", "international prize"],
        validationRules: ["Must be documented", "Must be in petitioner's field"],
      },
      {
        id: "membership",
        name: "Membership in associations requiring outstanding achievements",
        weight: 0.12,
        keywords: ["fellow", "member", "association", "society", "academy"],
        validationRules: ["Must require outstanding achievements", "Must be judged by experts"],
      },
      {
        id: "published_material",
        name: "Published material about petitioner in professional/major media",
        weight: 0.11,
        keywords: ["featured", "article about", "profile", "interview", "news coverage"],
        validationRules: ["Must be about petitioner", "Must be in professional publications"],
      },
      {
        id: "judge_work",
        name: "Participation as judge of others' work",
        weight: 0.1,
        keywords: ["reviewer", "judge", "panel", "committee", "editorial board"],
        validationRules: ["Must be individual or panel judging", "Must be in same field"],
      },
      {
        id: "original_contributions",
        name: "Original contributions of major significance",
        weight: 0.14,
        keywords: ["breakthrough", "innovation", "discovery", "invention", "pioneering"],
        validationRules: ["Must be original", "Must be of major significance"],
      },
      {
        id: "authorship",
        name: "Authorship of scholarly articles",
        weight: 0.13,
        keywords: ["published", "author", "journal", "article", "paper"],
        validationRules: ["Must be in professional journals", "Must be scholarly"],
      },
      {
        id: "exhibitions",
        name: "Display of work at artistic exhibitions",
        weight: 0.08,
        keywords: ["exhibition", "gallery", "museum", "showcase", "display"],
        validationRules: ["Must be artistic work", "Must be at recognized venues"],
      },
      {
        id: "leading_role",
        name: "Leading/critical role in distinguished organizations",
        weight: 0.12,
        keywords: ["director", "lead", "chief", "head", "principal"],
        validationRules: ["Must be leading role", "Organization must have distinguished reputation"],
      },
      {
        id: "high_salary",
        name: "High salary or remuneration",
        weight: 0.09,
        keywords: ["salary", "compensation", "remuneration", "income"],
        validationRules: ["Must be high relative to field", "Must be documented"],
      },
      {
        id: "commercial_success",
        name: "Commercial success in performing arts",
        weight: 0.06,
        keywords: ["box office", "sales", "commercial success", "revenue"],
        validationRules: ["Must be in performing arts", "Must show commercial success"],
      },
    ],
  },
  // Similar detailed definitions for EB-1B and EB-1C would go here
}

// Enhanced scoring algorithm
function calculateEnhancedScore(category: string, responses: any, resumeData: any) {
  const criteria = EB1_CRITERIA[category as keyof typeof EB1_CRITERIA]
  if (!criteria) return { score: 0, breakdown: [] }

  let totalScore = 0
  let criteriaMet = 0
  const breakdown = []

  for (const criterion of criteria.criteria) {
    const response = responses[criterion.id]
    let criterionScore = 0
    let status = "Not Met"
    let confidence = 0

    // Analyze response
    if (response === "yes") {
      criterionScore = criterion.weight * 100
      status = "Met"
      confidence = 0.8
    } else if (response === "no") {
      criterionScore = 0
      status = "Not Met"
      confidence = 0.9
    } else {
      // Analyze based on resume data and keywords
      const resumeText = JSON.stringify(resumeData).toLowerCase()
      const keywordMatches = criterion.keywords.filter((keyword) => resumeText.includes(keyword.toLowerCase())).length

      if (keywordMatches >= 2) {
        criterionScore = criterion.weight * 60
        status = "Likely Met"
        confidence = 0.6
      } else if (keywordMatches >= 1) {
        criterionScore = criterion.weight * 30
        status = "Possibly Met"
        confidence = 0.4
      }
    }

    if (criterionScore > 50) criteriaMet++
    totalScore += criterionScore

    breakdown.push({
      name: criterion.name,
      status,
      score: criterionScore,
      confidence,
      justification: `Based on ${response ? "direct response" : "resume analysis"} and keyword analysis.`,
    })
  }

  return {
    score: Math.min(100, totalScore),
    criteriaMet,
    totalCriteria: criteria.totalCriteria,
    breakdown,
    meetsMinimum: criteriaMet >= criteria.minimumRequired,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, resumeText } = body

    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    const prompt = `
You are an expert immigration attorney specializing in EB-1 visa petitions. Provide a comprehensive assessment based on the following information:

Questionnaire Responses:
${Object.entries(answers)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}

${resumeText ? `Resume Content:\n${resumeText}` : ""}

Provide a detailed analysis including:

1. **Eligibility Assessment**: Strong/Moderate/Weak/Insufficient with percentage score
2. **Recommended EB-1 Category**: EB-1A, EB-1B, or EB-1C with detailed reasoning
3. **Strengths Analysis**: Top 5 strongest qualifications with specific examples
4. **Improvement Areas**: 5 key areas needing development with actionable steps
5. **Evidence Strategy**: Specific documents and proof needed
6. **Timeline**: Realistic timeline for petition preparation and filing
7. **Success Probability**: Estimated approval chances with current profile
8. **Next Steps**: Immediate action items prioritized by impact

Be specific, actionable, and encouraging while maintaining professional accuracy.
`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 2000,
    })

    return NextResponse.json({ assessment: text })
  } catch (error) {
    console.error("Error in enhanced eligibility evaluation:", error)
    return NextResponse.json({ error: "Failed to process enhanced eligibility evaluation" }, { status: 500 })
  }
}
