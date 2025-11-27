"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Upload,
  FileText,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Trash2,
  FileDown,
  Shield,
} from "lucide-react"
import { extractTextFromDocument } from "@/utils/document-extractor"
import { trackResumeUpload } from "@/lib/analytics"

interface FormData {
  resume?: File | null
  resumeText?: string
}

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
      <FileDown className="h-4 w-4 mr-1" aria-hidden="true" />
      Download Sample Resume
    </Button>
  )
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
  const [resumeText, setResumeText] = useState<string>(formData.resumeText || "")
  const [error, setError] = useState("")
  const [extractionResult, setExtractionResult] = useState<{
    preview?: string
    wordCount?: number
    debugInfo?: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      setError("File size exceeds 10MB. Please upload a smaller file.")
      return
    }

    setUploading(true)
    setError("")
    setExtractionResult(null)

    try {
      const result = await extractTextFromDocument(file)

      if (!result.text || result.text.trim().length < 50) {
        throw new Error("The extracted text is too short. Please ensure your file contains readable text content.")
      }

      setUploadedFile(file)
      setResumeText(result.text)
      setExtractionResult({
        preview: result.preview,
        wordCount: result.wordCount,
        debugInfo: result.debugInfo,
      })
      updateFormData({ resume: file, resumeText: result.text })
      trackResumeUpload()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process file. Please try a different format."
      setError(errorMessage)
      setUploadedFile(null)
      setResumeText("")
      setExtractionResult(null)
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
    setExtractionResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
        <p className="text-gray-600">We'll analyze your resume to identify EB-1 qualifying factors</p>
      </div>

      {!uploadedFile ? (
        <>
          <div
            onClick={handleUploadClick}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-500 transition-colors cursor-pointer"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
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
                <Upload className="h-12 w-12 text-gray-400 mx-auto" aria-hidden="true" />
                <div>
                  <p className="text-lg font-medium text-gray-900">Click to upload your resume</p>
                  <p className="text-gray-600">PDF, DOCX, or TXT files (max 10MB)</p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert" aria-live="polite">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <p className="font-medium text-red-900 mb-1">Upload Failed</p>
                  <p className="text-sm text-red-700">{error}</p>
                  <div className="mt-3 text-sm text-red-700">
                    <p className="font-medium">Suggestions:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Try converting your file to PDF format</li>
                      <li>Ensure the file contains readable text (not just images)</li>
                      <li>Check that the file is not corrupted or password-protected</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" aria-hidden="true" />
            <span>We only use your resume to generate this analysis. Not legal advice.</span>
          </div>
        </>
      ) : (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />
              <div>
                <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              title="Remove file"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          {extractionResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <p className="font-medium text-green-900 mb-2">Text Extracted Successfully</p>
                  {extractionResult.wordCount && (
                    <p className="text-sm text-green-700 mb-2">
                      Extracted {extractionResult.wordCount.toLocaleString()} words from your resume
                    </p>
                  )}
                  {extractionResult.preview && (
                    <div className="bg-white rounded border border-green-300 p-3 mt-2">
                      <p className="text-xs font-medium text-gray-700 mb-1">Preview:</p>
                      <p className="text-sm text-gray-600 line-clamp-3">{extractionResult.preview}...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" aria-hidden="true" />
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
          <ChevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
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
            <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
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
