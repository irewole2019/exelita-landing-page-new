"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { FormData } from "../eligibility-quiz"
import { CheckCircle2, XCircle, AlertCircle, FileText } from "lucide-react"

// Update the EligibilityResult type to match the new response format
type EligibilityResult = {
  category: string
  categoryRationale: string
  score: number
  scoreJustification: string
  totalCriteria: number
  criteriaMet: number
  criteriaBreakdown: {
    name: string
    status: "Met" | "Likely Met" | "Not Met"
    justification: string
  }[]
  summary: string
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
  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const evaluateEligibility = async () => {
      try {
        setIsCalculating(true)

        // Create a mock parsed resume from the resume data
        // In a real implementation, you would use a resume parsing service
        const parsedResume = formData.parsedResumeData
          ? `Publications: ${formData.parsedResumeData.publications}
             Awards: ${formData.parsedResumeData.awards}
             Leadership Experience: ${formData.parsedResumeData.leadership ? "Yes" : "No"}
             Patents: ${formData.parsedResumeData.patents}
             Years of Experience: ${formData.parsedResumeData.experience}`
          : "No resume data available"

        // Call the API endpoint
        const response = await fetch("/api/eligibility-evaluation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parsedResume,
            category: formData.category,
            answers: formData.responses,
          }),
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        setResult(data)
      } catch (err) {
        console.error("Error evaluating eligibility:", err)
        setError("Failed to evaluate eligibility. Please try again later.")
      } finally {
        setIsCalculating(false)
      }
    }

    // Add a small delay to simulate processing time
    const timer = setTimeout(() => {
      evaluateEligibility()
    }, 1500)

    return () => clearTimeout(timer)
  }, [formData])

  const getEligibilityStatus = (score: number) => {
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

  // Handle closing the quiz and clearing the session
  const handleClose = () => {
    // Reset the form data
    onReset()
    // Close the quiz
    onClose()
  }

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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Error</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={onReset}>
            Try Again
          </Button>
          <Button onClick={handleClose} className="bg-purple-700 hover:bg-purple-800">
            Close
          </Button>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4">
          <AlertCircle className="h-12 w-12 text-amber-500 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Available</h3>
        <p className="text-gray-600 mb-6">We couldn't generate eligibility results. Please try again.</p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={onReset}>
            Restart Assessment
          </Button>
          <Button onClick={handleClose} className="bg-purple-700 hover:bg-purple-800">
            Close
          </Button>
        </div>
      </div>
    )
  }

  const eligibilityStatus = getEligibilityStatus(result.score)

  const getStatusIcon = () => {
    if (eligibilityStatus.status === "high") {
      return <CheckCircle2 className="h-12 w-12 text-green-500" />
    } else if (eligibilityStatus.status === "medium" || eligibilityStatus.status === "low") {
      return <AlertCircle className="h-12 w-12 text-amber-500" />
    } else {
      return <XCircle className="h-12 w-12 text-red-500" />
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">{getStatusIcon()}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your EB-1 Eligibility Results</h2>
        <p className={`text-xl font-semibold ${eligibilityStatus.color}`}>
          {eligibilityStatus.label}: {result.score}/100
        </p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full ${
            result.score >= 80
              ? "bg-green-500"
              : result.score >= 60
                ? "bg-amber-500"
                : result.score >= 40
                  ? "bg-amber-700"
                  : "bg-red-500"
          }`}
          style={{ width: `${result.score}%` }}
        ></div>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-3">EB-1 Eligibility Evaluation</h3>

        {/* Category Recommendation */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-gray-900 mb-2">Category Recommendation</h4>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Recommended Category:</span> {result.category}
          </p>
          <p className="text-gray-700">{result.categoryRationale}</p>
        </div>

        {/* Eligibility Score */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-gray-900 mb-2">Eligibility Score</h4>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className={`h-4 rounded-full ${
                result.score >= 80
                  ? "bg-green-500"
                  : result.score >= 60
                    ? "bg-amber-500"
                    : result.score >= 40
                      ? "bg-amber-700"
                      : "bg-red-500"
              }`}
              style={{ width: `${result.score}%` }}
            ></div>
          </div>
          <p className="text-gray-700">
            <span className="font-medium">Score:</span> {result.score}/100
          </p>
          <p className="text-gray-700">{result.scoreJustification}</p>
        </div>

        {/* USCIS Criteria Breakdown */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-gray-900 mb-2">USCIS Criteria Breakdown</h4>
          <p className="text-gray-700 mb-3">
            <span className="font-medium">Criteria Met:</span> {result.criteriaMet}/{result.totalCriteria}
          </p>

          <div className="space-y-4">
            {result.criteriaBreakdown.map((criterion, index) => (
              <div
                key={index}
                className="border-l-4 pl-4 py-1"
                style={{
                  borderColor:
                    criterion.status === "Met" ? "#10b981" : criterion.status === "Likely Met" ? "#f59e0b" : "#ef4444",
                }}
              >
                <div className="flex items-center mb-1">
                  <h5 className="font-medium text-gray-900">{criterion.name}</h5>
                  <span
                    className={`ml-2 text-sm px-2 py-0.5 rounded ${
                      criterion.status === "Met"
                        ? "bg-green-100 text-green-800"
                        : criterion.status === "Likely Met"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {criterion.status}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{criterion.justification}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Summary */}
        <div>
          <h4 className="text-md font-semibold text-gray-900 mb-2">Evaluation Summary</h4>
          <div className="bg-indigo-50 p-4 rounded-md">
            <p className="text-indigo-800">{result.summary}</p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended Next Steps</h3>

        <div className="grid grid-cols-1 gap-4">
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-3">
                <FileText className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-medium">Join Our Beta</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                Get early access to our AI-powered EB-1 petition builder and be among the first to try our platform.
              </p>
              <Button className="w-full bg-purple-700 hover:bg-purple-800" asChild>
                <a href="https://forms.office.com/r/KNDUcFg5Vw" target="_blank" rel="noopener noreferrer">
                  Join Our Beta
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
        <Button variant="outline" onClick={onReset}>
          Restart Assessment
        </Button>

        <Button onClick={handleClose} className="bg-purple-700 hover:bg-purple-800">
          Close and Return to Site
        </Button>
      </div>
    </div>
  )
}
