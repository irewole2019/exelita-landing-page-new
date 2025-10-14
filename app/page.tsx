"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronRight, Clock, FileCheck, MessageSquare, Shield, Users, Menu, X } from "lucide-react"
import Image from "next/image"
import EligibilityQuizController from "@/components/eligibility-quiz-controller"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { useState, useEffect } from "react"
import { trackBetaSignup, trackPricingView } from "@/lib/analytics"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleBetaSignup = (source: string) => {
    trackBetaSignup(source)
  }

  const handlePricingClick = (plan: string) => {
    trackPricingView(plan)
  }

  return (
    <main id="top" className="flex min-h-screen flex-col items-center">
      {/* Navigation - Enhanced Mobile */}
      <nav
        className={`w-full py-3 md:py-4 fixed top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm shadow-sm"
        } border-b border-gray-100`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-14 md:h-16 items-center justify-between">
            <SmoothScrollLink href="#top" className="flex items-center h-full">
              <Image
                src="/images/exelita-logo.png"
                alt="Exelita Logo"
                width={32}
                height={32}
                className="w-7 h-7 md:w-10 md:h-10"
                priority
              />
              <span className="font-bold text-lg md:text-xl text-indigo-950 ml-2">Exelita</span>
            </SmoothScrollLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <SmoothScrollLink
                href="#features"
                className="text-gray-700 hover:text-purple-700 transition-colors font-medium"
              >
                Features
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#pricing"
                className="text-gray-700 hover:text-purple-700 transition-colors font-medium"
              >
                Pricing
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#team"
                className="text-gray-700 hover:text-purple-700 transition-colors font-medium"
              >
                Team
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#faq"
                className="text-gray-700 hover:text-purple-700 transition-colors font-medium"
              >
                FAQ
              </SmoothScrollLink>
              <a
                href="https://app.exelita.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
              >
                Login
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors active:bg-gray-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-in slide-in-from-top duration-300">
            <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <SmoothScrollLink
                href="#features"
                className="block py-3 px-4 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#pricing"
                className="block py-3 px-4 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#team"
                className="block py-3 px-4 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#faq"
                className="block py-3 px-4 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </SmoothScrollLink>

              <div className="pt-2 border-t border-gray-200">
                <a
                  href="https://app.exelita.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-purple-700 hover:bg-purple-800 text-white text-center font-semibold py-3 px-4 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </a>
              </div>

              <div className="pt-2">
                <EligibilityQuizController>
                  <button
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Take Free Quiz
                  </button>
                </EligibilityQuizController>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Sticky Mobile CTA - Enhanced */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl safe-area-inset-bottom">
        <div className="px-4 py-3">
          <EligibilityQuizController>
            <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-4 text-base rounded-lg shadow-md active:scale-98 transition-transform">
              Take Free Eligibility Quiz
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </EligibilityQuizController>
        </div>
      </div>

      {/* Hero Section - Enhanced Mobile */}
      <section className="w-full bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6">
                Build a Winning <span className="text-amber-400 inline-block">EB-1 Visa Petition</span> with AI
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-100 leading-relaxed">
                Complete your <strong className="text-white">EB-1A petition</strong> in 2–3 weeks using AI-powered
                guidance, expert feedback, and attorney-grade formatting. No expensive law firm required.
              </p>
              <div className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto md:mx-0">
                <EligibilityQuizController>
                  <button className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-black font-semibold text-base sm:text-lg px-6 py-4 rounded-lg w-full transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-98">
                    Take Free Eligibility Quiz
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </EligibilityQuizController>

                <a
                  href="https://app.exelita.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleBetaSignup("hero")}
                  className="bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white font-semibold text-base sm:text-lg px-6 py-4 rounded-lg w-full transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-98"
                >
                  Start Your Petition
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-image.jpeg"
                  alt="Professional using Exelita AI platform"
                  width={800}
                  height={600}
                  className="rounded-2xl object-cover w-full h-auto"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Enhanced Mobile */}
      <section className="w-full py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 leading-tight">
            Why <span className="text-purple-700">EB-1 Self-Petitions</span> Are Challenging
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Complex USCIS Criteria",
                description:
                  "Understanding USCIS requirements for extraordinary ability, outstanding researcher, and multinational executive categories is confusing and subjective.",
              },
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Expensive Immigration Lawyers",
                description:
                  "Traditional immigration attorneys charge $7,000–$15,000 for EB-1 petition preparation and filing.",
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Time-Consuming Process",
                description:
                  "Writing compelling petition letters and gathering evidence takes 3-6 months without proper guidance.",
              },
              {
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                title: "Generic Templates Don't Work",
                description:
                  "One-size-fits-all templates fail to highlight your unique qualifications and achievements effectively.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-5 sm:p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-red-100 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section - Enhanced Mobile */}
      <section id="features" className="w-full py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 leading-tight">
            The <span className="text-purple-700">AI-Powered Solution</span> for EB-1 Success
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-center text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Exelita combines artificial intelligence with immigration law expertise to guide you through every step of
            your EB-1 petition process.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Features List */}
            <div className="order-2 lg:order-1">
              <div className="space-y-5 sm:space-y-6 md:space-y-8">
                {[
                  {
                    icon: FileCheck,
                    title: "AI-Guided Petition Builder",
                    description:
                      "Our intelligent platform structures your I-140 petition exactly how USCIS officers expect to see it, with personalized prompts tailored to your specific achievements.",
                  },
                  {
                    icon: Users,
                    title: "Expert Review & Attorney Access",
                    description:
                      "Get professional feedback from successful EB-1 self-petitioners and immigration specialists. Optional attorney review ensures legal compliance.",
                  },
                  {
                    icon: MessageSquare,
                    title: "Smart Recommendation Letter System",
                    description:
                      "Your recommenders access our secure portal to input their credentials. Our AI helps craft compelling letters that effectively support your petition.",
                  },
                  {
                    icon: Clock,
                    title: "Structured Step-by-Step Process",
                    description:
                      "Follow our proven methodology that breaks down complex USCIS requirements into manageable steps, ensuring comprehensive coverage.",
                  },
                ].map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={index} className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <div className="bg-purple-100 p-2.5 sm:p-3 rounded-full">
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-purple-700" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Platform Screenshot */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/platform-screenshot.jpeg"
                  alt="Exelita AI platform interface"
                  width={800}
                  height={600}
                  className="rounded-2xl object-cover w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white text-black p-3 sm:p-4 rounded-xl shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-500 rounded-full p-1.5">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className="font-semibold text-sm sm:text-base">Complete in 2-3 Weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Enhanced Mobile */}
      <section id="pricing" className="w-full py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 leading-tight">
            Affordable EB-1 Petition Plans
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-center text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Save thousands compared to traditional immigration lawyers. One-time payment, no hidden fees, 7-day
            money-back guarantee.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Essential Plan */}
            <div className="border-2 border-gray-200 rounded-2xl p-5 sm:p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:border-gray-300">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Essential</h3>
              <div className="flex items-end mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold">$1,500</span>
                <span className="text-gray-500 ml-2 text-sm sm:text-base">one-time</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Perfect for DIY petitioners with strong qualifications
              </p>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {[
                  "AI-powered petition builder",
                  "2 professional recommendation letters",
                  "USCIS-compliant templates",
                  "Professional PDF export",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://buy.stripe.com/fZu9AMg7w6f0eiq2GI6g802"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handlePricingClick("Essential")
                  handleBetaSignup("pricing-essential")
                }}
                className="block w-full bg-gray-900 hover:bg-gray-800 active:bg-black text-white text-center py-3.5 sm:py-4 px-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg active:scale-98"
              >
                Start Essential Plan
              </a>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-purple-500 rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl relative bg-gradient-to-b from-purple-50 to-white">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm shadow-lg">
                MOST POPULAR
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 mt-2">Pro</h3>
              <div className="flex items-end mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold">$2,000</span>
                <span className="text-gray-500 ml-2 text-sm sm:text-base">one-time</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Best value with expert guidance and support
              </p>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {[
                  "Everything in Essential",
                  "1 expert petition review",
                  "5 professional recommendation letters",
                  "Priority email support",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base leading-relaxed">
                      {i > 0 ? <strong>{item}</strong> : item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="https://buy.stripe.com/9B69AMcVkgTEfmuchi6g803"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handlePricingClick("Pro")
                  handleBetaSignup("pricing-pro")
                }}
                className="block w-full bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white text-center py-3.5 sm:py-4 px-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg active:scale-98"
              >
                Start Pro Plan
              </a>
            </div>

            {/* Premium Plan */}
            <div className="border-2 border-gray-200 rounded-2xl p-5 sm:p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:border-gray-300 bg-gradient-to-b from-gray-50 to-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Premium</h3>
              <div className="flex items-end mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold">$2,500</span>
                <span className="text-gray-500 ml-2 text-sm sm:text-base">one-time</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Complete solution with legal oversight</p>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {[
                  "Everything in Pro",
                  "2 comprehensive expert reviews",
                  "10 recommendation letters",
                  "Licensed attorney review",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base leading-relaxed">
                      {i > 0 ? <strong>{item}</strong> : item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="https://buy.stripe.com/dRm6oA7B0bzkgqygxy6g804"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handlePricingClick("Pro Max")
                  handleBetaSignup("pricing-promax")
                }}
                className="block w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-black text-center py-3.5 sm:py-4 px-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg active:scale-98"
              >
                Start Premium Plan
              </a>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              <strong>Compare to traditional lawyers:</strong> $7,000 - $15,000 + filing fees
            </p>
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600">
                7-day money-back guarantee • Secure payment • No hidden fees
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Enhanced Mobile */}
      <section id="team" className="w-full py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Meet the Founders
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Both EB-1A recipients who understand the challenges firsthand and built Exelita to democratize access to
              successful EB-1 petitions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Irewole 'Wole' Akande",
                title: "CEO — EB-1A recipient",
                subtitle: "Microsoft PM • Inventor • Future Legend",
                image: "/images/wole-new-headshot.png",
                bio: "Microsoft PM shaping Viva Engage's expert-verification engine that will vet Copilot's AI output for 1M+ organizations. Invented Opal, an IoT hygiene device cited by the CDC during COVID-19. Texas Business Hall of Fame 'Future Legend,' Poets & Quants distinguished MBA.",
              },
              {
                name: "Richard Igbiriki",
                title: "CTO — EB-1A recipient",
                subtitle: "Microsoft Architect • AI Founder • Scholar",
                image: "/images/richard-new-headshot.png",
                bio: "Architects OneDrive & SharePoint services safeguarding data for 100M+ users. Former founder of akaani, an AI platform that personalized meal planning with adaptive ML. Special Congressional Recognition, Apple HBCU Scholar, peer-reviewed author with IEEE and ProQuest.",
              },
            ].map((founder, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 sm:mb-6">
                  <Image
                    src={founder.image || "/placeholder.svg"}
                    alt={founder.name}
                    width={160}
                    height={160}
                    className="rounded-full mx-auto object-cover w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 shadow-lg"
                  />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                <div className="text-purple-700 font-semibold mb-1 text-sm sm:text-base">{founder.title}</div>
                <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{founder.subtitle}</div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{founder.bio}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 sm:p-6 md:p-8 max-w-4xl mx-auto">
              <h4 className="font-semibold text-purple-900 mb-2 sm:mb-3 text-base sm:text-lg">
                🎯 Why We Built Exelita
              </h4>
              <p className="text-purple-800 text-sm sm:text-base leading-relaxed">
                "After successfully navigating our own EB-1A petitions, we realized that with the right guidance and
                tools, exceptional professionals shouldn't need to spend $10,000+ on lawyers. Exelita democratizes
                access to the same strategies and expertise that helped us achieve our American dream."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced Mobile */}
      <section id="faq" className="w-full py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 leading-tight">
            Frequently Asked Questions About EB-1 Petitions
          </h2>

          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {[
              {
                question: "Is this a lawyer replacement?",
                answer:
                  "No, Exelita is not a substitute for legal advice. We provide tools and guidance to help you prepare your own EB-1 petition. For those who want legal oversight, our Pro Max plan includes attorney review to ensure your petition is legally sound.",
              },
              {
                question: "How does the recommender portal work?",
                answer:
                  "You'll invite your recommenders to our secure portal where they can input their information and qualifications. Our AI helps them structure their input into compelling recommendation letters that highlight your achievements effectively.",
              },
              {
                question: "How long does the process take?",
                answer:
                  "Most users complete their petitions in 2-3 weeks using our platform. This is significantly faster than the typical 3-6 months it takes when working with traditional law firms.",
              },
              {
                question: "What EB-1 categories do you support?",
                answer:
                  "We currently support EB-1A (Extraordinary Ability). Our AI tailors the petition to your specific category and qualifications.",
              },
              {
                question: "How does the AI analysis work?",
                answer:
                  "Our AI uses OpenAI's model to analyze your resume and qualifications against USCIS criteria. It identifies your strengths, suggests the best EB-1 category, and provides personalized guidance for building your petition.",
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "Yes, we offer a 7-day satisfaction guarantee. If you're not happy with our platform within the first week of purchase, we'll provide a full refund, no questions asked.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced Mobile */}
      <section className="w-full py-12 sm:py-16 md:py-20 bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
            Ready to Build Your Winning EB-1 Petition?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who've saved $10,000+ in legal fees while building stronger petitions with
            AI guidance and expert support.
          </p>

          <div className="flex flex-col gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <a
              href="https://app.exelita.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleBetaSignup("final-cta")}
              className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-black font-semibold text-base sm:text-lg px-6 py-4 rounded-xl w-full transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-98"
            >
              Start Your Petition
            </a>

            <EligibilityQuizController>
              <button className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10 active:bg-amber-500/20 text-base sm:text-lg px-6 py-4 rounded-xl w-full bg-transparent transition-all duration-200 flex items-center justify-center active:scale-98">
                Take Free Eligibility Quiz
              </button>
            </EligibilityQuizController>
          </div>

          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 flex-shrink-0" />
            <span className="text-gray-200 text-xs sm:text-sm">
              Secure Payment • 7-Day Money-Back Guarantee • No Hidden Fees
            </span>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced Mobile */}
      <footer className="w-full py-8 sm:py-10 md:py-12 bg-gray-900 text-gray-400 pb-24 md:pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-3 sm:mb-4">
                <Image
                  src="/images/exelita-logo.png"
                  alt="Exelita Logo"
                  width={32}
                  height={32}
                  className="mr-2 w-8 h-8"
                />
                <h3 className="text-white font-semibold text-base sm:text-lg">Exelita</h3>
              </div>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                AI-powered EB-1 visa petition builder for extraordinary professionals, outstanding researchers, and
                multinational executives.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/exelita_ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                  aria-label="Follow on Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/exelita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                  aria-label="Follow on LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">EB-1 Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.uscis.gov/policy-manual/volume-6-part-f-chapter-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-sm"
                  >
                    EB-1A Extraordinary Ability
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <SmoothScrollLink href="#faq" className="hover:text-white transition-colors text-sm">
                    FAQ
                  </SmoothScrollLink>
                </li>
                <li>
                  <SmoothScrollLink href="#pricing" className="hover:text-white transition-colors text-sm">
                    Pricing
                  </SmoothScrollLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:irewole@exelita.com" className="hover:text-white transition-colors text-sm">
                    irewole@exelita.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://app.exelita.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Get Started
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              © 2025 Exelita. All rights reserved. | Not a law firm. Not a substitute for legal advice.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
