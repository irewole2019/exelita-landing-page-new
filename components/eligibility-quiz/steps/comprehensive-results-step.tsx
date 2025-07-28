"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  Download,
  Mail,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Users,
  Newspaper,
  Scale,
  Lightbulb,
  BookOpen,
  Palette,
  Building,
  DollarSign,
  Music,
  Star,
  Target,
  ArrowRight,
} from "lucide-react"

interface ComprehensiveResultsStepProps {
  questionnaireData: Record<string, string>
  cvText?: string
  onBack: () => void
  onClose: () => void
}

interface ParsedResults {
  overallScore: number
  eligibilityLevel: string
  criteriaScores: Array<{
    name: string
    score: number
    confidence: string
    icon: any
    status: string
  }>
  strengths: string[]
  improvements: string[]
  recommendations: string[]
  nextSteps: string[]
}

const criteriaIcons = {
  awards: Award,
  memberships: Users,
  media: Newspaper,
  judging: Scale,
  contributions: Lightbulb,
  publications: BookOpen,
  exhibitions: Palette,
  leadingRoles: Building,
  compensation: DollarSign,
  commercialSuccess: Music,
}

export default function ComprehensiveResultsStep({
  questionnaireData,
  cvText,
  onBack,
  onClose,
}: ComprehensiveResultsStepProps) {
  const [evaluation, setEvaluation] = useState<string>("")
  const [parsedResults, setParsedResults] = useState<ParsedResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/enhanced-eb1a-evaluation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionnaire: questionnaireData,
            cvText: cvText,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get evaluation")
        }

        const result = await response.json()
        setEvaluation(result.evaluation)

        // Parse the evaluation for better UI display
        const parsed = parseEvaluation(result.evaluation, questionnaireData)
        setParsedResults(parsed)
      } catch (err) {
        setError("Failed to generate evaluation. Please try again.")
        console.error("Evaluation error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvaluation()
  }, [questionnaireData, cvText])

  const parseEvaluation = (evaluation: string, responses: Record<string, string>): ParsedResults => {
    // Extract overall score (look for patterns like "Score: 75/100" or "75 out of 100")
    const scoreMatch = evaluation.match(/(?:score|total).*?(\d+)(?:\/100|%|\s*out\s*of\s*100)/i)
    const overallScore = scoreMatch ? Number.parseInt(scoreMatch[1]) : 65

    // Determine eligibility level based on score
    let eligibilityLevel = "Moderate"
    if (overallScore >= 80) eligibilityLevel = "Strong"
    else if (overallScore >= 60) eligibilityLevel = "Moderate"
    else eligibilityLevel = "Needs Improvement"

    // Create criteria scores based on responses
    const criteriaScores = [
      {
        name: "Awards & Recognition",
        score: responses.awards === "Yes" ? 8 : 2,
        confidence: responses.awards === "Yes" ? "High" : "Low",
        icon: Award,
        status: responses.awards === "Yes" ? "Strong" : "Needs Work",
      },
      {
        name: "Professional Memberships",
        score: responses.memberships === "Yes" ? 7 : 3,
        confidence: responses.memberships === "Yes" ? "High" : "Medium",
        icon: Users,
        status: responses.memberships === "Yes" ? "Good" : "Needs Work",
      },
      {
        name: "Media Coverage",
        score: responses.media === "Yes" ? 6 : 2,
        confidence: responses.media === "Yes" ? "Medium" : "Low",
        icon: Newspaper,
        status: responses.media === "Yes" ? "Good" : "Needs Work",
      },
      {
        name: "Judging Experience",
        score: responses.judging === "Yes" ? 7 : 1,
        confidence: responses.judging === "Yes" ? "High" : "Low",
        icon: Scale,
        status: responses.judging === "Yes" ? "Strong" : "Needs Work",
      },
      {
        name: "Original Contributions",
        score: responses.contributions === "Yes" ? 8 : 3,
        confidence: responses.contributions === "Yes" ? "High" : "Medium",
        icon: Lightbulb,
        status: responses.contributions === "Yes" ? "Strong" : "Needs Work",
      },
      {
        name: "Publications",
        score: responses.publications === "Yes" ? 7 : 2,
        confidence: responses.publications === "Yes" ? "High" : "Low",
        icon: BookOpen,
        status: responses.publications === "Yes" ? "Good" : "Needs Work",
      },
      {
        name: "Leadership Roles",
        score: responses.leadingRoles === "Yes" ? 6 : 2,
        confidence: responses.leadingRoles === "Yes" ? "Medium" : "Low",
        icon: Building,
        status: responses.leadingRoles === "Yes" ? "Good" : "Needs Work",
      },
      {
        name: "High Compensation",
        score: responses.compensation === "Yes" ? 5 : 1,
        confidence: responses.compensation === "Yes" ? "Medium" : "Low",
        icon: DollarSign,
        status: responses.compensation === "Yes" ? "Good" : "Needs Work",
      },
    ]

    // Extract strengths and improvements from evaluation text
    const strengths = criteriaScores
      .filter((c) => c.score >= 6)
      .map((c) => `Strong ${c.name.toLowerCase()} demonstrates your expertise`)

    const improvements = criteriaScores
      .filter((c) => c.score < 4)
      .map((c) => `Develop stronger ${c.name.toLowerCase()} to meet USCIS standards`)

    const recommendations = [
      "Focus on documenting your most significant achievements",
      "Gather evidence for your strongest criteria first",
      "Consider working with experts to strengthen weak areas",
      "Prepare comprehensive documentation for each criterion",
    ]

    const nextSteps = [
      "Download your detailed assessment report",
      "Start gathering documentation for your strongest criteria",
      "Consider joining our petition building program",
      "Schedule a consultation to discuss your specific case",
    ]

    return {
      overallScore,
      eligibilityLevel,
      criteriaScores,
      strengths,
      improvements,
      recommendations,
      nextSteps,
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 7) return "text-green-600 bg-green-100"
    if (score >= 4) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getConfidenceColor = (confidence: string) => {
    if (confidence === "High") return "text-green-700 bg-green-100"
    if (confidence === "Medium") return "text-yellow-700 bg-yellow-100"
    return "text-red-700 bg-red-100"
  }

  const handleDownloadReport = () => {
    const reportContent = `
COMPREHENSIVE EB-1A ELIGIBILITY EVALUATION REPORT
Generated by Exelita AI Immigration Advisor

OVERALL ASSESSMENT
Overall Score: ${parsedResults?.overallScore}/100
Eligibility Level: ${parsedResults?.eligibilityLevel}

DETAILED ANALYSIS
${evaluation}

QUESTIONNAIRE RESPONSES:
${Object.entries(questionnaireData)
  .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
  .join("\n")}

${cvText ? `\nCV/RESUME CONTENT:\n${cvText}` : ""}

Generated on: ${new Date().toLocaleDateString()}
Report ID: ${Date.now()}

---
This report was generated by Exelita's AI-powered EB-1A evaluation system.
For questions or to start building your petition, visit https://exelita.com
    `.trim()

    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `eb1a-evaluation-report-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleEmailReport = () => {
    const subject = encodeURIComponent("My Comprehensive EB-1A Eligibility Evaluation Results")
    const body = encodeURIComponent(`
Hi Exelita Team,

I just completed the comprehensive EB-1A eligibility evaluation and would like to discuss next steps.

My Results Summary:
- Overall Score: ${parsedResults?.overallScore}/100
- Eligibility Level: ${parsedResults?.eligibilityLevel}

Please contact me to discuss how Exelita can help me build my EB-1A petition.

Best regards
    `)

    window.open(`mailto:irewole@exelita.com?subject=${subject}&body=${body}`)
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-200 border-t-purple-600 mx-auto mb-8"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Target className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your EB-1A Eligibility</h3>
        <p className="text-gray-600 mb-4">Our AI is evaluating your profile against all 10 USCIS criteria</p>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 max-w-md mx-auto">
          <p className="text-blue-800 text-sm">
            This comprehensive analysis considers your responses, CV content, and USCIS policy guidelines to provide
            detailed scoring and personalized recommendations.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="h-20 w-20 text-red-500 mx-auto mb-8" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Evaluation Error</h3>
        <p className="text-gray-600 mb-8">{error}</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onBack} className="px-6 py-3 bg-transparent">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button onClick={() => window.location.reload()} className="px-6 py-3">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!parsedResults) return null

  return (
    <div className="space-y-8">
      {/* Header with Overall Score */}
      <div className="text-center bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 p-8 rounded-2xl border border-purple-200">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
              <div className="text-3xl font-bold text-purple-600">{parsedResults.overallScore}</div>
            </div>
            <div className="absolute -top-2 -right-2">
              <Star className="h-8 w-8 text-amber-500 fill-current" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your EB-1A Assessment Complete!</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xl text-gray-600">Eligibility Level:</span>
          <span
            className={`text-xl font-bold px-4 py-2 rounded-full ${
              parsedResults.eligibilityLevel === "Strong"
                ? "text-green-700 bg-green-100"
                : parsedResults.eligibilityLevel === "Moderate"
                  ? "text-yellow-700 bg-yellow-100"
                  : "text-red-700 bg-red-100"
            }`}
          >
            {parsedResults.eligibilityLevel}
          </span>
        </div>
        <Progress value={parsedResults.overallScore} className="w-64 mx-auto h-3" />
      </div>

      {/* Criteria Breakdown */}
      <Card className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Target className="h-6 w-6 text-purple-600" />
          EB-1A Criteria Analysis
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parsedResults.criteriaScores.map((criterion, index) => {
            const IconComponent = criterion.icon
            return (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{criterion.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(criterion.score)}`}>
                        {criterion.score}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-600">Confidence:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(criterion.confidence)}`}
                      >
                        {criterion.confidence}
                      </span>
                    </div>
                    <Progress value={criterion.score * 10} className="h-2" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strengths */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Your Strengths
          </h3>
          <div className="space-y-3">
            {parsedResults.strengths.length > 0 ? (
              parsedResults.strengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800 text-sm">{strength}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-sm">Focus on developing stronger evidence for the EB-1A criteria.</p>
            )}
          </div>
        </Card>

        {/* Areas for Improvement */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-amber-600" />
            Areas to Strengthen
          </h3>
          <div className="space-y-3">
            {parsedResults.improvements.map((improvement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                <TrendingUp className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-amber-800 text-sm">{improvement}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-blue-600" />
          Expert Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parsedResults.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                <ArrowRight className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-gray-700 text-sm">{rec}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          onClick={handleDownloadReport}
          className="flex items-center justify-center gap-2 bg-transparent border-2 border-gray-300 hover:border-gray-400"
          variant="outline"
        >
          <Download className="h-4 w-4" />
          Download Full Report
        </Button>

        <Button
          onClick={handleEmailReport}
          className="flex items-center justify-center gap-2 bg-transparent border-2 border-gray-300 hover:border-gray-400"
          variant="outline"
        >
          <Mail className="h-4 w-4" />
          Email Results to Team
        </Button>
      </div>

      {/* Next Steps CTA - Removed "Analyze My Resume" button */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Build Your Winning EB-1A Petition?</h3>
          <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">
            Based on your assessment, our AI-powered platform can help you strengthen your petition and address the
            areas identified for improvement.
          </p>
          <div className="flex justify-center">
            <Button
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={() => window.open("https://forms.office.com/r/KNDUcFg5Vw", "_blank")}
            >
              Start Building My Petition
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-transparent px-6 py-3">
          <ChevronLeft className="h-4 w-4" />
          Back to Questions
        </Button>

        <Button onClick={onClose} variant="outline" className="bg-transparent px-6 py-3">
          Close Assessment
        </Button>
      </div>
    </div>
  )
}
