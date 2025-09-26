"use client"

import type React from "react"
import { useState } from "react"
import SimpleModal from "@/components/simple-modal"
import EnhancedEligibilityQuiz from "@/components/eligibility-quiz/enhanced-eligibility-quiz"

interface EligibilityQuizControllerProps {
  children: React.ReactNode
}

export default function EligibilityQuizController({ children }: EligibilityQuizControllerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Opening quiz modal")
    setIsOpen(true)
  }

  const handleClose = () => {
    console.log("Closing quiz modal")
    setIsOpen(false)
  }

  return (
    <>
      {/* Trigger */}
      <div onClick={handleOpen} className="cursor-pointer">
        {children}
      </div>

      {/* Modal */}
      <SimpleModal isOpen={isOpen} onClose={handleClose} title="Comprehensive EB-1A Eligibility Assessment">
        <EnhancedEligibilityQuiz />
      </SimpleModal>
    </>
  )
}
