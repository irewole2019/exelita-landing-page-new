"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Upload, CheckCircle, Trash2, AlertCircle } from "lucide-react"
import type { FormData } from "../eligibility-quiz"

// Simulating resume parsing - in a real app this would be an API call
const parseResume = (file: File): Promise<FormData["parsedResumeData"]> => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Mock response - in reality this would analyze the actual document
      resolve({
        publications: Math.floor(Math.random() * 15),
        awards: Math.floor(Math.random() * 6),
        leadership: Math.random() > 0.5,
        patents: Math.floor(Math.random() * 3),
        experience: 5 + Math.floor(Math.random() * 15),
      })
    }, 1500)
  })
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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files?.[0]

    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("File size exceeds 5MB limit")
      return
    }

    const fileType = file.type
    if (
      fileType !== "application/pdf" &&
      fileType !== "application/msword" &&
      fileType !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setError("Please upload a PDF or Word document")
      return
    }

    setIsUploading(true)

    // In a real app you might upload this to a server
    updateFormData({ resume: file })

    setIsUploading(false)
    setIsParsing(true)

    try {
      const parsedData = await parseResume(file)
      updateFormData({ parsedResumeData: parsedData })
    } catch (err) {
      setError("Failed to analyze resume. Please try again.")
    } finally {
      setIsParsing(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setError(null)

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("File size exceeds 5MB limit")
      return
    }

    const fileType = file.type
    if (
      fileType !== "application/pdf" &&
      fileType !== "application/msword" &&
      fileType !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setError("Please upload a PDF or Word document")
      return
    }

    setIsUploading(true)

    updateFormData({ resume: file })

    setIsUploading(false)
    setIsParsing(true)

    try {
      const parsedData = await parseResume(file)
      updateFormData({ parsedResumeData: parsedData })
    } catch (err) {
      setError("Failed to analyze resume. Please try again.")
    } finally {
      setIsParsing(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const removeFile = () => {
    updateFormData({ resume: null, parsedResumeData: null })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
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
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Upload your resume</h3>
            <p className="text-sm text-gray-500 mb-4">Drag and drop or click to browse</p>
            <p className="text-xs text-gray-400 mb-4">PDF or Word files up to 5MB</p>

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

          {isParsing ? (
            <div className="mt-4">
              <p className="text-sm text-indigo-700 animate-pulse flex items-center">
                <span className="mr-2">Analyzing your resume...</span>
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
            </div>
          ) : null}
        </Card>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
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
