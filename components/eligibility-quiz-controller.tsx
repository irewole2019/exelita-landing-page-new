"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import IntroStep from "@/components/eligibility-quiz/steps/intro-step"
import QuestionsStep from "@/components/eligibility-quiz/steps/questions-step"
import ResultsStep from "@/components/eligibility-quiz/steps/results-step"

type Step = "intro" | "questions" | "results"

interface QuizData {
  questions?: Record<string, string>
  results?: any
}

interface EligibilityQuizControllerProps {
  children: React.ReactNode
}

export default function EligibilityQuizController({ children }: EligibilityQuizControllerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>("intro")
  const [quizData, setQuizData] = useState<QuizData>({})

  const handleStart = () => {
    setCurrentStep("questions")
  }

  const handleQuestionsComplete = (data: Record<string, string>) => {
    setQuizData((prev) => ({ ...prev, questions: data }))
    setCurrentStep("results")
  }

  const handleBack = () => {
    if (currentStep === "questions") {
      setCurrentStep("intro")
    } else if (currentStep === "results") {
      setCurrentStep("questions")
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
        return <IntroStep onStart={handleStart} />
      case "questions":
        return <QuestionsStep onNext={handleQuestionsComplete} onBack={handleBack} initialData={quizData.questions} />
      case "results":
        return <ResultsStep data={quizData.questions || {}} onBack={handleBack} onClose={handleClose} />
      default:
        return <IntroStep onStart={handleStart} />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            {currentStep === "intro" && "EB-1 Eligibility Assessment"}
            {currentStep === "questions" && "Tell Us About Your Background"}
            {currentStep === "results" && "Your EB-1 Eligibility Results"}
          </DialogTitle>
        </DialogHeader>
        {renderStep()}
      </DialogContent>
    </Dialog>
  )
}
