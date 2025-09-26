"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface SimpleModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export default function SimpleModal({ isOpen, onClose, children, title }: SimpleModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleId = "simple-modal-title"

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Focus the modal container when opened
  useEffect(() => {
    if (isOpen) {
      containerRef.current?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div
        ref={containerRef}
        className="relative bg-background text-foreground rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[95vh] overflow-hidden outline-none"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 id={titleId} className="text-xl font-semibold">
            {title || "EB-1A Eligibility Assessment"}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
            title="Close"
          >
            <X className="h-4 w-4 text-gray-500" aria-hidden="true" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">{children}</div>
      </div>
    </div>
  )
}
