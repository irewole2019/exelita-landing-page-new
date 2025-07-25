"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

interface SampleResumeLinkProps {
  category: "EB-1A" | "EB-1B" | "EB-1C"
  className?: string
}

export default function SampleResumeLink({ category, className }: SampleResumeLinkProps) {
  const handleDownload = () => {
    // In a real implementation, this would download an actual sample resume
    // For now, we'll just show an alert
    alert(`Sample ${category} resume download would start here`)
  }

  const getDescription = () => {
    switch (category) {
      case "EB-1A":
        return "Extraordinary ability professional resume template"
      case "EB-1B":
        return "Outstanding researcher/professor resume template"
      case "EB-1C":
        return "Multinational executive resume template"
      default:
        return "Professional resume template"
    }
  }

  return (
    <Button variant="outline" onClick={handleDownload} className={`flex items-center gap-2 ${className}`}>
      <FileText className="h-4 w-4" />
      <span className="hidden sm:inline">{getDescription()}</span>
      <span className="sm:hidden">Sample {category} Resume</span>
      <Download className="h-4 w-4" />
    </Button>
  )
}
