"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, FileText, Upload, Info } from "lucide-react"
import { extractTextFromDocument } from "@/utils/document-extractor"

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

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [extractionProgress, setExtractionProgress] = useState<string | null>(null)
  const [isPlaceholderText, setIsPlaceholderText] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value)
    // Clear previous results when text changes
    setResult(null)
    setError(null)
    setDebugInfo(null)
  }

  const handleAnalyzeResume = async () => {
    if (!resumeText.trim()) {
      setError("Please enter resume text")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setDebugInfo("Analyzing resume with AI...")
    setResult(null)

    try {
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

      // Ensure the data has the expected structure
      const ensureValidData = (data: any) => {
        return {
          publications: {
            count: data.publications?.count || 0,
            items: Array.isArray(data.publications?.items) ? data.publications.items : [],
          },
          awards: {
            count: data.awards?.count || 0,
            items: Array.isArray(data.awards?.items) ? data.awards.items : [],
          },
          leadershipExperience: {
            hasLeadership: Boolean(data.leadershipExperience?.hasLeadership),
            items: Array.isArray(data.leadershipExperience?.items) ? data.leadershipExperience.items : [],
          },
          patents: {
            count: data.patents?.count || 0,
            items: Array.isArray(data.patents?.items) ? data.patents.items : [],
          },
          yearsOfExperience: {
            years: data.yearsOfExperience?.years || 0,
            range: data.yearsOfExperience?.range || "N/A",
          },
          eb1Category: {
            recommendation: data.eb1Category?.recommendation || "EB-1A",
            rationale:
              data.eb1Category?.rationale ||
              "Based on the limited information available, Extraordinary Ability (EB-1A) may be worth exploring.",
          },
        }
      }

      // Transform the API response to our result format with validation
      const analysisResult = ensureValidData(data)
      setResult(analysisResult)
      setDebugInfo("AI analysis completed successfully")
    } catch (err) {
      console.error("Error analyzing resume:", err)
      setError(err instanceof Error ? err.message : "Failed to analyze resume. Please try again later.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Function to handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setDebugInfo(null)
    setIsPlaceholderText(false)
    setExtractionProgress(null)
    const file = e.target.files?.[0]

    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setError("File size exceeds 10MB limit")
      return
    }

    setIsUploading(true)
    setExtractionProgress("Processing your document...")

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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>EB-1 Resume Analyzer</CardTitle>
          <CardDescription>Upload or paste your resume content to get an EB-1 eligibility assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* File upload section */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <h3 className="text-sm font-medium text-gray-900 mb-1">Upload your resume</h3>
                <p className="text-xs text-gray-500">PDF, Word, or text files up to 10MB</p>
              </div>
            </div>

            {extractionProgress && (
              <div className="bg-blue-50 p-3 rounded-md flex items-start">
                <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                <p className="text-sm text-blue-700">{extractionProgress}</p>
              </div>
            )}

            {isPlaceholderText && (
              <div className="bg-amber-50 p-3 rounded-md flex items-start">
                <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 font-medium">This is placeholder text</p>
                  <p className="text-sm text-amber-700">
                    We attempted to extract text from your file but were unable to fully process it. Please edit the
                    text below to match your actual resume content.
                  </p>
                </div>
              </div>
            )}

            <Textarea
              id="resume"
              placeholder="Paste your resume text here or upload a file above..."
              value={resumeText}
              onChange={handleTextChange}
              rows={10}
              className="w-full"
            />

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {debugInfo && (
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-xs text-gray-600">{debugInfo}</p>
              </div>
            )}

            <Button
              onClick={handleAnalyzeResume}
              disabled={isAnalyzing || !resumeText.trim() || isUploading}
              className="w-full bg-purple-700 hover:bg-purple-800"
            >
              {isAnalyzing ? "Analyzing with AI..." : "Analyze Resume"}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing your resume with AI...</p>
            </div>
          )}

          {result && !isAnalyzing && (
            <div className="space-y-6 mt-8">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Category Recommendation</h3>
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <FileText className="h-6 w-6 text-purple-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{result.eb1Category.recommendation}</p>
                    <p className="text-gray-700">{result.eb1Category.rationale}</p>
                  </div>
                </div>

                <h4 className="font-semibold text-purple-900 mb-2">Resume Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">Years of Experience</p>
                    <p className="font-semibold">
                      {result.yearsOfExperience.range} ({result.yearsOfExperience.years} years)
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">Publications</p>
                    <p className="font-semibold">{result.publications.count}</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">Patents</p>
                    <p className="font-semibold">{result.patents.count}</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">Leadership Roles</p>
                    <p className="font-semibold">{result.leadershipExperience.hasLeadership ? "Yes" : "No"}</p>
                  </div>
                </div>

                {result.publications.items && result.publications.items.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Publications</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.publications.items.map((item, index) => (
                        <li key={index} className="text-gray-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.awards.items && result.awards.items.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Awards</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.awards.items.map((item, index) => (
                        <li key={index} className="text-gray-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.leadershipExperience.items && result.leadershipExperience.items.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Leadership Experience</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.leadershipExperience.items.map((item, index) => (
                        <li key={index} className="text-gray-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.patents.items && result.patents.items.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Patents</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.patents.items.map((item, index) => (
                        <li key={index} className="text-gray-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="text-center">
                <Button className="bg-purple-700 hover:bg-purple-800">Continue to Full Eligibility Assessment</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
