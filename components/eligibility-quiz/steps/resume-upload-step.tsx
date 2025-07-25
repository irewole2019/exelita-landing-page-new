"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText, ChevronLeft, ChevronRight, AlertCircle, CheckCircle, Trash2, FileDown } from "lucide-react"
import type { FormData } from "../eligibility-quiz"
import { extractTextFromDocument } from "@/utils/document-extractor"
import { trackResumeUpload } from "@/lib/analytics"

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
    <Button variant="outline" size="sm" onClick={downloadSampleResume} className="flex items-center bg-transparent">
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
  onNext: (resumeText?: string) => void
  onPrev: () => void
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [resumeText, setResumeText] = useState<string>("")
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError("")

    try {
      const text = await extractTextFromDocument(file)
      setUploadedFile(file)
      setResumeText(text)
      updateFormData({ resume: file, resumeText: text })
      trackResumeUpload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process file")
    } finally {
      setUploading(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleNext = () => {
    onNext(resumeText || undefined)
  }

  const handleSkip = () => {
    onNext()
  }

  const removeFile = () => {
    updateFormData({ resume: null, resumeText: "" })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setUploadedFile(null)
    setResumeText("")
    setError("")
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
        <p className="text-gray-600">We'll analyze your resume to identify EB-1 qualifying factors</p>
      </div>

      {!uploadedFile ? (
        <div
          onClick={handleUploadClick}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-500 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />

          {uploading ? (
            <div className="space-y-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-600">Processing your resume...</p>
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900">Click to upload your resume</p>
                <p className="text-gray-500">PDF, DOCX, or TXT files (max 10MB)</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <div>
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
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

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <FileText className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Why upload your resume?</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Get more accurate EB-1 category recommendations</li>
                  <li>• Receive personalized strength analysis</li>
                  <li>• Get specific suggestions for improvement</li>
                  <li>• Identify missing evidence and documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSkip}>
            Skip for Now
          </Button>

          <Button
            onClick={handleNext}
            className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800"
            disabled={uploading}
          >
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {!uploadedFile && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Need a sample resume?</span>
            <SampleResumeLink />
          </div>
        </div>
      )}
    </div>
  )
}
