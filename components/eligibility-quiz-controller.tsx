"use client"

import type React from "react"

import { useState } from "react"
import EligibilityQuiz from "./eligibility-quiz/eligibility-quiz"

export default function EligibilityQuizController({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  const openQuiz = () => setIsOpen(true)
  const closeQuiz = () => setIsOpen(false)

  return (
    <>
      <div onClick={openQuiz}>{children}</div>
      <EligibilityQuiz open={isOpen} onClose={closeQuiz} />
    </>
  )
}
