declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const trackBetaSignup = (source: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "beta_signup", {
      event_category: "engagement",
      event_label: source,
      value: 1,
    })
  }
}

export const trackPricingView = (plan: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "pricing_view", {
      event_category: "engagement",
      event_label: plan,
      value: 1,
    })
  }
}

export const trackQuizStart = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "quiz_start", {
      event_category: "engagement",
      value: 1,
    })
  }
}

export const trackQuizComplete = (category: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "quiz_complete", {
      event_category: "conversion",
      event_label: category,
      value: 1,
    })
  }
}

export const trackResumeUpload = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "resume_upload", {
      event_category: "engagement",
      event_label: "eligibility_quiz",
      value: 1,
    })
  }
}
