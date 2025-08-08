"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Question {
  id: string
  text: string
  type: "radio" | "textarea"
  options?: string[]
  required?: boolean
}

const questions: Question[] = [
  {
    id: "category",
    text: "Which EB-1 category best describes your situation?",
    type: "radio",
    options: [
      "EB-1A: Extraordinary Ability (artists, scientists, business leaders)",
      "EB-1B: Outstanding Professor/Researcher",
      "EB-1C: Multinational Manager/Executive",
      "Not sure - need guidance",
    ],
    required: true,
  },
  {
    id: "field",
    text: "What is your field of expertise?",
    type: "radio",
    options: [
      "Technology/Engineering",
      "Science/Research",
      "Business/Management",
      "Arts/Entertainment",
      "Academia",
      "Healthcare",
      "Other",
    ],
    required: true,
  },
  {
    id: "achievements",
    text: "Describe your most significant professional achievements (awards, publications, patents, leadership roles, etc.)",
    type: "textarea",
    required: true,
  },
  {
    id: "recognition",
    text: "Have you received any major awards, honors, or recognition in your field?",
    type: "radio",
    options: [
      "Yes, international recognition",
      "Yes, national recognition",
      "Yes, industry/professional recognition",
      "Some recognition, but limited",
      "No significant recognition yet",
    ],
    required: true,
  },
  {
    id: "publications",
    text: "Do you have publications, patents, or other documented contributions?",
    type: "radio",
    options: [
      "Yes, highly cited publications/patents",
      "Yes, some publications/patents",
      "Yes, but limited impact",
      "No, but I have other contributions",
      "No publications or patents",
    ],
    required: true,
  },
]

interface QuestionsStepProps {
  onNext: (data: Record<string, string>) => void
  onBack: () => void
  initialData?: Record<string, string>
}

export default function QuestionsStep({ onNext, onBack, initialData = {} }: QuestionsStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [currentQuestion])

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    setErrors((prev) => ({ ...prev, [questionId]: "" }))
  }

  const validateCurrentQuestion = () => {
    const question = questions[currentQuestion]
    if (question.required && !answers[question.id]) {
      setErrors((prev) => ({ ...prev, [question.id]: "This field is required" }))
      return false
    }
    return true
  }

  const handleNext = () => {
    if (!validateCurrentQuestion()) return
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      onNext(answers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    } else {
      onBack()
    }
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2" aria-label="Progress">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Question Counter */}
      <div className="text-sm text-gray-600 text-center">
        Question {currentQuestion + 1} of {questions.length}
      </div>

      {/* Question */}
      <div className="space-y-4">
        <h3 ref={titleRef} tabIndex={-1} className="text-lg font-semibold text-gray-900">
          {question.text}
          {!question.required ? " (Optional)" : ""}
        </h3>

        {question.type === "radio" && question.options && (
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswer(question.id, value)}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`} className="text-base font-normal cursor-pointer flex-1 text-gray-900">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === "textarea" && (
          <Textarea
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder="Please provide details about your achievements..."
            className="min-h-[120px] resize-none text-gray-900"
          />
        )}

        {errors[question.id] && (
          <p className="text-sm text-red-600" role="alert" aria-live="polite">
            {errors[question.id]}
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-2 bg-transparent">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          {currentQuestion === 0 ? "Back" : "Previous"}
        </Button>

        <Button onClick={handleNext} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
          {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
