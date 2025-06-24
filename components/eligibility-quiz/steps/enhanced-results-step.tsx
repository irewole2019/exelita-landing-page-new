"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { FormData } from "../eligibility-quiz"
import { CheckCircle2, XCircle, AlertCircle, FileText, TrendingUp, Clock, Target, Lightbulb } from "lucide-react"

// Enhanced result type with more detailed analysis
type EnhancedEligibilityResult = {
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
    strengthLevel?: "Strong" | "Moderate" | "Weak" | "None"
    improvementSuggestions?: string
  }[]
  summary: string
  strengthAreas?: string[]
  improvementAreas?: string[]
  recommendedActions?: string[]
  timelineEstimate?: string
  approvalProbability?: string
  confidence?: string
  enhancedAnalysis?: boolean
}

export default function EnhancedResultsStep({
  formData,
  onReset,
  onClose,
}: {
  formData: FormData
  onReset: () => void
  onClose: () => void
}) {
  const [result, setResult] = useState<EnhancedEligibilityResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  useEffect(() => {
    const evaluateEligibility = async () => {
      try {
        setIsCalculating(true)
        setAnalysisProgress(10)

        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setAnalysisProgress((prev) => Math.min(prev + 10, 80))
        }, 500)

        const parsedResume = formData.parsedResumeData
          ? `Publications: ${formData.parsedResumeData.publications}
             Awards: ${formData.parsedResumeData.awards}
             Leadership Experience: ${formData.parsedResumeData.leadership ? "Yes" : "No"}
             Patents: ${formData.parsedResumeData.patents}
             Years of Experience: ${formData.parsedResumeData.experience}`
          : "No resume data available"

        // Call enhanced evaluation endpoint
        const response = await fetch("/api/enhanced-eligibility-evaluation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parsedResume,
            category: formData.category,
            answers: formData.responses,
            resumeAnalysis: formData.parsedResumeData,
          }),
        })

        clearInterval(progressInterval)
        setAnalysisProgress(100)

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

    const timer = setTimeout(() => {
      evaluateEligibility()
    }, 1000)

    return () => clearTimeout(timer)
  }, [formData])

  const getEligibilityStatus = (score: number, probability?: string) => {
    if (probability === "High" || score >= 80) {
      return {
        status: "high",
        label: "Strong Eligibility",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      }
    } else if (probability === "Medium" || score >= 60) {
      return {
        status: "medium",
        label: "Moderate Eligibility",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
      }
    } else {
      return {
        status: "low",
        label: "Needs Strengthening",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      }
    }
  }

  const handleClose = () => {
    onReset()
    onClose()
  }

  if (isCalculating) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-6 relative">
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
        <h3 className="text-xl font-bold text-gray-900 mb-2">Enhanced AI Analysis in Progress</h3>
        <p className="text-gray-600 mb-4">Our advanced system is evaluating your EB-1 eligibility...</p>

        <div className="w-full max-w-md">
          <Progress value={analysisProgress} className="h-2 mb-2" />
          <p className="text-sm text-gray-500">{analysisProgress}% Complete</p>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          {analysisProgress < 30 && "Analyzing resume content..."}
          {analysisProgress >= 30 && analysisProgress < 60 && "Evaluating USCIS criteria..."}
          {analysisProgress >= 60 && analysisProgress < 90 && "Calculating eligibility score..."}
          {analysisProgress >= 90 && "Finalizing assessment..."}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Analysis Error</h3>
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
        <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
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

  const eligibilityStatus = getEligibilityStatus(result.score, result.approvalProbability)

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Confidence Indicator */}
      <div className="text-center">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${eligibilityStatus.bgColor} ${eligibilityStatus.borderColor} border-2 mb-4`}
        >
          {eligibilityStatus.status === "high" && <CheckCircle2 className="h-8 w-8 text-green-500" />}
          {eligibilityStatus.status === "medium" && <AlertCircle className="h-8 w-8 text-amber-500" />}
          {eligibilityStatus.status === "low" && <XCircle className="h-8 w-8 text-red-500" />}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enhanced EB-1 Eligibility Assessment</h2>
        <p className={`text-xl font-semibold ${eligibilityStatus.color} mb-2`}>
          {eligibilityStatus.label}: {result.score}/100
        </p>

        {result.confidence && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-600">
            <Target className="h-4 w-4 mr-1" />
            Analysis Confidence: {result.confidence}
          </div>
        )}
      </div>

      {/* Enhanced Progress Bar */}
      <div className="space-y-2">
        <Progress value={result.score} className="h-3" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>0</span>
          <span>Competitive Score: 70+</span>
          <span>100</span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">{result.criteriaMet}</div>
          <div className="text-sm text-gray-600">Criteria Met</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">{result.totalCriteria}</div>
          <div className="text-sm text-gray-600">Total Criteria</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">{result.approvalProbability || "Medium"}</div>
          <div className="text-sm text-gray-600">Approval Probability</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">{result.timelineEstimate || "3-6 months"}</div>
          <div className="text-sm text-gray-600">Timeline Estimate</div>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Detailed Analysis
        </h3>

        {/* Category Recommendation */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Category Recommendation</h4>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Recommended Category:</span> {result.category}
          </p>
          <p className="text-gray-700">{result.categoryRationale}</p>
        </div>

        {/* Strength Areas */}
        {result.strengthAreas && result.strengthAreas.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              Your Strongest Areas
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {result.strengthAreas.map((area, index) => (
                <li key={index} className="text-gray-700">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvement Areas */}
        {result.improvementAreas && result.improvementAreas.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
              Areas for Improvement
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {result.improvementAreas.map((area, index) => (
                <li key={index} className="text-gray-700">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* USCIS Criteria Breakdown */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">USCIS Criteria Assessment</h4>
          <div className="space-y-4">
            {result.criteriaBreakdown.map((criterion, index) => (
              <div
                key={index}
                className="border-l-4 pl-4 py-2"
                style={{
                  borderColor:
                    criterion.status === "Met" ? "#10b981" : criterion.status === "Likely Met" ? "#f59e0b" : "#ef4444",
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-medium text-gray-900">{criterion.name}</h5>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm px-2 py-0.5 rounded ${
                        criterion.status === "Met"
                          ? "bg-green-100 text-green-800"
                          : criterion.status === "Likely Met"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {criterion.status}
                    </span>
                    {criterion.strengthLevel && (
                      <span className="text-xs text-gray-500">{criterion.strengthLevel} Evidence</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2">{criterion.justification}</p>
                {criterion.improvementSuggestions && (
                  <p className="text-blue-700 text-sm italic">💡 {criterion.improvementSuggestions}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-indigo-50 p-4 rounded-md">
          <h4 className="font-semibold text-indigo-900 mb-2">Professional Assessment</h4>
          <p className="text-indigo-800">{result.summary}</p>
        </div>
      </Card>

      {/* Recommended Actions */}
      {result.recommendedActions && result.recommendedActions.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recommended Next Steps
          </h3>
          <div className="space-y-3">
            {result.recommendedActions.map((action, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-purple-100 text-purple-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-700">{action}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* CTA Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Ready to Move Forward?</h3>
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-3">
              <FileText className="h-5 w-5 text-purple-600 mr-2" />
              <h4 className="font-medium">Join Our Beta Program</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Get early access to our AI-powered EB-1 petition builder and work with our experts to strengthen your
              case.
            </p>
            <Button className="w-full bg-purple-700 hover:bg-purple-800" asChild>
              <a href="https://forms.office.com/r/KNDUcFg5Vw" target="_blank" rel="noopener noreferrer">
                Join Our Beta
              </a>
            </Button>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
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
