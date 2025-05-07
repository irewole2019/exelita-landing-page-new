"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import IntroStep from "./steps/intro-step"
import ResumeUploadStep from "./steps/resume-upload-step"
import CategoryStep from "./steps/category-step"
import QuestionsStep from "./steps/questions-step"
import ResultsStep from "./steps/results-step"
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog"
import { X } from "lucide-react"

export type FormData = {
  resume: File | null
  parsedResumeData: {
    publications: number
    awards: number
    leadership: boolean
    patents: number
    experience: number
  } | null
  suggestedCategory: "EB-1A" | "EB-1B" | "EB-1C" | null
  categoryRationale: string | null
  category: "EB-1A" | "EB-1B" | "EB-1C" | null
  responses: {
    [key: string]: any
  }
}

export default function EligibilityQuiz({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    resume: null,
    parsedResumeData: null,
    suggestedCategory: null,
    categoryRationale: null,
    category: null,
    responses: {},
  })

  const totalSteps = 5
  const progress = (currentStep / (totalSteps - 1)) * 100

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setFormData({
      resume: null,
      parsedResumeData: null,
      suggestedCategory: null,
      categoryRationale: null,
      category: null,
      responses: {},
    })
  }

  // Handle dialog close - reset the quiz state
  const handleClose = () => {
    resetQuiz()
    onClose()
  }

  const steps = [
    { name: "Introduction", component: <IntroStep onNext={nextStep} /> },
    {
      name: "Resume Upload",
      component: (
        <ResumeUploadStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
      ),
    },
    {
      name: "Category Selection",
      component: (
        <CategoryStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
      ),
    },
    {
      name: "Questionnaire",
      component: (
        <QuestionsStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
      ),
    },
    { name: "Results", component: <ResultsStep formData={formData} onReset={resetQuiz} onClose={handleClose} /> },
  ]

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby="quiz-description">
        <div className="relative py-2">
          <div className="flex justify-end mb-2">
            <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <DialogDescription id="quiz-description" className="sr-only">
            EB-1 Visa eligibility assessment quiz. Complete the steps to evaluate your qualification for an EB-1 visa.
          </DialogDescription>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium">
                Step {currentStep + 1} of {totalSteps}
              </h2>
              <span className="text-sm text-gray-500">{steps[currentStep].name}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="py-4">{steps[currentStep].component}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
