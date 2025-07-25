"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"

const mobileCategories = [
  {
    id: "eb1a",
    title: "EB-1A",
    subtitle: "Extraordinary Ability",
    description: "Scientists, artists, business leaders with exceptional achievements",
  },
  {
    id: "eb1b",
    title: "EB-1B",
    subtitle: "Outstanding Researcher",
    description: "Professors and researchers with international recognition",
  },
  {
    id: "eb1c",
    title: "EB-1C",
    subtitle: "Multinational Executive",
    description: "Managers/executives from international companies",
  },
  {
    id: "unsure",
    title: "Not Sure",
    subtitle: "Need Guidance",
    description: "Let AI recommend the best category for you",
  },
]

interface MobileCategoryStepProps {
  onNext: (category: string) => void
  onBack: () => void
  initialCategory?: string
}

export default function MobileCategoryStep({ onNext, onBack, initialCategory }: MobileCategoryStepProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "")
  const [error, setError] = useState("")

  const handleNext = () => {
    if (!selectedCategory) {
      setError("Please select a category")
      return
    }
    onNext(selectedCategory)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Which category fits you?</h3>
        <p className="text-gray-600 text-sm">Select the EB-1 category that best matches your background</p>
      </div>

      <RadioGroup
        value={selectedCategory}
        onValueChange={(value) => {
          setSelectedCategory(value)
          setError("")
        }}
        className="space-y-3"
      >
        {mobileCategories.map((category) => (
          <div key={category.id} className="relative">
            <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value={category.id} id={category.id} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={category.id} className="cursor-pointer">
                  <div className="font-medium text-gray-900 text-sm mb-1">{category.title}</div>
                  <div className="text-xs text-gray-500 mb-1">{category.subtitle}</div>
                  <div className="text-xs text-gray-600">{category.description}</div>
                </Label>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-transparent">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        <Button onClick={handleNext} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
          Continue
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
