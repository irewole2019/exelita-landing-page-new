"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname,
      })
    }
  }, [pathname])

  return null
}
