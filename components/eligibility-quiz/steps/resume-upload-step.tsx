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
  FileDown,
} from "lucide-react"
import type { FormData } from "../eligibility-quiz"
import { extractTextFromDocument } from "@/utils/document-extractor"

// Define the resume analysis result type
type ResumeAnalysisResult = {
  publications: {
    count: number
    items: string[]
  }
  awards: {
    count: number
    items: string[]
  }
  leadershipExperience: {
    hasLeadership: boolean
    items: string[]
  }
  patents: {
    count: number
    items: string[]
  }
  yearsOfExperience: {
    years: number
    range: string
  }
  eb1Category: {
    recommendation: string
    rationale: string
  }
}

// Sample resume component
const SampleResumeLink = () => {
  const downloadSampleResume = () => {
    const sampleResume = `John Smith
john.smith@example.com | (555) 123-4567 | San Francisco, CA

PROFESSIONAL EXPERIENCE
Senior Research Scientist, Quantum Computing Lab (2018-Present)
- Lead a team of 5 researchers on quantum algorithm development
- Published 3 papers in Nature Quantum Information
- Secured $1.5M in research grants for the laboratory
- Presented findings at 4 international conferences

Research Associate, Institute of Advanced Technology (2014-2018)
- Developed novel approaches to quantum error correction
- Collaborated with international research teams on joint publications
- Mentored 3 PhD students on their dissertation research
- Awarded the Institute's Innovation Prize in 2016

EDUCATION
Ph.D. in Quantum Physics, Stanford University (2010-2014)
M.S. in Physics, MIT (2008-2010)
B.S. in Physics, UC Berkeley (2004-2008)

PUBLICATIONS
"Quantum Error Correction in Noisy Environments" - Nature Quantum Information (2021)
"Novel Approaches to Quantum Gate Implementation" - Physical Review Letters (2019)
"Entanglement Preservation in Quantum Networks" - Quantum (2017)
"Theoretical Foundations of Quantum Computing" - Journal of Physics (2015)

AWARDS & HONORS
Outstanding Research Award, Quantum Computing Association (2022)
Innovation Prize, Institute of Advanced Technology (2016)
Best Dissertation Award, Stanford Physics Department (2014)

PATENTS
"Method for Quantum State Preservation in Distributed Systems" - Patent #12345 (2020)
"Quantum Error Correction Circuit Design" - Patent #67890 (2018)

PROFESSIONAL MEMBERSHIPS
American Physical Society (APS)
Institute of Electrical and Electronics Engineers (IEEE)
International Association for Quantum Information (IAQI)
`

    const blob = new Blob([sampleResume], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sample_eb1_resume.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="outline" size="sm" onClick={downloadSampleResume} className="flex items-center">
      <FileDown className="h-4 w-4 mr-1" />
      Download Sample Resume
    </Button>
  )
}

// Function to generate a fallback analysis based on text content
const generateFallbackAnalysis = (text: string) => {
  // Count publications
  const publicationKeywords = ["publication", "journal", "conference", "paper", "article", "published"]
  const publicationCount = countKeywordMatches(text, publicationKeywords)

  // Count awards
  const awardKeywords = ["award", "honor", "prize", "recognition", "scholarship", "grant"]
  const awardCount = countKeywordMatches(text, awardKeywords)

  // Check for leadership experience
  const leadershipKeywords = ["lead", "manage", "director", "supervisor", "head", "chief", "executive"]
  const hasLeadership = hasKeywordMatches(text, leadershipKeywords)

  // Count patents
  const patentKeywords = ["patent", "invention", "intellectual property"]
  const patentCount = countKeywordMatches(text, patentKeywords)

  // Estimate years of experience
  const yearPattern = /\b(19|20)\d{2}\b/g
  const years = text.match(yearPattern)
  let yearsOfExperience = 5 // Default
  let yearRange = "N/A"

  if (years && years.length >= 2) {
    const sortedYears = years.map(Number).sort()
    const earliestYear = sortedYears[0]
    const latestYear = sortedYears[sortedYears.length - 1]
    yearsOfExperience = Math.min(latestYear - earliestYear, 20) // Cap at 20 years
    yearRange = `${earliestYear}-${latestYear}`
  }

  // Determine the most appropriate EB-1 category
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
    // Default fallback
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

// Helper function to count keyword matches
const countKeywordMatches = (text: string, keywords: string[]): number => {
  const lowerText = text.toLowerCase()
  let count = 0

  // Count sentences containing keywords
  const sentences = text.split(/[.!?]+/)
  for (const sentence of sentences) {
    if (keywords.some((keyword) => sentence.toLowerCase().includes(keyword))) {
      count++
    }
  }

  // Ensure count is reasonable
  return Math.min(count, 10) // Cap at 10
}

// Helper function to check if text contains any keywords
const hasKeywordMatches = (text: string, keywords: string[]): boolean => {
  const lowerText = text.toLowerCase()
  return keywords.some((keyword) => lowerText.includes(keyword))
}

export default function ResumeUploadStep({
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

  // Function to analyze the resume text using OpenAI
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
        // Use fallback analysis if AI failed previously
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
          `Fallback analysis completed. Found: ${fallbackAnalysis.publications} publications, ${fallbackAnalysis.awards} awards, ${fallbackAnalysis.patents} patents, ${fallbackAnalysis.experience} years experience.`,
        )
        return
      }

      // Call our OpenAI-powered API endpoint
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

      // Check if the response has the expected structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid response from API")
      }

      // Extract data with fallbacks for missing properties
      const publications = data.publications?.count || 0
      const awards = data.awards?.count || 0
      const hasLeadership = data.leadershipExperience?.hasLeadership || false
      const patents = data.patents?.count || 0
      const experience = data.yearsOfExperience?.years || 0

      // Determine category and rationale with fallbacks
      let category = null
      let rationale = null

      if (data.eb1Category) {
        // Try to extract from the API response
        category = data.eb1Category.recommendation || null
        rationale = data.eb1Category.rationale || null
      } else {
        // Generate a fallback category based on the extracted data
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

      // Update the form data with the parsed resume data
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

      // Set flag to use fallback analysis on next attempt
      setUseAiFallback(true)

      // Show a more user-friendly error message
      setError("AI analysis failed. Click 'Analyze with AI' again to use our fallback analyzer.")
    } finally {
      setIsParsing(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setDebugInfo(null)
    setIsPlaceholderText(false)
    setExtractionProgress(null)
    setUseAiFallback(false)
    const file = e.target.files?.[0]

    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setError("File size exceeds 10MB limit")
      return
    }

    setIsUploading(true)
    setExtractionProgress("Processing your document...")

    // Update the form with the file
    updateFormData({ resume: file })

    try {
      // Use our unified document extractor
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

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setError(null)
    setDebugInfo(null)
    setIsPlaceholderText(false)
    setExtractionProgress(null)
    setUseAiFallback(false)

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setError("File size exceeds 10MB limit")
      return
    }

    setIsUploading(true)
    setExtractionProgress("Processing your document...")

    // Update the form with the file
    updateFormData({ resume: file })

    try {
      // Use our unified document extractor
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
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

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
        <p className="text-gray-600">We'll analyze your resume to identify EB-1 qualifying factors</p>
      </div>

      {!formData.resume ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-500 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Upload your resume</h3>
            <p className="text-sm text-gray-500 mb-4">Drag and drop or click to browse</p>
            <p className="text-xs text-gray-400 mb-4">PDF, Word, or text files up to 10MB</p>

            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-purple-700 hover:bg-purple-800"
            >
              Select File
            </Button>
          </div>
        </div>
      ) : (
        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <div>
                <p className="font-medium">{formData.resume.name}</p>
                <p className="text-sm text-gray-500">{(formData.resume.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {extractionProgress && (
            <div className="mt-4 bg-blue-50 p-3 rounded-md flex items-start">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
              <p className="text-sm text-blue-700">{extractionProgress}</p>
            </div>
          )}

          {isPlaceholderText && (
            <div className="mt-4 bg-amber-50 p-3 rounded-md flex items-start">
              <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 font-medium">This is placeholder text</p>
                <p className="text-sm text-amber-700">
                  We attempted to extract text from your file but were unable to fully process it. Please edit the text
                  below to match your actual resume content.
                </p>
              </div>
            </div>
          )}

          {resumeText && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Resume Text</h4>
              <div className="border border-gray-200 rounded-md">
                <textarea
                  ref={textareaRef}
                  value={resumeText}
                  onChange={handleTextChange}
                  className="w-full h-48 p-2 text-sm font-mono resize-y rounded-md"
                  placeholder="Resume text will appear here. You can edit it if needed."
                />
              </div>
              <div className="mt-2 flex justify-end">
                <Button
                  onClick={analyzeWithOpenAI}
                  disabled={isParsing}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  {useAiFallback ? "Use Fallback Analysis" : "Analyze with AI"}
                </Button>
              </div>
            </div>
          )}

          {isParsing ? (
            <div className="mt-4">
              <p className="text-sm text-indigo-700 animate-pulse flex items-center">
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
          ) : null}

          {formData.parsedResumeData && !isParsing ? (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Resume Analysis</h4>
              <div className="bg-indigo-50 p-4 rounded-md">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Publications</span>
                    <span className="font-medium">{formData.parsedResumeData.publications}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Awards</span>
                    <span className="font-medium">{formData.parsedResumeData.awards}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Leadership Experience</span>
                    <span className="font-medium">{formData.parsedResumeData.leadership ? "Yes" : "No"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Patents</span>
                    <span className="font-medium">{formData.parsedResumeData.patents}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Years of Experience</span>
                    <span className="font-medium">{formData.parsedResumeData.experience}</span>
                  </li>
                </ul>
              </div>

              {formData.suggestedCategory && (
                <div className="mt-4 bg-purple-50 p-4 rounded-md">
                  <h4 className="font-medium text-purple-900 mb-2">Suggested EB-1 Category</h4>
                  <p className="font-semibold text-purple-800">{formData.suggestedCategory}</p>
                  {formData.categoryRationale && (
                    <p className="text-sm text-purple-700 mt-1">{formData.categoryRationale}</p>
                  )}
                </div>
              )}
            </div>
          ) : null}

          {debugInfo && <div className="mt-4 bg-gray-50 p-2 rounded text-xs text-gray-500">{debugInfo}</div>}
        </Card>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!formData.resume && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Need a sample resume?</span>
            <SampleResumeLink />
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          onClick={onNext}
          disabled={!formData.parsedResumeData || isParsing}
          className="bg-purple-700 hover:bg-purple-800"
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
