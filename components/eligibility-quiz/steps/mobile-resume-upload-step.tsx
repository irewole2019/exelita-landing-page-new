"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Upload, CheckCircle, Trash2, AlertCircle, Info, Camera, Shield } from 'lucide-react'
import { extractTextFromDocument } from "@/utils/document-extractor"
import { useIsMobile } from "@/hooks/use-mobile"

interface MobileResumeUploadStepProps {
  onNext: (file: File, text: string) => void
  onSkip: () => void
  onBack: () => void
}

export default function MobileResumeUploadStep({ onNext, onSkip, onBack }: MobileResumeUploadStepProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [resumeText, setResumeText] = useState<string | null>(null)
  const [isPlaceholderText, setIsPlaceholderText] = useState(false)
  const [extractionProgress, setExtractionProgress] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isMobile = useIsMobile()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setDebugInfo(null)
    setIsPlaceholderText(false)
    setExtractionProgress(null)
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit")
      return
    }

    setIsUploading(true)
    setExtractionProgress("Processing your document...")
    setFile(selectedFile)

    try {
      const result = await extractTextFromDocument(selectedFile)
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
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setResumeText(null)
    setDebugInfo(null)
    setIsPlaceholderText(false)
    setExtractionProgress(null)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value)
  }

  const handleNext = () => {
    if (file && resumeText) {
      onNext(file, resumeText)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className={`font-bold text-gray-900 mb-2 ${isMobile ? "text-xl" : "text-2xl"}`}>Upload Your Resume</h2>
        <p className={`text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}>We'll analyze your resume to identify EB-1 qualifying factors</p>
      </div>

      {!file ? (
        <>
          <div
            className={`
              border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-purple-500 transition-colors cursor-pointer
              ${isMobile ? "p-8" : "p-12"}
            `}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center">
              <Upload className={`text-gray-400 mb-4 ${isMobile ? "h-8 w-8" : "h-12 w-12"}`} aria-hidden="true" />
              <h3 className={`font-medium text-gray-900 mb-2 ${isMobile ? "text-base" : "text-lg"}`}>
                Upload your resume
              </h3>
              <p className={`text-gray-600 mb-4 ${isMobile ? "text-sm" : "text-base"}`}>
                {isMobile ? "Tap to browse files" : "Drag and drop or click to browse"}
              </p>
              <p className={`text-gray-600 mb-4 ${isMobile ? "text-xs" : "text-sm"}`}>
                PDF, Word, or text files up to 10MB
              </p>

              <Button type="button" className={`bg-purple-700 hover:bg-purple-800 ${isMobile ? "w-full py-3" : ""}`}>
                {isMobile && <Camera className="h-4 w-4 mr-2" aria-hidden="true" />}
                Select File
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" aria-hidden="true" />
            <span>We only use your resume to generate this analysis. Not legal advice.</span>
          </div>
        </>
      ) : (
        <Card className={`${isMobile ? "p-4" : "p-6"}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-1 min-w-0">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className={`font-medium truncate ${isMobile ? "text-sm text-gray-900" : "text-base text-gray-900"}`}>{file.name}</p>
                <p className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
              title="Remove file"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          {extractionProgress && (
            <div className="mt-4 bg-blue-50 p-3 rounded-md flex items-start">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2" aria-hidden="true"></div>
              <p className={`text-blue-700 ${isMobile ? "text-sm" : "text-base"}`}>{extractionProgress}</p>
            </div>
          )}

          {isPlaceholderText && (
            <div className="mt-4 bg-amber-50 p-3 rounded-md flex items-start">
              <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" aria-hidden="true" />
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
                  className={`w-full p-3 font-mono resize-y rounded-md ${isMobile ? "h-32 text-xs" : "h-48 text-sm"} text-gray-900`}
                  placeholder="Resume text will appear here. You can edit it if needed."
                />
              </div>
            </div>
          )}

          {debugInfo && <div className="mt-4 bg-gray-50 p-2 rounded text-xs text-gray-600">{debugInfo}</div>}
        </Card>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start" role="alert" aria-live="polite">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {/* Mobile Navigation */}
      <div className={`flex gap-3 pt-6 ${isMobile ? "flex-col" : "flex-row justify-between"}`}>
        <Button
          onClick={handleNext}
          disabled={!file || !resumeText || isUploading}
          className={`bg-purple-700 hover:bg-purple-800 ${isMobile ? "w-full py-3" : ""}`}
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>

        <Button onClick={onSkip} variant="outline" className="w-full bg-transparent" disabled={isUploading}>
          Skip & Continue
        </Button>

        <Button onClick={onBack} variant="ghost" className="flex items-center justify-center gap-2">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>
      </div>
    </div>
  )
}
