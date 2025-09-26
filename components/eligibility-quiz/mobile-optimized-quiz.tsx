"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import MobileIntroStep from "./steps/mobile-intro-step"
import MobileCategoryStep from "./steps/mobile-category-step"
import MobileResumeUploadStep from "./steps/mobile-resume-upload-step"
import EnhancedResultsStep from "./steps/enhanced-results-step"

type MobileStep = "intro" | "category" | "resume" | "results"

interface MobileQuizData {
  category?: string
  resumeText?: string
  resumeFile?: File
}

interface MobileOptimizedQuizProps {
  children: React.ReactNode
}

export default function MobileOptimizedQuiz({ children }: MobileOptimizedQuizProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<MobileStep>("intro")
  const [quizData, setQuizData] = useState<MobileQuizData>({})

  const handleStart = () => {
    setCurrentStep("category")
  }

  const handleCategorySelect = (category: string) => {
    setQuizData((prev) => ({ ...prev, category }))
    setCurrentStep("resume")
  }

  const handleResumeUpload = (file: File, text: string) => {
    setQuizData((prev) => ({ ...prev, resumeFile: file, resumeText: text }))
    setCurrentStep("results")
  }

  const handleSkipResume = () => {
    setCurrentStep("results")
  }

  const handleBack = () => {
    if (currentStep === "category") {
      setCurrentStep("intro")
    } else if (currentStep === "resume") {
      setCurrentStep("category")
    } else if (currentStep === "results") {
      setCurrentStep("resume")
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setCurrentStep("intro")
    setQuizData({})
  }

  const renderStep = () => {
    switch (currentStep) {
      case "intro":
        return <MobileIntroStep onStart={handleStart} />
      case "category":
        return (
          <MobileCategoryStep onNext={handleCategorySelect} onBack={handleBack} initialCategory={quizData.category} />
        )
      case "resume":
        return <MobileResumeUploadStep onNext={handleResumeUpload} onSkip={handleSkipResume} onBack={handleBack} />
      case "results":
        return (
          <EnhancedResultsStep
            data={{ category: quizData.category || "" }}
            resumeText={quizData.resumeText}
            onBack={handleBack}
            onClose={handleClose}
          />
        )
      default:
        return <MobileIntroStep onStart={handleStart} />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">
            {currentStep === "intro" && "EB-1 Quick Check"}
            {currentStep === "category" && "Select Category"}
            {currentStep === "resume" && "Upload Resume"}
            {currentStep === "results" && "Your Results"}
          </DialogTitle>
        </DialogHeader>
        {renderStep()}
      </DialogContent>
    </Dialog>
  )
}
