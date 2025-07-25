"use client"

import { Button } from "@/components/ui/button"
import { Smartphone, Clock, CheckCircle } from "lucide-react"

interface MobileIntroStepProps {
  onStart: () => void
}

export default function MobileIntroStep({ onStart }: MobileIntroStepProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg">
        <Smartphone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick EB-1 Assessment</h3>
        <p className="text-gray-600 text-sm">
          Get instant AI-powered insights about your EB-1 visa eligibility in just 2 minutes
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-left">
          <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
            <Clock className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900 text-sm">2-Minute Assessment</div>
            <div className="text-gray-600 text-xs">Quick category selection and optional resume upload</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-left">
          <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900 text-sm">Instant Results</div>
            <div className="text-gray-600 text-xs">AI-powered analysis with personalized recommendations</div>
          </div>
        </div>
      </div>

      <Button onClick={onStart} className="w-full bg-purple-600 hover:bg-purple-700 py-3">
        Start Quick Assessment
      </Button>

      <p className="text-xs text-gray-500">No signup required • Results in 2 minutes • Completely free</p>
    </div>
  )
}
