"use client"

import type React from "react"

import type { ReactNode } from "react"
import { scrollToElement } from "@/lib/scroll-utils"

interface SmoothScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function SmoothScrollLink({ href, children, className, onClick }: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    if (href.startsWith("#")) {
      scrollToElement(href)
    } else {
      window.location.href = href
    }

    if (onClick) {
      onClick()
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
