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
    const { parsedResume, category, answers, resumeAnalysis } = body

    if (!parsedResume || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Enhanced scoring calculation
    const enhancedScore = calculateEnhancedScore(category, answers, resumeAnalysis)

    // Enhanced AI prompt with more specific instructions
    const enhancedPrompt = `You are a senior immigration attorney specializing in EB-1 petitions with 15+ years of experience. You have reviewed over 1,000 successful EB-1 cases and understand USCIS adjudication patterns.

CASE INFORMATION:
Resume/CV: ${parsedResume}
Category: ${category}
Questionnaire Responses: ${JSON.stringify(answers)}
Preliminary Score: ${enhancedScore.score}/100

INSTRUCTIONS:
Provide a comprehensive EB-1 eligibility assessment that would be suitable for a potential petitioner to understand their chances and next steps.

Your analysis should be:
1. Specific to ${category} requirements and recent USCIS trends
2. Evidence-based, citing specific achievements from the resume
3. Realistic about approval chances based on current standards
4. Actionable, suggesting concrete improvements where needed

REQUIRED OUTPUT FORMAT (JSON):
{
  "category": "${category}",
  "categoryRationale": "One sentence explaining why this category fits best",
  "score": 75,
  "scoreJustification": "Detailed explanation of the score based on USCIS standards",
  "totalCriteria": ${enhancedScore.totalCriteria},
  "criteriaMet": ${enhancedScore.criteriaMet},
  "criteriaBreakdown": [
    {
      "name": "Criterion name",
      "status": "Met|Likely Met|Not Met",
      "justification": "Specific evidence from resume and analysis",
      "strengthLevel": "Strong|Moderate|Weak|None",
      "improvementSuggestions": "Specific actionable advice"
    }
  ],
  "summary": "3-4 sentence professional assessment",
  "strengthAreas": ["List of 2-3 strongest areas"],
  "improvementAreas": ["List of 2-3 areas needing work"],
  "recommendedActions": ["List of 3-5 specific next steps"],
  "timelineEstimate": "Realistic timeline for petition readiness",
  "approvalProbability": "High|Medium|Low with explanation"
}

Focus on providing value through specific, actionable insights rather than generic advice.`

    // Call OpenAI with enhanced prompt
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: enhancedPrompt,
      temperature: 0.1, // Lower temperature for more consistent analysis
      maxTokens: 2000,
    })

    // Enhanced JSON parsing with better error handling
    let result
    try {
      result = JSON.parse(text)
    } catch (parseError) {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          result = JSON.parse(jsonMatch[1] || jsonMatch[0])
        } catch (extractError) {
          // Fallback to enhanced score if AI parsing fails
          result = {
            category,
            categoryRationale: `${category} appears most suitable based on the provided information.`,
            score: enhancedScore.score,
            scoreJustification: `Score calculated based on ${enhancedScore.criteriaMet} of ${enhancedScore.totalCriteria} criteria met.`,
            totalCriteria: enhancedScore.totalCriteria,
            criteriaMet: enhancedScore.criteriaMet,
            criteriaBreakdown: enhancedScore.breakdown,
            summary: `Based on the analysis, you ${enhancedScore.meetsMinimum ? "meet" : "do not meet"} the minimum requirements for ${category}.`,
            strengthAreas: ["Resume analysis completed"],
            improvementAreas: ["Detailed evaluation needed"],
            recommendedActions: ["Consider professional consultation"],
            timelineEstimate: "2-6 months",
            approvalProbability: enhancedScore.score > 70 ? "Medium" : "Low",
          }
        }
      } else {
        throw new Error("Could not parse AI response")
      }
    }

    // Validate and enhance the result
    const validatedResult = {
      ...result,
      score: Math.max(0, Math.min(100, result.score || enhancedScore.score)),
      criteriaMet: result.criteriaMet || enhancedScore.criteriaMet,
      totalCriteria: result.totalCriteria || enhancedScore.totalCriteria,
      enhancedAnalysis: true,
      confidence: enhancedScore.score > 70 ? "High" : enhancedScore.score > 50 ? "Medium" : "Low",
    }

    return NextResponse.json(validatedResult)
  } catch (error) {
    console.error("Enhanced eligibility evaluation error:", error)
    return NextResponse.json(
      {
        error: "Evaluation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
