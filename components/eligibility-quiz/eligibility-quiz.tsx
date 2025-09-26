"use client"

import { useState } from "react"
import IntroStep from "./steps/intro-step"
import CategoryStep from "./steps/category-step"
import QuestionsStep from "./steps/questions-step"
import ResultsStep from "./steps/results-step"

type Step = "intro" | "category" | "questions" | "results"

interface QuizData {
  category?: string
  questions?: Record<string, string>
  results?: any
}

export default function EligibilityQuiz() {
  const [currentStep, setCurrentStep] = useState<Step>("intro")
  const [quizData, setQuizData] = useState<QuizData>({})

  const handleStart = () => {
    setCurrentStep("category")
  }

  const handleCategorySelect = (category: string) => {
    setQuizData((prev) => ({ ...prev, category }))
    setCurrentStep("questions")
  }

  const handleQuestionsComplete = (data: Record<string, string>) => {
    setQuizData((prev) => ({ ...prev, questions: data }))
    setCurrentStep("results")
  }

  const handleBack = () => {
    if (currentStep === "category") {
      setCurrentStep("intro")
    } else if (currentStep === "questions") {
      setCurrentStep("category")
    } else if (currentStep === "results") {
      setCurrentStep("questions")
    }
  }

  const handleRestart = () => {
    setCurrentStep("intro")
    setQuizData({})
  }

  const renderStep = () => {
    switch (currentStep) {
      case "intro":
        return <IntroStep onStart={handleStart} />
      case "category":
        return <CategoryStep onNext={handleCategorySelect} onBack={handleBack} initialCategory={quizData.category} />
      case "questions":
        return <QuestionsStep onNext={handleQuestionsComplete} onBack={handleBack} initialData={quizData.questions} />
      case "results":
        return (
          <ResultsStep
            data={{ ...quizData.questions, category: quizData.category }}
            onBack={handleBack}
            onRestart={handleRestart}
          />
        )
      default:
        return <IntroStep onStart={handleStart} />
    }
  }

  return <div className="max-w-2xl mx-auto">{renderStep()}</div>
}
