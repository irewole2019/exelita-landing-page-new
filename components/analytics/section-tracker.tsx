"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { trackSectionView } from "@/lib/analytics"

interface SectionTrackerProps {
  sectionName: string
  children: React.ReactNode
  threshold?: number
}

export default function SectionTracker({ sectionName, children, threshold = 0.5 }: SectionTrackerProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasTracked = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            trackSectionView(sectionName)
            hasTracked.current = true
          }
        })
      },
      { threshold },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [sectionName, threshold])

  return <div ref={sectionRef}>{children}</div>
}
