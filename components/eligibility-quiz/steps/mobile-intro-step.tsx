"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function MobileIntroStep({ onNext }: { onNext: () => void }) {
  const isMobile = useIsMobile()

  return (
    <div className="text-center space-y-6">
      <h1 className={`font-bold text-gray-900 ${isMobile ? "text-2xl" : "text-3xl"}`}>
        Find Out If You Qualify for an EB-1 Visa
      </h1>

      <p className={`text-gray-600 max-w-2xl mx-auto ${isMobile ? "text-base" : "text-lg"}`}>
        Upload your resume and answer a few questions to get a personalized eligibility report powered by AI.
      </p>

      <div className={`bg-indigo-50 rounded-lg max-w-2xl mx-auto ${isMobile ? "p-4" : "p-6"}`}>
        <h3 className={`font-semibold text-indigo-900 mb-3 ${isMobile ? "text-base" : "text-lg"}`}>
          How this assessment works:
        </h3>
        <div className={`text-left text-indigo-800 space-y-3 ${isMobile ? "text-sm" : "text-base"}`}>
          <div className="flex items-start">
            <span className="bg-indigo-200 rounded-full w-6 h-6 flex items-center justify-center text-indigo-800 mr-3 mt-0.5 flex-shrink-0 text-sm font-medium">
              1
            </span>
            <span>Upload your resume or CV (we'll analyze it for EB-1 qualifying factors)</span>
          </div>
          <div className="flex items-start">
            <span className="bg-indigo-200 rounded-full w-6 h-6 flex items-center justify-center text-indigo-800 mr-3 mt-0.5 flex-shrink-0 text-sm font-medium">
              2
            </span>
            <span>Select the EB-1 category that best fits your background</span>
          </div>
          <div className="flex items-start">
            <span className="bg-indigo-200 rounded-full w-6 h-6 flex items-center justify-center text-indigo-800 mr-3 mt-0.5 flex-shrink-0 text-sm font-medium">
              3
            </span>
            <span>Answer specific questions about your qualifications</span>
          </div>
          <div className="flex items-start">
            <span className="bg-indigo-200 rounded-full w-6 h-6 flex items-center justify-center text-indigo-800 mr-3 mt-0.5 flex-shrink-0 text-sm font-medium">
              4
            </span>
            <span>Get your personalized eligibility score and feedback</span>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={onNext}
          size={isMobile ? "default" : "lg"}
          className={`bg-purple-700 hover:bg-purple-800 text-white w-full ${isMobile ? "py-3 text-base" : "px-8"}`}
        >
          Start My Assessment
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
