"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { trackQuizStart } from "@/lib/analytics"

export default function IntroStep({ onNext }: { onNext: () => void }) {
  const handleStartQuiz = () => {
    trackQuizStart()
    onNext()
  }

  return (
    <div className="text-center space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Find Out If You Qualify for an EB-1 Visa</h1>

      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Upload your resume and answer a few questions to get a personalized eligibility report powered by AI.
      </p>

      <div className="bg-indigo-50 p-6 rounded-lg max-w-2xl mx-auto">
        <h3 className="font-semibold text-indigo-900 mb-2">How this assessment works:</h3>
        <ul className="text-left text-indigo-800 space-y-2">
          <li className="flex items-start">
            <span className="bg-indigo-200 rounded-full w-5 h-5 flex items-center justify-center text-indigo-800 mr-2 mt-0.5 flex-shrink-0">
              1
            </span>
            <span>Upload your resume or CV (we'll analyze it for EB-1 qualifying factors)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-200 rounded-full w-5 h-5 flex items-center justify-center text-indigo-800 mr-2 mt-0.5 flex-shrink-0">
              2
            </span>
            <span>Select the EB-1 category that best fits your background</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-200 rounded-full w-5 h-5 flex items-center justify-center text-indigo-800 mr-2 mt-0.5 flex-shrink-0">
              3
            </span>
            <span>Answer specific questions about your qualifications</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-200 rounded-full w-5 h-5 flex items-center justify-center text-indigo-800 mr-2 mt-0.5 flex-shrink-0">
              4
            </span>
            <span>Get your personalized eligibility score and feedback</span>
          </li>
        </ul>
      </div>

      <div className="pt-4">
        <Button onClick={handleStartQuiz} size="lg" className="bg-purple-700 hover:bg-purple-800 text-white px-8">
          Start My Assessment
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
