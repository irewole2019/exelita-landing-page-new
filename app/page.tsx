"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronRight, Clock, FileCheck, MessageSquare, Shield, Users, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import EligibilityQuizController from "@/components/eligibility-quiz-controller"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { useState } from "react"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <main id="top" className="flex min-h-screen flex-col items-center">
      {/* Navigation - Improved Mobile */}
      <nav className="w-full py-3 md:py-4 bg-white/95 backdrop-blur-sm fixed top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <SmoothScrollLink href="#top" className="flex items-center">
              <Image
                src="/images/exelita-logo.png"
                alt="Exelita"
                width={32}
                height={32}
                className="mr-2 md:w-10 md:h-10"
              />
              <span className="font-bold text-lg md:text-xl text-indigo-950">Exelita</span>
            </SmoothScrollLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <SmoothScrollLink href="#features" className="text-gray-700 hover:text-purple-700 transition-colors">
              Features
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-3 space-y-3">
              <SmoothScrollLink
                href="#features"
                className="block py-2 text-gray-700 hover:text-purple-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#pricing"
                className="block py-2 text-gray-700 hover:text-purple-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#faq"
                className="block py-2 text-gray-700 hover:text-purple-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </SmoothScrollLink>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Improved Mobile */}
      <section className="w-full bg-gradient-to-r from-indigo-950 to-purple-900 text-white">
        <div className="container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-40 lg:pb-32 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
              Build a Winning EB-1 Petition — with AI.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-200 max-w-2xl mx-auto md:mx-0">
              Complete your petition in 2–3 weeks using AI-powered guidance, expert feedback, and attorney-grade
              formatting. No law firm required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
              <EligibilityQuizController>
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg w-full sm:w-auto"
                >
                  Take Eligibility Quiz
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </EligibilityQuizController>

              <Button
                size="lg"
                className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg w-full sm:w-auto"
                asChild
              >
                <a href="https://forms.office.com/r/KNDUcFg5Vw" target="_blank" rel="noopener noreferrer">
                  Join Our Beta
                </a>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-image.jpeg"
                alt="Professional working on EB-1 petition"
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

      {/* Problem Section - Improved Mobile */}
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 md:mb-16">
            Why EB-1 Petitions Are <span className="text-purple-700">Challenging</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-red-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-red-600"
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
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Vague USCIS Criteria</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Interpreting the "extraordinary ability" requirements is confusing and subjective.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-red-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">High Attorney Costs</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Traditional legal services charge $7,000–$15,000 for EB-1 preparation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-red-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-red-600"
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
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Time-Consuming Writing</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Crafting compelling evidence and narratives takes months without guidance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-red-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-red-600"
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
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Ineffective Templates</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Generic templates fail to highlight your unique qualifications effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Improved Mobile */}
      <section id="features" className="w-full py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6">
            The <span className="text-purple-700">Smarter Way</span> to Prepare Your EB-1
          </h2>
          <p className="text-lg md:text-xl text-center text-gray-600 mb-12 md:mb-16 max-w-3xl mx-auto">
            Exelita combines AI technology with immigration expertise to guide you through every step of the petition
            process.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6 md:space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3 md:mr-4">
                    <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                      <FileCheck className="h-5 w-5 md:h-6 md:w-6 text-purple-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">AI-Guided Petition Builder</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Our platform structures your petition exactly how USCIS expects to see it, with AI prompts
                      tailored to your specific achievements.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-3 md:mr-4">
                    <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                      <Users className="h-5 w-5 md:h-6 md:w-6 text-purple-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">Expert Review & Attorney Access</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Get feedback from immigration specialists and optional attorney review to ensure your petition is
                      bulletproof.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-3 md:mr-4">
                    <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                      <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-purple-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">Recommender Letter Generation</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      AI-powered tools help create compelling recommendation letters that your references can easily
                      review and sign.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-3 md:mr-4">
                    <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                      <Clock className="h-5 w-5 md:h-6 md:w-6 text-purple-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">Real-Time AI Feedback</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Get instant suggestions to strengthen your petition as you write, highlighting areas that need
                      improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/platform-screenshot.jpeg"
                  alt="Exelita Platform Interface"
                  width={800}
                  height={600}
                  className="rounded-xl object-cover h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white text-black p-3 md:p-4 rounded-lg shadow-xl">
                <div className="flex items-center">
                  <div className="bg-amber-500 rounded-full p-1 mr-2">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <span className="font-semibold text-sm md:text-base">2-3 Weeks to Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section - Improved Mobile */}
      <section className="w-full py-16 md:py-20 bg-indigo-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Introducing the EB-1 Power Builder
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              Everything you need to create a compelling, USCIS-ready petition in just 2-3 weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "AI-Powered Guidance",
                description: "Step-by-step prompts tailored to your specific achievements and USCIS criteria.",
              },
              {
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                title: "Recommender Letter Generator",
                description: "Create compelling letters that your references can easily review, edit, and sign.",
              },
              {
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                title: "USCIS-Ready Templates",
                description: "Attorney-designed templates that follow exactly what USCIS officers expect to see.",
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "2-3 Week Completion",
                description: "Finish your entire petition in weeks, not months, with our structured approach.",
              },
              {
                icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
                title: "Expert Feedback",
                description:
                  "Get professional review of your petition from successful self-petitioners and immigration specialists.",
              },
              {
                icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
                title: "Legal Review (Pro Max)",
                description: "Optional attorney review to ensure your petition is legally sound and optimized.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-indigo-900/50 p-6 md:p-8 rounded-xl">
                <div className="bg-amber-500/20 p-3 md:p-4 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">{feature.title}</h3>
                <p className="text-gray-300 text-sm md:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Improved Mobile */}
      <section id="pricing" className="w-full py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl text-center text-gray-600 mb-12 md:mb-16 max-w-3xl mx-auto">
            One-time payment. No hidden fees. Choose the plan that fits your needs.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Essential Plan */}
            <div className="border border-gray-200 rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl md:text-2xl font-bold mb-2">Essential</h3>
              <div className="flex items-end mb-4 md:mb-6">
                <span className="text-3xl md:text-4xl font-bold">$599</span>
                <span className="text-gray-500 ml-2">one-time</span>
              </div>

              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">AI petition builder</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">Recommender letter generator</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">USCIS-ready templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">PDF export</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <X className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">Expert review</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <X className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">Signed recommendation letters</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <X className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">Attorney review</span>
                </li>
              </ul>

              <Button className="w-full bg-gray-900 hover:bg-gray-800" asChild>
                <a href="https://forms.office.com/r/KNDUcFg5Vw" target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-purple-500 rounded-xl p-6 md:p-8 shadow-lg relative">
              <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 md:px-4 py-1 rounded-bl-lg rounded-tr-lg font-medium text-sm">
                POPULAR
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-2">Pro</h3>
              <div className="flex items-end mb-4 md:mb-6">
                <span className="text-3xl md:text-4xl font-bold">$999</span>
                <span className="text-gray-500 ml-2">one-time</span>
              </div>

              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">AI petition builder</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">Recommender letter generator</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">USCIS-ready templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">PDF export</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">
                    <strong>1 expert review</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">
                    <strong>3 signed recommendation letters</strong>
                  </span>
                </li>
                <li className="flex items-start text-gray-400">
                  <X className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">Attorney review</span>
                </li>
              </ul>

              <Button className="w-full bg-purple-700 hover:bg-purple-800" asChild>
                <a href="https://forms.office.com/r/KNDUcFg5Vw" target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
            </div>

            {/* Pro Max Plan */}
            <div className="border border-gray-200 rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-gray-50 to-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">Pro Max</h3>
              <div className="flex items-end mb-4 md:mb-6">
                <span className="text-3xl md:text-4xl font-bold">$1,499</span>
                <span className="text-gray-500 ml-2">one-time</span>
              </div>

              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">AI petition builder</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">Recommender letter generator</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">USCIS-ready templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">PDF export</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">
                    <strong>2 expert reviews</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">
                    <strong>5 signed recommendation letters</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">
                    <strong>Attorney review</strong>
                  </span>
                </li>
              </ul>

              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold" asChild>
                <a href="https://forms.office.com/r/KNDUcFg5Vw" target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Improved Mobile */}
      <section id="faq" className="w-full py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 md:mb-16">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
            {[
              {
                question: "Is this a lawyer replacement?",
                answer:
                  "No, Exelita is not a substitute for legal advice. We provide tools and guidance to help you prepare your own EB-1 petition. For those who want legal oversight, our Pro Max plan includes attorney review to ensure your petition is legally sound.",
              },
              {
                question: "Can my recommenders write letters on the platform?",
                answer:
                  "Yes! You can invite your recommenders to the platform where they can review AI-generated drafts based on your achievements, make edits, and digitally sign their letters. This makes the process much easier for busy professionals.",
              },
              {
                question: "What if I don't qualify for EB-1?",
                answer:
                  "We offer a free eligibility quiz before you start. If our assessment indicates you may not qualify for EB-1, we'll suggest alternative visa categories that might be more suitable for your background and achievements.",
              },
              {
                question: "How long does the process take?",
                answer:
                  "Most users complete their petitions in 2-3 weeks using our platform. This is significantly faster than the typical 3-6 months it takes when working with traditional law firms or doing it yourself without guidance.",
              },
              {
                question: "What's included in the expert review?",
                answer:
                  "Our expert reviewers are fellow EB-1 self-petitioners who will analyze your petition for completeness, persuasiveness, and alignment with USCIS expectations. They'll provide detailed feedback on how to strengthen your case before submission.",
              },
              {
                question: "Is there a refund policy?",
                answer: "Yes. We offer a 7-day satisfaction guarantee if you're not happy with our platform.",
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 md:pb-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{faq.question}</h3>
                <p className="text-gray-600 text-sm md:text-base">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Improved Mobile */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-r from-indigo-950 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            Ready to Build Your Petition the Smarter Way?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-3xl mx-auto">
            Avoid $10,000+ in legal fees. Let AI and experts guide you through your EB-1 petition.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg w-full sm:w-auto"
              asChild
            >
              <a href="https://forms.office.com/r/KNDUcFg5Vw" target="_blank" rel="noopener noreferrer">
                Join Our Beta
              </a>
            </Button>

            <EligibilityQuizController>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-lg w-full sm:w-auto"
              >
                Take Eligibility Quiz
              </Button>
            </EligibilityQuizController>
          </div>

          <div className="mt-8 md:mt-10 flex items-center justify-center">
            <Shield className="h-4 w-4 md:h-5 md:w-5 text-amber-500 mr-2" />
            <span className="text-gray-300 text-sm md:text-base">
              100% Secure Payment | 7-Day Satisfaction Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Footer - Improved Mobile */}
      <footer className="w-full py-8 md:py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-3 md:mb-4">
                <Image
                  src="/images/exelita-logo.png"
                  alt="Exelita"
                  width={32}
                  height={32}
                  className="mr-2 md:w-10 md:h-10"
                />
                <h3 className="text-white font-semibold">Exelita</h3>
              </div>
              <p className="mb-3 md:mb-4 text-sm md:text-base">
                AI-powered EB-1 petition builder for extraordinary professionals.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/exelita_ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/exelita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Product</h3>
              <ul className="space-y-2">
                <li>
                  <SmoothScrollLink
                    href="#features"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    Features
                  </SmoothScrollLink>
                </li>
                <li>
                  <SmoothScrollLink href="#pricing" className="hover:text-white transition-colors text-sm md:text-base">
                    Pricing
                  </SmoothScrollLink>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm md:text-base">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <SmoothScrollLink href="#faq" className="hover:text-white transition-colors text-sm md:text-base">
                    FAQ
                  </SmoothScrollLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-first-preference-eb-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    EB-1 Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm md:text-base">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm md:text-base">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors text-sm md:text-base"
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector('button[children="Take Eligibility Quiz"]')?.click()
                    }}
                  >
                    Eligibility Quiz
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm md:text-base">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:exelitaai@gmail.com"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm md:text-base">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm md:text-base">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
            <p className="text-sm md:text-base">© {new Date().getFullYear()} Exelita. All rights reserved.</p>
            <p className="mt-2 text-xs md:text-sm">Exelita is not a law firm and does not provide legal advice.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
