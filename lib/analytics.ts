// Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

// Google Analytics 4 - Updated with your actual tracking ID
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-8GJ3GGH4VJ"

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = (action: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, parameters)
  }
}

// Custom event tracking functions
export const trackQuizStart = () => {
  event("quiz_start", {
    event_category: "engagement",
    event_label: "eligibility_quiz",
  })
}

export const trackQuizComplete = (score: number, category: string) => {
  event("quiz_complete", {
    event_category: "conversion",
    event_label: "eligibility_quiz",
    custom_parameters: {
      quiz_score: score,
      eb1_category: category,
    },
  })
}

export const trackBetaSignup = (source: string) => {
  event("beta_signup", {
    event_category: "conversion",
    event_label: source,
    value: 1,
  })
}

export const trackPricingView = (plan: string) => {
  event("view_item", {
    event_category: "ecommerce",
    event_label: plan,
    currency: "USD",
    value: plan === "Essential" ? 599 : plan === "Pro" ? 999 : 1499,
  })
}

export const trackResumeUpload = () => {
  event("file_upload", {
    event_category: "engagement",
    event_label: "resume_upload",
  })
}

export const trackSectionView = (section: string) => {
  event("section_view", {
    event_category: "engagement",
    event_label: section,
  })
}

export const trackButtonClick = (button: string, location: string) => {
  event("button_click", {
    event_category: "engagement",
    event_label: button,
    custom_parameters: {
      location: location,
    },
  })
}

export const trackFormSubmission = (form: string) => {
  event("form_submit", {
    event_category: "conversion",
    event_label: form,
  })
}

export const trackDownload = (file: string) => {
  event("file_download", {
    event_category: "engagement",
    event_label: file,
  })
}

export const trackExternalLink = (url: string, source: string) => {
  event("external_link_click", {
    event_category: "engagement",
    event_label: url,
    custom_parameters: {
      source: source,
    },
  })
}
