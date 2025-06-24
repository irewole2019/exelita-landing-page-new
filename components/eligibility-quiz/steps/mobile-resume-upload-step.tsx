"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  CheckCircle,
  Trash2,
  AlertCircle,
  FileText,
  Info,
  Camera,
} from "lucide-react"
import type { FormData } from "../mobile-optimized-quiz"
import { extractTextFromDocument } from "@/utils/document-extractor"
import { useIsMobile } from "@/hooks/use-mobile"

export default function MobileResumeUploadStep({
  formData,
  updateFormData,
  onNext,
  onPrev,
}: {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}) {
  const [isUploading, setIsUploading] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [resumeText, setResumeText] = useState<string | null>(null)
  const [isPlaceholderText, setIsPlaceholderText] = useState(false)
  const [extractionProgress, setExtractionProgress] = useState<string | null>(null)
  const [useAiFallback, setUseAiFallback] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isMobile = useIsMobile()

  // Mobile-optimized file analysis
  const analyzeWithOpenAI = async () => {
    if (!resumeText || resumeText.trim() === "") {
      setError("Please enter resume text")
      return
    }

    setIsParsing(true)
    setError(null)
    setDebugInfo("Analyzing resume with AI...")

    try {
      if (useAiFallback) {
        const fallbackAnalysis = generateFallbackAnalysis(resumeText)
        updateFormData({
          parsedResumeData: {
            publications: fallbackAnalysis.publications,
            awards: fallbackAnalysis.awards,
            leadership: fallbackAnalysis.leadership,
            patents: fallbackAnalysis.patents,
            experience: fallbackAnalysis.experience,
          },
          suggestedCategory: fallbackAnalysis.category,
          categoryRationale: fallbackAnalysis.rationale,
        })
        setDebugInfo(
          `Analysis completed. Found: ${fallbackAnalysis.publications} publications, ${fallbackAnalysis.awards} awards, ${fallbackAnalysis.patents} patents, ${fallbackAnalysis.experience} years experience.`,
        )
        return
      }

      const response = await fetch("/api/resume-analysis-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()

      if (!data || typeof data !== "object") {
        throw new Error("Invalid response from API")
      }

      const publications = data.publications?.count || 0
      const awards = data.awards?.count || 0
      const hasLeadership = data.leadershipExperience?.hasLeadership || false
      const patents = data.patents?.count || 0
      const experience = data.yearsOfExperience?.years || 0

      let category = null
      let rationale = null

      if (data.eb1Category) {
        category = data.eb1Category.recommendation || null
        rationale = data.eb1Category.rationale || null
      } else {
        if (publications >= 3 || awards >= 2 || patents >= 1) {
          category = "EB-1A"
          rationale = `Based on your profile with ${publications} publications, ${awards} awards, and ${patents} patents, Extraordinary Ability (EB-1A) appears most appropriate.`
        } else if (publications >= 1 && experience >= 3) {
          category = "EB-1B"
          rationale = `With ${publications} publications and ${experience} years of experience, Outstanding Researcher (EB-1B) may be suitable.`
        } else if (hasLeadership && experience >= 3) {
          category = "EB-1C"
          rationale = `With leadership experience and ${experience} years of experience, Multinational Manager/Executive (EB-1C) is recommended.`
        } else {
          category = "EB-1A"
          rationale = "Based on the available information, Extraordinary Ability (EB-1A) may be worth exploring."
        }
      }

      updateFormData({
        parsedResumeData: {
          publications,
          awards,
          leadership: hasLeadership,
          patents,
          experience,
        },
        suggestedCategory: category as FormData["category"],
        categoryRationale: rationale,
      })

      setDebugInfo(
        `AI analysis completed. Found: ${publications} publications, ${awards} awards, ${patents} patents, ${experience} years experience.`,
      )
    } catch (err) {
      console.error("Failed to analyze resume with OpenAI:", err)
      setError(err instanceof Error ? err.message : "Failed to analyze resume. Please try again.")
      setUseAiFallback(true)
      setError("AI analysis failed. Click 'Analyze with AI' again to use our fallback analyzer.")
    } finally {
      setIsParsing(false)
    }
  }

  // Mobile-optimized file handling
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setDebugInfo(null)
    setIsPlaceholderText(false)
    setExtractionProgress(null)
    setUseAiFallback(false)
    const file = e.target.files?.[0]

    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit")
      return
    }

    setIsUploading(true)
    setExtractionProgress("Processing your document...")

    updateFormData({ resume: file })

    try {
      const result = await extractTextFromDocument(file)
      setResumeText(result.text)
      setDebugInfo(result.debugInfo || "")
      setIsPlaceholderText(result.isPlaceholder)
    } catch (err) {
      console.error("Failed to process file:", err)
      setError(err instanceof Error ? err.message : "Failed to process file")
      setIsPlaceholderText(true)
    } finally {
      setIsUploading(false)
      setExtractionProgress(null)
    }
  }

  const removeFile = () => {
    updateFormData({ resume: null, parsedResumeData: null, suggestedCategory: null, categoryRationale: null })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setResumeText(null)
    setDebugInfo(null)
    setIsPlaceholderText(false)
    setExtractionProgress(null)
    setUseAiFallback(false)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value)
    setUseAiFallback(false)
  }

  // Fallback analysis function
  const generateFallbackAnalysis = (text: string) => {
    const publicationKeywords = ["publication", "journal", "conference", "paper", "article", "published"]
    const publicationCount = countKeywordMatches(text, publicationKeywords)

    const awardKeywords = ["award", "honor", "prize", "recognition", "scholarship", "grant"]
    const awardCount = countKeywordMatches(text, awardKeywords)

    const leadershipKeywords = ["lead", "manage", "director", "supervisor", "head", "chief", "executive"]
    const hasLeadership = hasKeywordMatches(text, leadershipKeywords)

    const patentKeywords = ["patent", "invention", "intellectual property"]
    const patentCount = countKeywordMatches(text, patentKeywords)

    const yearPattern = /\b(19|20)\d{2}\b/g
    const years = text.match(yearPattern)
    let yearsOfExperience = 5
    let yearRange = "N/A"

    if (years && years.length >= 2) {
      const sortedYears = years.map(Number).sort()
      const earliestYear = sortedYears[0]
      const latestYear = sortedYears[sortedYears.length - 1]
      yearsOfExperience = Math.min(latestYear - earliestYear, 20)
      yearRange = `${earliestYear}-${latestYear}`
    }

    let category: "EB-1A" | "EB-1B" | "EB-1C" = "EB-1A"
    let rationale = ""

    if (publicationCount >= 3 || (publicationCount >= 1 && awardCount >= 1) || patentCount >= 1) {
      category = "EB-1A"
      rationale = `With ${publicationCount} publications, ${awardCount} awards, and ${patentCount} patents, Extraordinary Ability (EB-1A) appears most appropriate.`
    } else if (publicationCount >= 1 && yearsOfExperience >= 3 && text.toLowerCase().includes("research")) {
      category = "EB-1B"
      rationale = `With ${publicationCount} publications and ${yearsOfExperience} years of research experience, Outstanding Researcher (EB-1B) may be suitable.`
    } else if (
      hasLeadership &&
      yearsOfExperience >= 3 &&
      (text.toLowerCase().includes("international") || text.toLowerCase().includes("global"))
    ) {
      category = "EB-1C"
      rationale = `With leadership experience and ${yearsOfExperience} years in an international context, Multinational Manager/Executive (EB-1C) is recommended.`
    } else {
      if (publicationCount > 0 || awardCount > 0) {
        category = "EB-1A"
        rationale = `Based on your overall profile with ${publicationCount} publications and ${awardCount} awards, Extraordinary Ability (EB-1A) may be worth exploring.`
      } else if (text.toLowerCase().includes("research") || text.toLowerCase().includes("professor")) {
        category = "EB-1B"
        rationale = `Your background in research suggests Outstanding Researcher (EB-1B) may be appropriate.`
      } else if (hasLeadership) {
        category = "EB-1C"
        rationale = `Your leadership experience suggests Multinational Manager/Executive (EB-1C) could be suitable.`
      } else {
        category = "EB-1A"
        rationale = `Based on the limited information available, Extraordinary Ability (EB-1A) may be the most flexible option to explore.`
      }
    }

    return {
      publications: publicationCount,
      awards: awardCount,
      leadership: hasLeadership,
      patents: patentCount,
      experience: yearsOfExperience,
      category,
      rationale,
    }
  }

  const countKeywordMatches = (text: string, keywords: string[]): number => {
    const lowerText = text.toLowerCase()
    let count = 0
    const sentences = text.split(/[.!?]+/)
    for (const sentence of sentences) {
      if (keywords.some((keyword) => sentence.toLowerCase().includes(keyword))) {
        count++
      }
    }
    return Math.min(count, 10)
  }

  const hasKeywordMatches = (text: string, keywords: string[]): boolean => {
    const lowerText = text.toLowerCase()
    return keywords.some((keyword) => lowerText.includes(keyword))
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className={`font-bold text-gray-900 mb-2 ${isMobile ? "text-xl" : "text-2xl"}`}>Upload Your Resume</h2>
        <p className={`text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}>
          We'll analyze your resume to identify EB-1 qualifying factors
        </p>
      </div>

      {!formData.resume ? (
        <div
          className={`
            border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-purple-500 transition-colors
            ${isMobile ? "p-8" : "p-12"}
          `}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center">
            <Upload className={`text-gray-400 mb-4 ${isMobile ? "h-8 w-8" : "h-12 w-12"}`} />
            <h3 className={`font-medium text-gray-900 mb-2 ${isMobile ? "text-base" : "text-lg"}`}>
              Upload your resume
            </h3>
            <p className={`text-gray-500 mb-4 ${isMobile ? "text-sm" : "text-base"}`}>
              {isMobile ? "Tap to browse files" : "Drag and drop or click to browse"}
            </p>
            <p className={`text-gray-400 mb-4 ${isMobile ? "text-xs" : "text-sm"}`}>
              PDF, Word, or text files up to 10MB
            </p>

            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`bg-purple-700 hover:bg-purple-800 ${isMobile ? "w-full py-3" : ""}`}
            >
              {isMobile && <Camera className="h-4 w-4 mr-2" />}
              Select File
            </Button>
          </div>
        </div>
      ) : (
        <Card className={`${isMobile ? "p-4" : "p-6"}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-1 min-w-0">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`font-medium truncate ${isMobile ? "text-sm" : "text-base"}`}>{formData.resume.name}</p>
                <p className={`text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}>
                  {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {extractionProgress && (
            <div className="mt-4 bg-blue-50 p-3 rounded-md flex items-start">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
              <p className={`text-blue-700 ${isMobile ? "text-sm" : "text-base"}`}>{extractionProgress}</p>
            </div>
          )}

          {isPlaceholderText && (
            <div className="mt-4 bg-amber-50 p-3 rounded-md flex items-start">
              <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className={`text-amber-800 font-medium ${isMobile ? "text-sm" : "text-base"}`}>
                  This is placeholder text
                </p>
                <p className={`text-amber-700 ${isMobile ? "text-xs" : "text-sm"}`}>
                  We attempted to extract text from your file but were unable to fully process it. Please edit the text
                  below to match your actual resume content.
                </p>
              </div>
            </div>
          )}

          {resumeText && (
            <div className="mt-4">
              <h4 className={`font-medium text-gray-900 mb-2 ${isMobile ? "text-sm" : "text-base"}`}>Resume Text</h4>
              <div className="border border-gray-200 rounded-md">
                <textarea
                  ref={textareaRef}
                  value={resumeText}
                  onChange={handleTextChange}
                  className={`w-full p-3 font-mono resize-y rounded-md ${isMobile ? "h-32 text-xs" : "h-48 text-sm"}`}
                  placeholder="Resume text will appear here. You can edit it if needed."
                />
              </div>
              <div className="mt-3 flex justify-end">
                <Button
                  onClick={analyzeWithOpenAI}
                  disabled={isParsing}
                  size="sm"
                  className={`bg-indigo-600 hover:bg-indigo-700 ${isMobile ? "w-full" : ""}`}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  {useAiFallback ? "Use Fallback Analysis" : "Analyze with AI"}
                </Button>
              </div>
            </div>
          )}

          {isParsing && (
            <div className="mt-4">
              <p className={`text-indigo-700 animate-pulse flex items-center ${isMobile ? "text-sm" : "text-base"}`}>
                <span className="mr-2">Analyzing your resume with AI...</span>
                <svg
                  className="animate-spin h-4 w-4 text-indigo-700"
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
              </p>
            </div>
          )}

          {formData.parsedResumeData && !isParsing && (
            <div className="mt-4">
              <h4 className={`font-medium text-gray-900 mb-3 ${isMobile ? "text-sm" : "text-base"}`}>
                Resume Analysis
              </h4>
              <div className="bg-indigo-50 p-4 rounded-md">
                <div className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}>Publications</span>
                    <span className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>
                      {formData.parsedResumeData.publications}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}>Awards</span>
                    <span className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>
                      {formData.parsedResumeData.awards}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}>Leadership</span>
                    <span className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>
                      {formData.parsedResumeData.leadership ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}>Patents</span>
                    <span className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>
                      {formData.parsedResumeData.patents}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}>Experience</span>
                    <span className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>
                      {formData.parsedResumeData.experience} years
                    </span>
                  </div>
                </div>
              </div>

              {formData.suggestedCategory && (
                <div className="mt-4 bg-purple-50 p-4 rounded-md">
                  <h4 className={`font-medium text-purple-900 mb-2 ${isMobile ? "text-sm" : "text-base"}`}>
                    Suggested EB-1 Category
                  </h4>
                  <p className={`font-semibold text-purple-800 ${isMobile ? "text-sm" : "text-base"}`}>
                    {formData.suggestedCategory}
                  </p>
                  {formData.categoryRationale && (
                    <p className={`text-purple-700 mt-1 ${isMobile ? "text-xs" : "text-sm"}`}>
                      {formData.categoryRationale}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {debugInfo && <div className="mt-4 bg-gray-50 p-2 rounded text-xs text-gray-500">{debugInfo}</div>}
        </Card>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <p className={`${isMobile ? "text-sm" : "text-base"}`}>{error}</p>
        </div>
      )}

      {/* Mobile Navigation */}
      <div className={`flex gap-3 pt-6 ${isMobile ? "flex-col" : "flex-row justify-between"}`}>
        {!isMobile && (
          <Button variant="outline" onClick={onPrev}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}

        <Button
          onClick={onNext}
          disabled={!formData.parsedResumeData || isParsing}
          className={`bg-purple-700 hover:bg-purple-800 ${isMobile ? "w-full py-3" : ""}`}
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
