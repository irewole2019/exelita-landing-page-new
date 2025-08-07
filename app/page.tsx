"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronRight, Clock, FileCheck, MessageSquare, Shield, Users, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import EligibilityQuizController from "@/components/eligibility-quiz-controller"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { useState } from "react"
import { trackBetaSignup, trackPricingView } from "@/lib/analytics"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleBetaSignup = (source: string) => {
    trackBetaSignup(source)
  }

  const handlePricingClick = (plan: string) => {
    trackPricingView(plan)
  }

  return (
    <main id="top" className="flex min-h-screen flex-col items-center">
      {/* Navigation - Mobile Optimized */}
      <nav className="w-full py-3 md:py-4 bg-white/95 backdrop-blur-sm fixed top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <SmoothScrollLink href="#top" className="flex items-center">
              <Image
                src="/images/exelita-logo.png"
                alt="Exelita - AI-Powered EB-1 Visa Petition Builder"
                width={28}
                height={28}
                className="mr-2 md:w-10 md:h-10"
                priority
              />
              <span className="font-bold text-lg md:text-xl text-indigo-950">Exelita</span>
            </SmoothScrollLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <SmoothScrollLink href="#features" className="text-gray-700 hover:text-purple-700 transition-colors">
              Features
            </SmoothScrollLink>
            <SmoothScrollLink href="#team" className="text-gray-700 hover:text-purple-700 transition-colors">
              Team
            </SmoothScrollLink>
            <SmoothScrollLink href="#pricing" className="text-gray-700 hover:text-purple-700 transition-colors">
              Pricing
            </SmoothScrollLink>
            <SmoothScrollLink href="#faq" className="text-gray-700 hover:text-purple-700 transition-colors">
              FAQ
            </SmoothScrollLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu - Improved */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              <SmoothScrollLink
                href="#features"
                className="block py-3 px-2 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#team"
                className="block py-3 px-2 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#pricing"
                className="block py-3 px-2 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#faq"
                className="block py-3 px-2 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </SmoothScrollLink>

              {/* Mobile CTA in Menu */}
              <div className="pt-3 border-t border-gray-200">
                <EligibilityQuizController>
                  <button
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="px-4 py-3">
          <EligibilityQuizController>
            <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-4 rounded-lg shadow-md">
              Take Free Eligibility Quiz
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </EligibilityQuizController>
        </div>
      </div>

      {/* Hero Section - Mobile Optimized */}
      <section className="w-full bg-gradient-to-r from-indigo-950 to-purple-900 text-white">
        <div className="container mx-auto px-4 pt-20 pb-20 md:pt-28 md:pb-20 lg:pt-40 lg:pb-32 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-10 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6">
              Build a Winning <span className="text-amber-400">EB-1 Visa Petition</span> with AI
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-200 max-w-2xl mx-auto md:mx-0">
              Complete your <strong>EB-1A, EB-1B, or EB-1C petition</strong> in 2–3 weeks using AI-powered guidance,
              expert feedback, and attorney-grade formatting. No expensive law firm required.
            </p>
            <div className="flex flex-col gap-3 justify-center md:justify-start">
              <EligibilityQuizController>
                <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-base md:text-lg px-6 py-4 md:py-6 rounded-lg w-full transition-colors duration-200 flex items-center justify-center">
                  Take Free Eligibility Quiz
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </button>
              </EligibilityQuizController>

              <a
                href="https://forms.office.com/r/KNDUcFg5Vw"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleBetaSignup("hero")}
                className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-base md:text-lg px-6 py-4 md:py-6 rounded-lg w-full transition-colors duration-200 flex items-center justify-center"
              >
                Join Our Beta Program
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-image.jpeg"
                alt="Professional using Exelita AI platform to build EB-1 visa petition"
                width={800}
                height={600}
                className="rounded-xl object-cover h-full w-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Mobile Optimized */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 lg:mb-16">
            Why <span className="text-purple-700">EB-1 Self-Petitions</span> Are Challenging
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-10">
            <div className="bg-gray-50 p-4 md:p-6 lg:p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-3 md:mb-4">
                <div className="bg-red-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">Complex USCIS Criteria</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Understanding{" "}
                    <a
                      href="https://www.uscis.gov/policy-manual/volume-6-part-f-chapter-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-700 hover:underline"
                    >
                      "extraordinary ability"
                    </a>
                    ,{" "}
                    <a
                      href="https://www.uscis.gov/policy-manual/volume-6-part-f-chapter-3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-700 hover:underline"
                    >
                      "outstanding researcher"
                    </a>
                    , and{" "}
                    <a
                      href="https://www.uscis.gov/policy-manual/volume-6-part-f-chapter-4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-700 hover:underline"
                    >
                      "multinational executive"
                    </a>{" "}
                    requirements is confusing and subjective.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 md:p-6 lg:p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-3 md:mb-4">
                <div className="bg-red-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">Expensive Immigration Lawyers</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Traditional immigration attorneys charge $7,000–$15,000 for EB-1 petition preparation and filing.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 md:p-6 lg:p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-3 md:mb-4">
                <div className="bg-red-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">Time-Consuming Process</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Writing compelling petition letters and gathering evidence takes 3-6 months without proper guidance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 md:p-6 lg:p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-3 md:mb-4">
                <div className="bg-red-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">Generic Templates Don't Work</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    One-size-fits-all templates fail to highlight your unique qualifications and achievements
                    effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Mobile Optimized */}
      <section id="features" className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 md:mb-4 lg:mb-6">
            The <span className="text-purple-700">AI-Powered Solution</span> for EB-1 Success
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-center text-gray-600 mb-8 md:mb-12 lg:mb-16 max-w-3xl mx-auto">
            Exelita combines artificial intelligence with immigration law expertise to guide you through every step of
            your EB-1 petition process.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-4 md:space-y-6 lg:space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3 md:mr-4">
                    <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                      <FileCheck className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-purple-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">AI-Guided Petition Builder</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Our intelligent platform structures your I-140 petition exactly how USCIS officers expect to see
                      it, with personalized prompts tailored to your specific achievements and category.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-3 md:mr-4">
                    <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                      <Users className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-purple-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                      Expert Review & Attorney Access
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Get professional feedback from successful EB-1 self-petitioners and immigration specialists.
                      Optional attorney review ensures your petition meets all legal requirements.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-3 md:mr-4">
                    <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                      <MessageSquare className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-purple-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                      Smart Recommendation Letter System
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Your recommenders access our secure portal to input their credentials and relationship details.
                      Our AI helps craft compelling letters that effectively support your petition.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-3 md:mr-4">
                    <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                      <Clock className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-purple-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                      Structured Step-by-Step Process
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Follow our proven methodology that breaks down complex USCIS requirements into manageable steps,
                      ensuring you address every criterion comprehensively.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/platform-screenshot.jpeg"
                  alt="Exelita AI platform interface showing EB-1 petition builder dashboard"
                  width={800}
                  height={600}
                  className="rounded-xl object-cover h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 lg:-bottom-6 lg:-left-6 bg-white text-black p-2 md:p-3 lg:p-4 rounded-lg shadow-xl">
                <div className="flex items-center">
                  <div className="bg-amber-500 rounded-full p-1 mr-2">
                    <Clock className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-white" />
                  </div>
                  <span className="font-semibold text-xs md:text-sm lg:text-base">Complete in 2-3 Weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founders Section - Mobile Optimized */}
      <section id="team" className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Meet the Founders
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Both EB-1A recipients who understand the challenges firsthand and built Exelita to democratize access to
              successful EB-1 petitions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Wole Akande */}
            <div className="bg-gray-50 rounded-xl p-4 md:p-6 lg:p-8 text-center">
              <div className="mb-4 md:mb-6">
                <Image
                  src="/images/wole-new-headshot.png"
                  alt="Irewole 'Wole' Akande, CEO and EB-1A recipient"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto object-cover w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Irewole "Wole" Akande</h3>
                <div className="text-purple-700 font-semibold mb-1 text-sm md:text-base">CEO — EB-1A recipient</div>
                <div className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                  Microsoft PM • Inventor • Future Legend
                </div>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  Microsoft PM shaping Viva Engage's expert-verification engine that will vet Copilot's AI output for
                  1M+ organizations. Invented Opal, an IoT hygiene device cited by the CDC during COVID-19. Texas
                  Business Hall of Fame "Future Legend," Poets & Quants distinguished MBA.
                </p>
              </div>
            </div>

            {/* Richard Igbiriki */}
            <div className="bg-gray-50 rounded-xl p-4 md:p-6 lg:p-8 text-center">
              <div className="mb-4 md:mb-6">
                <Image
                  src="/images/richard-new-headshot.png"
                  alt="Richard Igbiriki, CTO and EB-1A recipient"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto object-cover w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Richard Igbiriki</h3>
                <div className="text-purple-700 font-semibold mb-1 text-sm md:text-base">CTO — EB-1A recipient</div>
                <div className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                  Microsoft Architect • AI Founder • Scholar
                </div>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  Architects OneDrive & SharePoint services safeguarding data for 100M+ users. Former founder of akaani,
                  an AI platform that personalized meal planning with adaptive ML. Special Congressional Recognition,
                  Apple HBCU Scholar, peer-reviewed author with IEEE and ProQuest.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 md:p-6 max-w-4xl mx-auto">
              <h4 className="font-semibold text-purple-900 mb-2 md:mb-3 text-sm md:text-base">
                🎯 Why We Built Exelita
              </h4>
              <p className="text-purple-800 text-xs sm:text-sm md:text-base">
                "After successfully navigating our own EB-1A petitions, we realized that with the right guidance and
                tools, exceptional professionals shouldn't need to spend $10,000+ on lawyers. Exelita democratizes
                access to the same strategies and expertise that helped us achieve our American dream."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Mobile Optimized */}
      <section id="pricing" className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 md:mb-4 lg:mb-6">
            Affordable EB-1 Petition Plans
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-center text-gray-600 mb-8 md:mb-12 lg:mb-16 max-w-3xl mx-auto">
            Save thousands compared to traditional immigration lawyers. One-time payment, no hidden fees, 7-day
            money-back guarantee.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Essential Plan */}
            <div className="border border-gray-200 rounded-xl p-4 md:p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">Essential</h3>
              <div className="flex items-end mb-3 md:mb-4 lg:mb-6">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold">$1500</span>
                <span className="text-gray-500 ml-2 text-sm md:text-base">one-time</span>
              </div>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                Perfect for DIY petitioners with strong qualifications
              </p>

              <ul className="space-y-2 md:space-y-3 lg:space-y-4 mb-4 md:mb-6 lg:mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm lg:text-base">AI-powered petition builder</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm lg:text-base">2 professional recommendation letters   </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm lg:text-base">USCIS-compliant templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm lg:text-base">Professional PDF export</span>
                </li>
              </ul>

              <a
                href="https://forms.office.com/r/KNDUcFg5Vw"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handlePricingClick("Essential")
                  handleBetaSignup("pricing-essential")
                }}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center text-sm md:text-base"
              >
                Start Essential Plan
              </a>
            </div>

            {/* Pro Plan - Most Popular */}
            <div className="border-2 border-purple-500 rounded-xl p-4 md:p-6 lg:p-8 shadow-lg relative">
              <div className="absolute top-0 right-0 bg-purple-500 text-white px-2 md:px-3 lg:px-4 py-1 rounded-bl-lg rounded-tr-lg font-medium text-xs md:text-sm">
                MOST POPULAR
              </div>

              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">Pro</h3>
              <div className="flex items-end mb-3 md:mb-4 lg:mb-6">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold">$2000</span>
                <span className="text-gray-500 ml-2 text-sm md:text-base">one-time</span>
              </div>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                Best value with expert guidance and support
              </p>

              <ul className="space-y-2 md:space-y-3 lg:space-y-4 mb-4 md:mb-6 lg:mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm lg:text-base">Everything in Essential</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm lg:text-base">
                    <strong>1 expert petition review</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm lg:text-base">
                    <strong>  5 professional recommendation letters</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm lg:text-base">Priority email support</span>
                </li>
              </ul>

              <a
                href="https://forms.office.com/r/KNDUcFg5Vw"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handlePricingClick("Pro")
                  handleBetaSignup("pricing-pro")
                }}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center text-sm md:text-base"
              >
                Start Pro Plan
              </a>
            </div>

            {/* Pro Max Plan */}
            <div className="border border-gray-200 rounded-xl p-4 md:p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-gray-50 to-white">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">Pro Max</h3>
              <div className="flex items-end mb-3 md:mb-4 lg:mb-6">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold">$2,500</span>
                <span className="text-gray-500 ml-2 text-sm md:text-base">one-time</span>
              </div>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">Complete solution with legal oversight</p>

              <ul className="space-y-2 md:space-y-3 lg:space-y-4 mb-4 md:mb-6 lg:mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm lg:text-base">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm lg:text-base">
                    <strong>2 comprehensive expert reviews</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm lg:text-base">
                    <strong>10 recommendation letters</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm lg:text-base">
                    <strong>Licensed attorney review</strong>
                  </span>
                </li>
              </ul>

              <a
                href="https://forms.office.com/r/KNDUcFg5Vw"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handlePricingClick("Pro Max")
                  handleBetaSignup("pricing-promax")
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center text-sm md:text-base"
              >
                Start Pro Max Plan
              </a>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
              <strong>Compare to traditional lawyers:</strong> $7,000 - $15,000 + filing fees
            </p>
            <div className="flex items-center justify-center">
              <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2" />
              <span className="text-xs md:text-sm text-gray-600">
                7-day money-back guarantee • Secure payment • No hidden fees
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Mobile Optimized */}
      <section id="faq" className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 lg:mb-16">
            Frequently Asked Questions About EB-1 Petitions
          </h2>

          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6 lg:space-y-8">
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
                  "We support all three EB-1 categories: EB-1A (Extraordinary Ability), EB-1B (Outstanding Professor/Researcher), and EB-1C (Multinational Manager/Executive). Our AI tailors the petition to your specific category and qualifications.",
              },
              {
                question: "How does the AI analysis work?",
                answer:
                  "Our AI uses OpenAI's GPT-4 model to analyze your resume and qualifications against USCIS criteria. It identifies your strengths, suggests the best EB-1 category, and provides personalized guidance for building your petition.",
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "Yes, we offer a 7-day satisfaction guarantee. If you're not happy with our platform within the first week of purchase, we'll provide a full refund, no questions asked.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3 text-gray-900">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Mobile Optimized */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-indigo-950 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 lg:mb-6">
            Ready to Build Your Winning EB-1 Petition?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto">
            Join thousands of professionals who've saved $10,000+ in legal fees while building stronger petitions with
            AI guidance and expert support.
          </p>

          <div className="flex flex-col gap-3 md:gap-4 justify-center max-w-md mx-auto">
            <a
              href="https://forms.office.com/r/KNDUcFg5Vw"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleBetaSignup("final-cta")}
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-base md:text-lg px-6 py-4 md:py-6 rounded-lg w-full transition-colors duration-200 flex items-center justify-center"
            >
              Start Your EB-1 Petition Today
            </a>

            <EligibilityQuizController>
              <button className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 text-base md:text-lg px-6 py-4 md:py-6 rounded-lg w-full bg-transparent transition-colors duration-200 flex items-center justify-center">
                Take Free Eligibility Quiz
              </button>
            </EligibilityQuizController>
          </div>

          <div className="mt-6 md:mt-8 lg:mt-10 flex items-center justify-center">
            <Shield className="h-4 w-4 md:h-5 md:w-5 text-amber-500 mr-2" />
            <span className="text-gray-300 text-xs md:text-sm lg:text-base">
              Secure Payment • 7-Day Money-Back Guarantee • No Hidden Fees
            </span>
          </div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="w-full py-6 md:py-8 lg:py-12 bg-gray-900 text-gray-400 pb-20 md:pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            <div className="md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-2 md:mb-3 lg:mb-4">
                <Image
                  src="/images/exelita-logo.png"
                  alt="Exelita Logo"
                  width={24}
                  height={24}
                  className="mr-2 md:w-8 md:h-8 lg:w-10 lg:h-10"
                />
                <h3 className="text-white font-semibold text-sm md:text-base">Exelita</h3>
              </div>
              <p className="mb-2 md:mb-3 lg:mb-4 text-xs md:text-sm lg:text-base">
                AI-powered EB-1 visa petition builder for extraordinary professionals, outstanding researchers, and
                multinational executives.
              </p>
              <div className="flex space-x-3 md:space-x-4">
                <a
                  href="https://www.instagram.com/exelita_ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Follow Exelita on Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5"
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
                  className="hover:text-white transition-colors"
                  aria-label="Follow Exelita on LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2 md:mb-3 lg:mb-4 text-sm md:text-base">EB-1 Categories</h3>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <a
                    href="https://www.uscis.gov/policy-manual/volume-6-part-f-chapter-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-xs md:text-sm lg:text-base"
                  >
                    EB-1A Extraordinary Ability
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.uscis.gov/policy-manual/volume-6-part-f-chapter-3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-xs md:text-sm lg:text-base"
                  >
                    EB-1B Outstanding Researcher
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.uscis.gov/policy-manual/volume-6-part-f-chapter-4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-xs md:text-sm lg:text-base"
                  >
                    EB-1C Multinational Executive
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2 md:mb-3 lg:mb-4 text-sm md:text-base">Resources</h3>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <Link
                    href="/resume-analyzer"
                    className="hover:text-white transition-colors text-xs md:text-sm lg:text-base"
                  >
                    Resume Analyzer
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="hover:text-white transition-colors text-xs md:text-sm lg:text-base">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white transition-colors text-xs md:text-sm lg:text-base">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2 md:mb-3 lg:mb-4 text-sm md:text-base">Contact</h3>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <a
                    href="mailto:irewole@exelita.com"
                    className="hover:text-white transition-colors text-xs md:text-sm lg:text-base"
                  >
                    irewole@exelita.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://forms.office.com/r/KNDUcFg5Vw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-xs md:text-sm lg:text-base"
                  >
                    Join Beta Program
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
            <p className="text-xs md:text-sm text-gray-500">
              © 2024 Exelita. All rights reserved. | Not a law firm. Not a substitute for legal advice.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
