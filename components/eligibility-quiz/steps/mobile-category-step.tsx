"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Award, BookOpen, Briefcase } from "lucide-react"
import type { FormData } from "../mobile-optimized-quiz"
import { useIsMobile } from "@/hooks/use-mobile"

export default function MobileCategoryStep({
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
  const isMobile = useIsMobile()

  const handleCategoryChange = (category: FormData["category"]) => {
    updateFormData({ category })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className={`font-bold text-gray-900 mb-2 ${isMobile ? "text-xl" : "text-2xl"}`}>
          Select Your EB-1 Category
        </h2>
        <p className={`text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}>
          Choose the EB-1 visa category that best matches your qualifications
        </p>
      </div>

      {formData.suggestedCategory && (
        <div className={`bg-indigo-50 rounded-lg mb-6 ${isMobile ? "p-3" : "p-4"}`}>
          <p className={`text-indigo-800 ${isMobile ? "text-sm" : "text-base"}`}>
            <span className="font-medium">Based on your resume, we suggest exploring: </span>
            {formData.suggestedCategory === "EB-1A" && "EB-1A (Extraordinary Ability)"}
            {formData.suggestedCategory === "EB-1B" && "EB-1B (Outstanding Professor/Researcher)"}
            {formData.suggestedCategory === "EB-1C" && "EB-1C (Multinational Manager/Executive)"}
          </p>
          {formData.categoryRationale && (
            <p className={`text-indigo-700 mt-2 ${isMobile ? "text-xs" : "text-sm"}`}>{formData.categoryRationale}</p>
          )}
        </div>
      )}

      <RadioGroup
        value={formData.category || ""}
        onValueChange={(value) => handleCategoryChange(value as FormData["category"])}
        className="space-y-4"
      >
        {/* EB-1A Option */}
        <div>
          <Card
            className={`
              ${formData.category === "EB-1A" ? "ring-2 ring-purple-500 bg-purple-50" : ""}
              ${isMobile ? "p-4" : "p-6"}
              cursor-pointer transition-all duration-200
            `}
            onClick={() => handleCategoryChange("EB-1A")}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <RadioGroupItem value="EB-1A" id="EB-1A" />
              </div>
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="EB-1A"
                  className={`flex items-center font-medium cursor-pointer ${isMobile ? "text-base" : "text-lg"}`}
                >
                  <Award className={`text-amber-500 mr-2 ${isMobile ? "h-4 w-4" : "h-5 w-5"}`} />
                  EB-1A: Extraordinary Ability
                </Label>
                <p className={`mt-1 text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}>
                  For individuals with extraordinary ability in sciences, arts, education, business, or athletics.
                </p>
                <ul className={`mt-2 space-y-1 text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>
                  <li>• National or international acclaim</li>
                  <li>• Recognized achievements (awards, publications, etc.)</li>
                  <li>• High salary or commercial success in your field</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* EB-1B Option */}
        <div>
          <Card
            className={`
              ${formData.category === "EB-1B" ? "ring-2 ring-purple-500 bg-purple-50" : ""}
              ${isMobile ? "p-4" : "p-6"}
              cursor-pointer transition-all duration-200
            `}
            onClick={() => handleCategoryChange("EB-1B")}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <RadioGroupItem value="EB-1B" id="EB-1B" />
              </div>
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="EB-1B"
                  className={`flex items-center font-medium cursor-pointer ${isMobile ? "text-base" : "text-lg"}`}
                >
                  <BookOpen className={`text-amber-500 mr-2 ${isMobile ? "h-4 w-4" : "h-5 w-5"}`} />
                  EB-1B: Outstanding Professor/Researcher
                </Label>
                <p className={`mt-1 text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}>
                  For professors or researchers who are internationally recognized in their field.
                </p>
                <ul className={`mt-2 space-y-1 text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>
                  <li>• At least 3 years of experience in teaching or research</li>
                  <li>• International recognition for outstanding achievements</li>
                  <li>• Job offer from a university, institution, or private company</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* EB-1C Option */}
        <div>
          <Card
            className={`
              ${formData.category === "EB-1C" ? "ring-2 ring-purple-500 bg-purple-50" : ""}
              ${isMobile ? "p-4" : "p-6"}
              cursor-pointer transition-all duration-200
            `}
            onClick={() => handleCategoryChange("EB-1C")}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <RadioGroupItem value="EB-1C" id="EB-1C" />
              </div>
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="EB-1C"
                  className={`flex items-center font-medium cursor-pointer ${isMobile ? "text-base" : "text-lg"}`}
                >
                  <Briefcase className={`text-amber-500 mr-2 ${isMobile ? "h-4 w-4" : "h-5 w-5"}`} />
                  EB-1C: Multinational Manager/Executive
                </Label>
                <p className={`mt-1 text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}>
                  For executives and managers who have worked for a multinational company.
                </p>
                <ul className={`mt-2 space-y-1 text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>
                  <li>• At least 1 year of employment outside the US in the past 3 years</li>
                  <li>• Managerial or executive capacity</li>
                  <li>• Same employer, affiliate, subsidiary, or parent company in the US</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </RadioGroup>

      {/* Mobile Navigation */}
      <div className={`flex gap-3 pt-6 ${isMobile ? "flex-col" : "flex-row justify-between"}`}>
        {!isMobile && (
          <Button variant="outline" onClick={onPrev}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}

        <Button
          onClick={onNext}
          disabled={!formData.category}
          className={`bg-purple-700 hover:bg-purple-800 ${isMobile ? "w-full py-3" : ""}`}
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
