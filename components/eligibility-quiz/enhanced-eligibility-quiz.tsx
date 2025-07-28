"use client"

import { useState } from "react"
import IntroStep from "./steps/intro-step"
import EnhancedQuestionnaireStep from "./steps/enhanced-questionnaire-step"
import ResumeUploadStep from "./steps/resume-upload-step"
import ComprehensiveResultsStep from "./steps/comprehensive-results-step"

type Step = "intro" | "questionnaire" | "resume" | "results"

interface QuizData {
  questionnaire?: Record<string, string>
  resumeText?: string
  resumeFile?: File
}

export default function EnhancedEligibilityQuiz() {
  const [currentStep, setCurrentStep] = useState<Step>("intro")
  const [quizData, setQuizData] = useState<QuizData>({})

  const handleStart = () => {
    console.log("Starting quiz")
    setCurrentStep("questionnaire")
  }

  const handleQuestionnaireComplete = (data: Record<string, string>) => {
    console.log("Questionnaire completed", data)
    setQuizData((prev) => ({ ...prev, questionnaire: data }))
    setCurrentStep("resume")
  }

  const handleResumeComplete = (resumeText?: string) => {
    console.log("Resume step completed", resumeText ? "with resume" : "without resume")
    if (resumeText) {
      setQuizData((prev) => ({ ...prev, resumeText }))
    }
    setCurrentStep("results")
  }

  const handleBack = () => {
    console.log("Going back from step:", currentStep)
    if (currentStep === "questionnaire") {
      setCurrentStep("intro")
    } else if (currentStep === "resume") {
      setCurrentStep("questionnaire")
    } else if (currentStep === "results") {
      setCurrentStep("resume")
    }
  }

  const handleRestart = () => {
    console.log("Restarting quiz")
    setCurrentStep("intro")
    setQuizData({})
  }

  const renderStep = () => {
    console.log("Rendering step:", currentStep)

    switch (currentStep) {
      case "intro":
        return <IntroStep onStart={handleStart} />
      case "questionnaire":
        return (
          <EnhancedQuestionnaireStep
            onNext={handleQuestionnaireComplete}
            onBack={handleBack}
            initialData={quizData.questionnaire}
          />
        )
      case "resume":
        return (
          <ResumeUploadStep
            formData={{ resumeText: quizData.resumeText }}
            updateFormData={(data) => setQuizData((prev) => ({ ...prev, ...data }))}
            onNext={handleResumeComplete}
            onPrev={handleBack}
          />
        )
      case "results":
        return (
          <ComprehensiveResultsStep
            questionnaireData={quizData.questionnaire || {}}
            cvText={quizData.resumeText}
            onBack={handleBack}
            onClose={handleRestart}
          />
        )
      default:
        return <IntroStep onStart={handleStart} />
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 text-sm text-gray-500">Current Step: {currentStep}</div>
      {renderStep()}
    </div>
  )
}
