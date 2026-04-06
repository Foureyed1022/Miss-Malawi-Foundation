"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { trackEvent } from "@/lib/analytics"

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    trackEvent({
      name: "page_view",
      source: "app_layout",
      path: pathname,
    })
  }, [pathname])

  return null
}


