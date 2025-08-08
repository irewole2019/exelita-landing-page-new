"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Info } from 'lucide-react'

const categories = [
  {
    id: "eb1a",
    title: "EB-1A: Extraordinary Ability",
    description: "For individuals with extraordinary ability in sciences, arts, education, business, or athletics",
    examples: "Nobel Prize winners, Olympic athletes, renowned artists, top executives",
  },
  {
    id: "eb1b",
    title: "EB-1B: Outstanding Professor/Researcher",
    description: "For outstanding professors and researchers with international recognition",
    examples: "Tenured professors, research scientists with significant publications",
  },
  {
    id: "eb1c",
    title: "EB-1C: Multinational Manager/Executive",
    description: "For managers/executives transferred from foreign company to US affiliate",
    examples: "International company executives, multinational managers",
  },
  {
    id: "unsure",
    title: "Not Sure - Need Guidance",
    description: "Let our AI help determine the best category for your profile",
    examples: "Get personalized recommendations based on your background",
  },
]

interface CategoryStepProps {
  onNext: (category: string) => void
  onBack: () => void
  initialCategory?: string
}

export default function CategoryStep({ onNext, onBack, initialCategory }: CategoryStepProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "")
  const [error, setError] = useState("")

  const handleNext = () => {
    if (!selectedCategory) {
      setError("Please select a category to continue")
      return
    }
    onNext(selectedCategory)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Which EB-1 category interests you?</h3>
        <p className="text-gray-600">Select the category that best matches your background and goals</p>
      </div>

      <RadioGroup
        value={selectedCategory}
        onValueChange={(value) => {
          setSelectedCategory(value)
          setError("")
        }}
        className="space-y-4"
      >
        {categories.map((category) => (
          <div key={category.id} className="relative">
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value={category.id} id={category.id} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={category.id} className="cursor-pointer">
                  <div className="font-medium text-gray-900 mb-1">{category.title}</div>
                  <div className="text-sm text-gray-600 mb-2">{category.description}</div>
                  <div className="text-sm text-gray-600 flex items-center">
                    <Info className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                    Examples: {category.examples}
                  </div>
                </Label>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>

      {error && (
        <p className="text-sm text-red-600 text-center" role="alert" aria-live="polite">
          {error}
        </p>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-transparent">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>

        <Button onClick={handleNext} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
          Continue
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
