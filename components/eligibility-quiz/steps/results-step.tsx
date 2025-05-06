"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { FormData } from "../eligibility-quiz"
import { CheckCircle2, XCircle, AlertCircle, ClipboardCheck, FileText, Users } from "lucide-react"

// Calculate score based on category and responses
const calculateScore = (formData: FormData): number => {
  if (!formData.category || !formData.responses) return 0

  let score = 0
  const maxScore = 100

  if (formData.category === "EB-1A") {
    // EB-1A criteria
    const criteriaCount = Object.values(formData.responses).filter((value) => value === "yes").length

    // Resume data boosts
    if (formData.parsedResumeData) {
      if (formData.parsedResumeData.publications > 5) score += 5
      if (formData.parsedResumeData.awards > 2) score += 10
      if (formData.parsedResumeData.patents > 0) score += 8
      if (formData.parsedResumeData.leadership) score += 5
    }

    // Base score on meeting criteria
    if (criteriaCount >= 3) {
      score += 50 + (criteriaCount - 3) * 10
    } else {
      score += criteriaCount * 15
    }

    // Evidence links boost
    if (formData.responses.evidence_links && formData.responses.evidence_links.length > 0) {
      score += 5
    }
  } else if (formData.category === "EB-1B") {
    // EB-1B criteria
    const hasExperience = formData.responses.experience === "yes"
    const hasJobOffer = formData.responses.job_offer === "yes"
    const hasPublications = formData.responses.publications === "yes"
    const hasOriginalResearch = formData.responses.original_research === "yes"

    // Must have basics
    if (hasExperience && hasJobOffer) {
      score += 50

      // Additional criteria
      if (hasPublications) score += 15
      if (hasOriginalResearch) score += 15
      if (formData.responses.judged_work === "yes") score += 10
      if (formData.responses.recognition === "yes") score += 10
      if (formData.responses.authorship === "yes") score += 10
    }

    // Resume data boosts
    if (formData.parsedResumeData) {
      if (formData.parsedResumeData.publications > 3) score += 10
      if (formData.parsedResumeData.experience > 5) score += 5
    }
  } else if (formData.category === "EB-1C") {
    // EB-1C criteria
    const hasEmployment = formData.responses.employed_abroad === "yes"
    const hasManagerialRole = formData.responses.managerial_capacity === "yes"
    const hasConnection = formData.responses.us_entity === "yes"
    const hasOperatingUS = formData.responses.operating_years === "yes"

    // Must have basics
    if (hasEmployment && hasManagerialRole && hasConnection && hasOperatingUS) {
      score += 70

      // Additional criteria
      if (formData.responses.authority === "yes") score += 15

      const directReports = Number.parseInt(formData.responses.direct_reports || "0")
      if (directReports > 5) score += 15
      else if (directReports > 0) score += 5
    }

    // Resume data boosts
    if (formData.parsedResumeData && formData.parsedResumeData.leadership) {
      score += 10
    }
  }

  // Cap at max score
  return Math.min(Math.max(score, 0), maxScore)
}

// Get eligibility status based on score
const getEligibilityStatus = (
  score: number,
): {
  status: "high" | "medium" | "low" | "unlikely"
  label: string
  color: string
} => {
  if (score >= 80) {
    return {
      status: "high",
      label: "Highly Likely Eligible",
      color: "text-green-600",
    }
  } else if (score >= 60) {
    return {
      status: "medium",
      label: "Possibly Eligible",
      color: "text-amber-600",
    }
  } else if (score >= 40) {
    return {
      status: "low",
      label: "Eligibility Uncertain",
      color: "text-amber-700",
    }
  } else {
    return {
      status: "unlikely",
      label: "Currently Unlikely Eligible",
      color: "text-red-600",
    }
  }
}

// Generate feedback based on category and responses
const generateFeedback = (formData: FormData, score: number): string => {
  if (!formData.category) return ""

  const status = getEligibilityStatus(score)
  let feedback = ""

  if (formData.category === "EB-1A") {
    const yesResponses = Object.entries(formData.responses).filter(
      ([key, value]) => value === "yes" && key !== "evidence_links",
    ).length

    feedback = `You meet ${yesResponses} out of 10 EB-1A criteria. `

    // Strengths
    const strengths = []
    if (formData.responses.nationally_recognized_award === "yes") strengths.push("awards")
    if (formData.responses.authorship === "yes" || formData.responses.published_material === "yes")
      strengths.push("publications")
    if (formData.responses.leading_role === "yes") strengths.push("leadership")
    if (formData.responses.original_contributions === "yes") strengths.push("original contributions")

    if (strengths.length > 0) {
      feedback += `Your strongest areas appear to be ${strengths.join(", ")}. `
    }

    // Weaknesses
    const weaknesses = []
    if (formData.responses.nationally_recognized_award === "no") weaknesses.push("national/international awards")
    if (formData.responses.judge_work === "no") weaknesses.push("judging others' work")
    if (formData.responses.high_salary === "no") weaknesses.push("high salary/remuneration")

    if (weaknesses.length > 0) {
      feedback += `You may need to strengthen your case regarding ${weaknesses.join(", ")}. `
    }
  } else if (formData.category === "EB-1B") {
    const hasExperience = formData.responses.experience === "yes"
    const hasJobOffer = formData.responses.job_offer === "yes"

    if (!hasExperience && !hasJobOffer) {
      feedback = "You appear to be missing the core requirements for EB-1B (3 years experience and a job offer). "
    } else if (!hasExperience) {
      feedback = "You need at least 3 years of experience in teaching or research to qualify for EB-1B. "
    } else if (!hasJobOffer) {
      feedback = "A job offer from a U.S. university, institution, or private company is required for EB-1B. "
    } else {
      feedback = "You meet the basic requirements for EB-1B. "

      // Strengths
      const strengths = []
      if (formData.responses.publications === "yes") strengths.push("publications")
      if (formData.responses.original_research === "yes") strengths.push("original research")
      if (formData.responses.recognition === "yes") strengths.push("international recognition")

      if (strengths.length > 0) {
        feedback += `Your strongest areas appear to be ${strengths.join(", ")}. `
      }
    }
  } else if (formData.category === "EB-1C") {
    const hasEmployment = formData.responses.employed_abroad === "yes"
    const hasManagerialRole = formData.responses.managerial_capacity === "yes"
    const hasConnection = formData.responses.us_entity === "yes"

    if (!hasEmployment || !hasManagerialRole || !hasConnection) {
      feedback = "You appear to be missing some core requirements for EB-1C. "

      if (!hasEmployment) {
        feedback += "You need at least 1 year of employment outside the US in the last 3 years. "
      }
      if (!hasManagerialRole) {
        feedback += "Your role must be managerial or executive in nature. "
      }
      if (!hasConnection) {
        feedback += "The US entity must be related to your foreign employer. "
      }
    } else {
      feedback = "You meet the basic requirements for EB-1C. "

      const directReports = Number.parseInt(formData.responses.direct_reports || "0")
      if (directReports > 5) {
        feedback += `Having ${directReports} direct reports strengthens your case. `
      }

      if (formData.responses.authority === "yes") {
        feedback += "Your decision-making authority is a positive factor. "
      }
    }
  }

  // General recommendation based on score
  if (status.status === "high") {
    feedback +=
      "Based on your responses, you appear to be a strong candidate for an EB-1 visa. We recommend proceeding with your petition."
  } else if (status.status === "medium") {
    feedback +=
      "You may qualify for an EB-1 visa, but we recommend strengthening your documentation and evidence before proceeding."
  } else if (status.status === "low") {
    feedback +=
      "Your eligibility is uncertain based on the information provided. We recommend consulting with an immigration expert before proceeding."
  } else {
    feedback +=
      "Based on your responses, you may not currently qualify for an EB-1 visa. Consider exploring other visa categories or strengthening your qualifications."
  }

  return feedback
}

export default function ResultsStep({
  formData,
  onReset,
  onClose,
}: {
  formData: FormData
  onReset: () => void
  onClose: () => void
}) {
  const [score, setScore] = useState(0)
  const [isCalculating, setIsCalculating] = useState(true)

  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => {
      const calculatedScore = calculateScore(formData)
      setScore(calculatedScore)
      setIsCalculating(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [formData])

  const eligibilityStatus = getEligibilityStatus(score)
  const feedback = generateFeedback(formData, score)

  if (isCalculating) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 relative">
          <svg
            className="animate-spin h-12 w-12 text-purple-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Your Responses</h3>
        <p className="text-gray-600">Our AI is evaluating your EB-1 eligibility...</p>
      </div>
    )
  }

  const getStatusIcon = () => {
    if (eligibilityStatus.status === "high") {
      return <CheckCircle2 className="h-12 w-12 text-green-500" />
    } else if (eligibilityStatus.status === "medium" || eligibilityStatus.status === "low") {
      return <AlertCircle className="h-12 w-12 text-amber-500" />
    } else {
      return <XCircle className="h-12 w-12 text-red-500" />
    }
  }

  const getMatchedCriteria = () => {
    if (!formData.category) return []

    const matched = []

    if (formData.category === "EB-1A") {
      if (formData.responses.nationally_recognized_award === "yes")
        matched.push("Nationally/internationally recognized award")
      if (formData.responses.membership === "yes") matched.push("Membership in exclusive associations")
      if (formData.responses.published_material === "yes") matched.push("Published material about you")
      if (formData.responses.judge_work === "yes") matched.push("Judged the work of others")
      if (formData.responses.original_contributions === "yes")
        matched.push("Original contributions of major significance")
      if (formData.responses.authorship === "yes") matched.push("Authored scholarly articles")
      if (formData.responses.exhibitions === "yes") matched.push("Work displayed at exhibitions")
      if (formData.responses.leading_role === "yes") matched.push("Leading role in distinguished organizations")
      if (formData.responses.high_salary === "yes") matched.push("High salary compared to others in field")
      if (formData.responses.commercial_success === "yes") matched.push("Commercial success in performing arts")
    } else if (formData.category === "EB-1B") {
      if (formData.responses.experience === "yes") matched.push("3+ years of experience in teaching/research")
      if (formData.responses.job_offer === "yes") matched.push("Job offer from U.S. institution")
      if (formData.responses.recognition === "yes") matched.push("Recognition as outstanding in field")
      if (formData.responses.publications === "yes") matched.push("Published scholarly articles")
      if (formData.responses.judged_work === "yes") matched.push("Judged the work of others")
      if (formData.responses.original_research === "yes") matched.push("Original research contributions")
    } else if (formData.category === "EB-1C") {
      if (formData.responses.employed_abroad === "yes") matched.push("1+ year employment outside US")
      if (formData.responses.managerial_capacity === "yes") matched.push("Employed in managerial/executive capacity")
      if (formData.responses.us_entity === "yes") matched.push("US entity related to foreign employer")
      if (formData.responses.operating_years === "yes") matched.push("US entity doing business for 1+ year")
      if (formData.responses.authority === "yes") matched.push("Authority to make significant decisions")
    }

    return matched
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">{getStatusIcon()}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your EB-1 Eligibility Results</h2>
        <p className={`text-xl font-semibold ${eligibilityStatus.color}`}>
          {eligibilityStatus.label}: {score}/100
        </p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full ${
            score >= 80 ? "bg-green-500" : score >= 60 ? "bg-amber-500" : score >= 40 ? "bg-amber-700" : "bg-red-500"
          }`}
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-3">AI-Generated Feedback</h3>
        <p className="text-gray-700 mb-4">{feedback}</p>

        <div className="bg-indigo-50 p-4 rounded-md">
          <h4 className="font-medium text-indigo-900 mb-2 flex items-center">
            <ClipboardCheck className="h-5 w-5 mr-2 text-indigo-700" />
            Matched EB-1 Criteria
          </h4>
          <ul className="space-y-1 pl-8 list-disc">
            {getMatchedCriteria().map((criterion, index) => (
              <li key={index} className="text-indigo-800">
                {criterion}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended Next Steps</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-3">
                <FileText className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-medium">Start Your Petition</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                Begin drafting your EB-1 petition with AI-powered guidance and templates.
              </p>
              <Button className="w-full bg-purple-700 hover:bg-purple-800" onClick={onClose}>
                Start for $299
              </Button>
            </div>
          </Card>

          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-3">
                <Users className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-medium">Expert Review</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                Schedule a consultation with an immigration specialist to review your case.
              </p>
              <Button variant="outline" className="w-full border-purple-700 text-purple-700 hover:bg-purple-50">
                Schedule Call
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
        <Button variant="outline" onClick={onReset}>
          Restart Assessment
        </Button>

        <Button onClick={onClose} className="bg-purple-700 hover:bg-purple-800">
          Close and Return to Site
        </Button>
      </div>
    </div>
  )
}
