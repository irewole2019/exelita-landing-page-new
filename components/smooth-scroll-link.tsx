"use client"

import type React from "react"

import { useEffect } from "react"
import Link from "next/link"
import { smoothScrollTo } from "@/lib/scroll-utils"

interface SmoothScrollLinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

export default function SmoothScrollLink({ href, className, children }: SmoothScrollLinkProps) {
  useEffect(() => {
    const handleInPageLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (!link) return

      const href = link.getAttribute("href")
      if (!href || !href.startsWith("#")) return

      e.preventDefault()
      const id = href.substring(1)
      smoothScrollTo(id)

      // Update URL without page reload
      window.history.pushState({}, "", href)
    }

    document.addEventListener("click", handleInPageLinkClick)

    return () => {
      document.removeEventListener("click", handleInPageLinkClick)
    }
  }, [])

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}
