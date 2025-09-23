"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import IntroStep from "./steps/mobile-intro-step"
import MobileResumeUploadStep from "./steps/mobile-resume-upload-step"
import MobileCategoryStep from "./steps/mobile-category-step"
import MobileQuestionsStep from "./steps/mobile-questions-step"
import MobileResultsStep from "./steps/mobile-results-step"
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog"
import { X, ChevronLeft } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

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

export default function MobileOptimizedQuiz({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    resume: null,
    parsedResumeData: null,
    suggestedCategory: null,
    categoryRationale: null,
    category: null,
    responses: {},
  })

  const isMobile = useIsMobile()
  const totalSteps = 5
  const progress = (currentStep / (totalSteps - 1)) * 100

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
      // Scroll to top of dialog content on mobile
      if (isMobile) {
        const dialogContent = document.querySelector('[role="dialog"]')
        if (dialogContent) {
          dialogContent.scrollTop = 0
        }
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      if (isMobile) {
        const dialogContent = document.querySelector('[role="dialog"]')
        if (dialogContent) {
          dialogContent.scrollTop = 0
        }
      }
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

  const handleClose = () => {
    resetQuiz()
    onClose()
  }

  const steps = [
    { name: "Start", component: <IntroStep onNext={nextStep} /> },
    {
      name: "Resume",
      component: (
        <MobileResumeUploadStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={nextStep}
          onPrev={prevStep}
        />
      ),
    },
    {
      name: "Category",
      component: (
        <MobileCategoryStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
      ),
    },
    {
      name: "Questions",
      component: (
        <MobileQuestionsStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
      ),
    },
    {
      name: "Results",
      component: <MobileResultsStep formData={formData} onReset={resetQuiz} onClose={handleClose} />,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={`
          ${isMobile ? "w-full h-full max-w-none max-h-none m-0 rounded-none" : "sm:max-w-3xl max-h-[90vh]"}
          overflow-y-auto p-0
        `}
        aria-describedby="quiz-description"
      >
        <div className={`relative ${isMobile ? "min-h-screen" : ""}`}>
          {/* Mobile Header */}
          <div
            className={`
            sticky top-0 z-10 bg-white border-b border-gray-200 
            ${isMobile ? "px-4 py-3" : "px-6 py-4"}
          `}
          >
            <div className="flex items-center justify-between">
              {/* Back button for mobile */}
              {isMobile && currentStep > 0 && (
                <Button variant="ghost" size="sm" onClick={prevStep} className="p-2">
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              )}

              {/* Step indicator */}
              <div className="flex-1 mx-2">
                <div className="flex justify-between items-center mb-2">
                  <h2 className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>
                    Step {currentStep + 1} of {totalSteps}
                  </h2>
                  <span className={`text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}>{steps[currentStep].name}</span>
                </div>
                <Progress value={progress} className={`${isMobile ? "h-1.5" : "h-2"}`} />
              </div>

              {/* Close button */}
              <Button variant="ghost" size="sm" onClick={handleClose} className="p-2">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>

          <DialogDescription id="quiz-description" className="sr-only">
            EB-1 Visa eligibility assessment quiz. Complete the steps to evaluate your qualification for an EB-1 visa.
          </DialogDescription>

          {/* Content */}
          <div className={`${isMobile ? "px-4 py-6" : "px-6 py-8"}`}>{steps[currentStep].component}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
