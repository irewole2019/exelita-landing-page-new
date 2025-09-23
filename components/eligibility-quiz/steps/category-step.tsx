"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Award, BookOpen, Briefcase } from "lucide-react"
import type { FormData } from "../eligibility-quiz"

export default function CategoryStep({
  formData,
  updateFormData,
  onNext,
  onPrev,
}: {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}) {
  const handleCategoryChange = (category: FormData["category"]) => {
    updateFormData({ category })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your EB-1 Category</h2>
        <p className="text-gray-600">Choose the EB-1 visa category that best matches your qualifications</p>
      </div>

      {formData.suggestedCategory && (
        <div className="bg-indigo-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-indigo-800">
            <span className="font-medium">Based on your resume, we suggest exploring: </span>
            {formData.suggestedCategory === "EB-1A" && "EB-1A (Extraordinary Ability)"}
            {formData.suggestedCategory === "EB-1B" && "EB-1B (Outstanding Professor/Researcher)"}
            {formData.suggestedCategory === "EB-1C" && "EB-1C (Multinational Manager/Executive)"}
          </p>
          {formData.categoryRationale && <p className="text-sm text-indigo-700 mt-2">{formData.categoryRationale}</p>}
        </div>
      )}

      <RadioGroup
        value={formData.category || ""}
        onValueChange={(value) => handleCategoryChange(value as FormData["category"])}
        className="space-y-4"
      >
        <div>
          <Card className={`p-6 ${formData.category === "EB-1A" ? "ring-2 ring-purple-500" : ""}`}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <RadioGroupItem value="EB-1A" id="EB-1A" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="EB-1A" className="flex items-center text-lg font-medium cursor-pointer">
                  <Award className="h-5 w-5 mr-2 text-amber-500" />
                  EB-1A: Extraordinary Ability
                </Label>
                <p className="mt-1 text-gray-600">
                  For individuals with extraordinary ability in sciences, arts, education, business, or athletics.
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• National or international acclaim</li>
                  <li>• Recognized achievements (awards, publications, etc.)</li>
                  <li>• High salary or commercial success in your field</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className={`p-6 ${formData.category === "EB-1B" ? "ring-2 ring-purple-500" : ""}`}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <RadioGroupItem value="EB-1B" id="EB-1B" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="EB-1B" className="flex items-center text-lg font-medium cursor-pointer">
                  <BookOpen className="h-5 w-5 mr-2 text-amber-500" />
                  EB-1B: Outstanding Professor/Researcher
                </Label>
                <p className="mt-1 text-gray-600">
                  For professors or researchers who are internationally recognized in their field.
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• At least 3 years of experience in teaching or research</li>
                  <li>• International recognition for outstanding achievements</li>
                  <li>• Job offer from a university, institution, or private company</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className={`p-6 ${formData.category === "EB-1C" ? "ring-2 ring-purple-500" : ""}`}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <RadioGroupItem value="EB-1C" id="EB-1C" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="EB-1C" className="flex items-center text-lg font-medium cursor-pointer">
                  <Briefcase className="h-5 w-5 mr-2 text-amber-500" />
                  EB-1C: Multinational Manager/Executive
                </Label>
                <p className="mt-1 text-gray-600">
                  For executives and managers who have worked for a multinational company.
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• At least 1 year of employment outside the US in the past 3 years</li>
                  <li>• Managerial or executive capacity</li>
                  <li>• Same employer, affiliate, subsidiary, or parent company in the US</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </RadioGroup>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button onClick={onNext} disabled={!formData.category} className="bg-purple-700 hover:bg-purple-800">
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
