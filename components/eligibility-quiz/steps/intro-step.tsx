"use client"

import { Button } from "@/components/ui/button"
import { Brain, Clock, CheckCircle, ArrowRight } from "lucide-react"

interface IntroStepProps {
  onStart: () => void
}

export default function IntroStep({ onStart }: IntroStepProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl">
        <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-3">EB-1 Eligibility Assessment</h3>
        <p className="text-gray-600 text-lg">
          Get personalized insights about your EB-1 visa eligibility with our AI-powered assessment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="bg-purple-100 p-3 rounded-full mb-3">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">5-Minute Assessment</h4>
          <p className="text-gray-600 text-sm">Quick questionnaire about your background and achievements</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="bg-purple-100 p-3 rounded-full mb-3">
            <Brain className="h-6 w-6 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h4>
          <p className="text-gray-600 text-sm">Advanced AI evaluates your profile against USCIS criteria</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="bg-purple-100 p-3 rounded-full mb-3">
            <CheckCircle className="h-6 w-6 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Personalized Results</h4>
          <p className="text-gray-600 text-sm">Detailed recommendations and next steps for your petition</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-amber-800 text-sm">
          <strong>Completely Free:</strong> No signup required. Get instant results and personalized recommendations.
        </p>
      </div>

      <Button onClick={onStart} size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
        Start Assessment
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  )
}
