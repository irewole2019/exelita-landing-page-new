"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, LinkIcon, Info } from "lucide-react"
import type { FormData } from "../eligibility-quiz"

type Question = {
  id: string
  text: string
  type: "radio" | "text" | "textarea" | "link"
  options?: { value: string; label: string }[]
  required?: boolean
  info?: string
}

const getQuestions = (category: string): Question[] => {
  if (category === "EB-1A") {
    return [
      {
        id: "nationally_recognized_award",
        text: "Have you won a nationally or internationally recognized prize or award for excellence in your field?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
        info: "Examples include: Nobel Prize, Olympic Medal, Academy Award, Pulitzer Prize, or significant awards in your specific field.",
      },
      {
        id: "membership",
        text: "Are you a member of any associations in your field that require outstanding achievements as judged by recognized experts?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "published_material",
        text: "Has there been published material in professional publications or major media about you and your work?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "judge_work",
        text: "Have you judged the work of others in your field, either individually or on a panel?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "original_contributions",
        text: "Have you made original scientific, scholarly, or business-related contributions of major significance in your field?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "authorship",
        text: "Have you authored scholarly articles in professional journals or other major media in your field?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "exhibitions",
        text: "Has your work been displayed at artistic exhibitions or showcases?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not_applicable", label: "Not applicable to my field" },
        ],
        required: true,
      },
      {
        id: "leading_role",
        text: "Have you performed in a leading or critical role for organizations with distinguished reputations?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "high_salary",
        text: "Have you commanded a high salary or significant remuneration compared to others in your field?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "commercial_success",
        text: "Have you achieved commercial success in the performing arts?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not_applicable", label: "Not applicable to my field" },
        ],
        required: true,
      },
      {
        id: "evidence_links",
        text: "If you have any links to evidence supporting your qualifications (optional), please provide them here:",
        type: "link",
        required: false,
      },
    ]
  } else if (category === "EB-1B") {
    return [
      {
        id: "experience",
        text: "Do you have at least 3 years of experience in teaching or research in your academic field?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "job_offer",
        text: "Do you have a job offer from a U.S. university, institution of higher learning, or private company?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "recognition",
        text: "Have you received recognition as outstanding in your field from international organizations or academic institutions?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "publications",
        text: "Have you published scholarly articles in professional journals with international circulation?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "judged_work",
        text: "Have you judged the work of others in your academic field?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "original_research",
        text: "Have you made original scientific or scholarly research contributions to your field?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "authorship",
        text: "Have you authored books or scholarly articles that have been published and widely cited by others?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "research_description",
        text: "Briefly describe your most significant research contribution:",
        type: "textarea",
        required: true,
      },
      {
        id: "evidence_links",
        text: "If you have any links to evidence supporting your qualifications (optional), please provide them here:",
        type: "link",
        required: false,
      },
    ]
  } else if (category === "EB-1C") {
    return [
      {
        id: "employed_abroad",
        text: "Have you been employed outside the US for at least 1 year in the last 3 years by the sponsoring company or a related entity?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "managerial_capacity",
        text: "Were you employed in a managerial or executive capacity during this time?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "us_entity",
        text: "Is the US entity a parent, subsidiary, affiliate, or branch of the foreign employer?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "operating_years",
        text: "Has the US entity been doing business for at least 1 year?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "role_description",
        text: "Briefly describe your managerial or executive role:",
        type: "textarea",
        required: true,
      },
      {
        id: "direct_reports",
        text: "How many employees do/did you supervise?",
        type: "text",
        required: true,
      },
      {
        id: "authority",
        text: "Do you have authority to make significant decisions without requiring approval from higher-level executives?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        required: true,
      },
      {
        id: "evidence_links",
        text: "If you have any links to evidence supporting your qualifications (optional), please provide them here:",
        type: "link",
        required: false,
      },
    ]
  }

  return []
}

export default function QuestionsStep({
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
  const [links, setLinks] = useState<string[]>([""])

  if (!formData.category) {
    return (
      <div className="text-center py-12">
        <p>Please select a category first.</p>
        <Button variant="outline" onClick={onPrev} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  const questions = getQuestions(formData.category)

  const handleInputChange = (id: string, value: any) => {
    updateFormData({
      responses: {
        ...formData.responses,
        [id]: value,
      },
    })
  }

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links]
    newLinks[index] = value
    setLinks(newLinks)

    updateFormData({
      responses: {
        ...formData.responses,
        evidence_links: newLinks.filter((link) => link.trim() !== ""),
      },
    })
  }

  const addLinkField = () => {
    setLinks([...links, ""])
  }

  const isFormValid = () => {
    const requiredQuestions = questions.filter((q) => q.required)
    return requiredQuestions.every(
      (q) =>
        formData.responses[q.id] !== undefined && formData.responses[q.id] !== "" && formData.responses[q.id] !== null,
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">EB-{formData.category?.split("-")[1]} Questionnaire</h2>
        <p className="text-gray-600">Please answer the following questions about your qualifications</p>
      </div>

      <div className="space-y-6">
        {questions.map((question) => (
          <Card key={question.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Label className="text-base font-medium mr-2">{question.text}</Label>
                {question.info && (
                  <div className="group relative">
                    <Info className="h-4 w-4 text-gray-400" />
                    <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-sm rounded p-2 w-64 -top-2 left-6">
                      {question.info}
                    </div>
                  </div>
                )}
              </div>

              {question.type === "radio" && question.options && (
                <RadioGroup
                  value={formData.responses[question.id] || ""}
                  onValueChange={(value) => handleInputChange(question.id, value)}
                  className="space-y-2"
                >
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                      <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === "text" && (
                <Input
                  value={formData.responses[question.id] || ""}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  placeholder="Your answer"
                />
              )}

              {question.type === "textarea" && (
                <Textarea
                  value={formData.responses[question.id] || ""}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  placeholder="Your answer"
                  rows={4}
                />
              )}

              {question.type === "link" && (
                <div className="space-y-3">
                  {links.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <Input
                        value={link}
                        onChange={(e) => handleLinkChange(index, e.target.value)}
                        placeholder="https://example.com/your-evidence"
                        className="flex-grow"
                      />
                    </div>
                  ))}

                  <Button type="button" variant="outline" size="sm" onClick={addLinkField} className="text-sm">
                    + Add Another Link
                  </Button>
                </div>
              )}

              {question.required && <p className="text-sm text-red-500">* Required</p>}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button onClick={onNext} disabled={!isFormValid()} className="bg-purple-700 hover:bg-purple-800">
          See Results
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
