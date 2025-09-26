"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Info, Award, Users, Newspaper, Scale, Lightbulb, BookOpen, Palette, Building, DollarSign, Music } from 'lucide-react'

interface QuestionnaireData {
  profession: string
  currentlyInUS: string
  currentVisa: string
  continueWorking: string
  awards: string
  memberships: string
  media: string
  judging: string
  contributions: string
  publications: string
  exhibitions: string
  leadingRoles: string
  compensation: string
  commercialSuccess: string
}

interface EnhancedQuestionnaireStepProps {
  onNext: (data: QuestionnaireData) => void
  onBack: () => void
  initialData?: Partial<QuestionnaireData>
}

const questions = [
  {
    id: "profession",
    question: "What is your profession or field of extraordinary ability?",
    type: "text",
    placeholder: "e.g., Software Engineering, Biomedical Research, Fine Arts, etc.",
    required: true,
    icon: Building,
  },
  {
    id: "currentlyInUS",
    question: "Are you currently in the U.S.?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
    icon: Building,
  },
  {
    id: "currentVisa",
    question: "What visa are you currently on?",
    type: "radio",
    options: ["H-1B", "F-1", "O-1", "L-1", "J-1", "B-1/B-2", "Other", "Not in the U.S."],
    required: true,
    icon: Building,
  },
  {
    id: "continueWorking",
    question: "Do you intend to continue working in your field in the U.S.?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
    icon: Building,
  },
  {
    id: "awards",
    question: "Have you won any nationally or internationally recognized prizes for excellence in your field?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
    icon: Award,
    helpText:
      "Examples: Nobel Prize, Pulitzer Prize, Olympic medals, national academy awards, major industry recognition",
  },
  {
    id: "memberships",
    question: "Are you a member of associations that require outstanding achievement for membership?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
    icon: Users,
    helpText:
      "Examples: National Academy of Sciences, Fellow of professional societies, exclusive professional organizations",
  },
  {
    id: "media",
    question: "Have you been featured in major media or trade publications about your work?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
    icon: Newspaper,
    helpText:
      "Examples: Articles in major newspapers, magazines, trade publications, or professional media about you and your work",
  },
  {
    id: "judging",
    question: "Have you served as a judge of others' work in your field?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
    icon: Scale,
    helpText: "Examples: Peer reviewer for journals, grant review panels, competition judge, editorial board member",
  },
  {
    id: "contributions",
    question: "Have you made original contributions of major significance to your field?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
    icon: Lightbulb,
    helpText:
      "Examples: Breakthrough research, major innovations, widely adopted methodologies, significant discoveries",
  },
  {
    id: "publications",
    question: "Have you authored scholarly articles in professional journals or major trade publications?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
    icon: BookOpen,
    helpText:
      "Examples: Peer-reviewed journal articles, book chapters, major conference papers, professional publications",
  },
  {
    id: "exhibitions",
    question: "Have your works been displayed at artistic exhibitions or showcases?",
    type: "radio",
    options: ["Yes", "No", "Not Applicable"],
    required: false,
    icon: Palette,
    helpText: "For artists, designers, architects: exhibitions in galleries, museums, or major showcases",
  },
  {
    id: "leadingRoles",
    question: "Have you served in a leading or critical role for organizations with distinguished reputations?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
    icon: Building,
    helpText: "Examples: Executive roles, department head, key leadership positions at well-known organizations",
  },
  {
    id: "compensation",
    question: "Do you command a high salary or remuneration compared to others in your field?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
    icon: DollarSign,
    helpText: "Significantly above average compensation for your field and experience level",
  },
  {
    id: "commercialSuccess",
    question: "Have you achieved commercial success in the performing arts?",
    type: "radio",
    options: ["Yes", "No", "Not Applicable"],
    required: false,
    icon: Music,
    helpText: "For performers, artists: box office success, record sales, ticket sales, commercial achievements",
  },
] as const

export default function EnhancedQuestionnaireStep({
  onNext,
  onBack,
  initialData = {},
}: EnhancedQuestionnaireStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Partial<QuestionnaireData>>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const titleRef = useRef<HTMLHeadingElement>(null)

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    titleRef.current?.focus()
  }, [currentQuestion])

  const handleResponse = (questionId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }))
    setErrors((prev) => ({ ...prev, [questionId]: "" }))
  }

  const validateCurrentQuestion = () => {
    const question = questions[currentQuestion]
    if (question.required && !responses[question.id as keyof QuestionnaireData]) {
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
      onNext(responses as QuestionnaireData)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    } else {
      onBack()
    }
  }

  const IconComponent = currentQ.icon
  const titleText = `${currentQ.question}${currentQ.required ? "" : " (Optional)"}`

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3" aria-label="Progress">
        <div
          className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Question Counter */}
      <div className="text-center">
        <div className="text-sm text-gray-600 mb-1">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="text-xs text-gray-500">{Math.round(progress)}% complete</div>
      </div>

      {/* Question Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
            <IconComponent className="h-6 w-6 text-purple-600" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3
              ref={titleRef}
              tabIndex={-1}
              className="text-xl font-semibold text-gray-900 mb-2"
            >
              {titleText}
            </h3>

            {currentQ.helpText && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <p className="text-blue-800 text-sm">{currentQ.helpText}</p>
                </div>
              </div>
            )}

            {currentQ.type === "text" && (
              <Input
                value={(responses[currentQ.id as keyof QuestionnaireData] as string) || ""}
                onChange={(e) => handleResponse(currentQ.id, e.target.value)}
                placeholder={currentQ.placeholder}
                className="w-full text-base p-4 h-12"
              />
            )}

            {currentQ.type === "radio" && currentQ.options && (
              <RadioGroup
                value={(responses[currentQ.id as keyof QuestionnaireData] as string) || ""}
                onValueChange={(value) => handleResponse(currentQ.id, value)}
                className="space-y-4"
              >
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <RadioGroupItem value={option} id={`${currentQ.id}-${index}`} className="text-purple-600" />
                    <Label
                      htmlFor={`${currentQ.id}-${index}`}
                      className="text-base font-medium cursor-pointer flex-1 text-gray-900"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {errors[currentQ.id] && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="polite">
                <p className="text-sm text-red-700 flex items-center gap-2">
                  <Info className="h-4 w-4" aria-hidden="true" />
                  {errors[currentQ.id]}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-2 bg-transparent px-6 py-3">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          {currentQuestion === 0 ? "Back" : "Previous"}
        </Button>

        <Button onClick={handleNext} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3">
          {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next"}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
