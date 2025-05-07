"use client"

import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileCheck,
  MessageSquare,
  Shield,
  Star,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import EligibilityQuizController from "@/components/eligibility-quiz-controller"
import SmoothScrollLink from "@/components/smooth-scroll-link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Navigation */}
      <nav className="w-full py-4 bg-white/90 backdrop-blur-sm fixed top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/images/exelita-logo.png" alt="Exelita" width={40} height={40} className="mr-2" />
            <span className="font-bold text-xl text-indigo-950">Exelita</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <SmoothScrollLink href="#features" className="text-gray-700 hover:text-purple-700">
              Features
            </SmoothScrollLink>
            <SmoothScrollLink href="#pricing" className="text-gray-700 hover:text-purple-700">
              Pricing
            </SmoothScrollLink>
            <SmoothScrollLink href="#faq" className="text-gray-700 hover:text-purple-700">
              FAQ
            </SmoothScrollLink>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-indigo-950 to-purple-900 text-white">
        <div className="container mx-auto px-4 pt-28 pb-20 md:pt-40 md:pb-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="flex items-center mb-6"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Build a Winning EB-1 Petition — with AI.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Complete your petition in 2–3 weeks using AI-powered guidance, expert feedback, and attorney-grade
              formatting. No law firm required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <EligibilityQuizController>
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-lg px-8 py-6 rounded-lg"
                >
                  Take Eligibility Quiz
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </EligibilityQuizController>

              <Button
                size="lg"
                className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-lg px-8 py-6 rounded-lg"
                asChild
              >
                <a href="https://forms.office.com/r/KNDUcFg5Vw" target="_blank" rel="noopener noreferrer">
                  Join Our Beta
                </a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-image.jpeg"
                alt="Professional working on EB-1 petition"
                width={800}
                height={600}
                className="rounded-xl object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white text-black p-4 rounded-lg shadow-xl">
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full p-1 mr-2">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold">97% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="w-full bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 mb-6">Trusted by professionals from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Google", "Microsoft", "Stanford", "MIT", "Harvard"].map((company) => (
              <div key={company} className="text-gray-400 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why EB-1 Petitions Are <span className="text-purple-700">Challenging</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
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
                  <h3 className="text-xl font-semibold mb-2">Vague USCIS Criteria</h3>
                  <p className="text-gray-600">
                    Interpreting the "extraordinary ability" requirements is confusing and subjective.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
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
                  <h3 className="text-xl font-semibold mb-2">High Attorney Costs</h3>
                  <p className="text-gray-600">
                    Traditional legal services charge $7,000–$15,000 for EB-1 preparation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
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
                  <h3 className="text-xl font-semibold mb-2">Time-Consuming Writing</h3>
                  <p className="text-gray-600">
                    Crafting compelling evidence and narratives takes months without guidance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
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
                  <h3 className="text-xl font-semibold mb-2">Ineffective Templates</h3>
                  <p className="text-gray-600">
                    Generic templates fail to highlight your unique qualifications effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            The <span className="text-purple-700">Smarter Way</span> to Prepare Your EB-1
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Exelita combines AI technology with immigration expertise to guide you through every step of the petition
            process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <FileCheck className="h-6 w-6 text-purple-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI-Guided Petition Builder</h3>
                    <p className="text-gray-600">
                      Our platform structures your petition exactly how USCIS expects to see it, with AI prompts
                      tailored to your specific achievements.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-purple-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert Review & Attorney Access</h3>
                    <p className="text-gray-600">
                      Get feedback from immigration specialists and optional attorney review to ensure your petition is
                      bulletproof.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-purple-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Recommender Letter Generation</h3>
                    <p className="text-gray-600">
                      AI-powered tools help create compelling recommendation letters that your references can easily
                      review and sign.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-purple-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Real-Time AI Feedback</h3>
                    <p className="text-gray-600">
                      Get instant suggestions to strengthen your petition as you write, highlighting areas that need
                      improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 relative">
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
              <div className="absolute -bottom-6 -left-6 bg-white text-black p-4 rounded-lg shadow-xl">
                <div className="flex items-center">
                  <div className="bg-amber-500 rounded-full p-1 mr-2">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold">2-3 Weeks to Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="w-full py-20 bg-indigo-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Introducing the EB-1 Power Builder</h2>
            <p className="text-xl text-gray-300">
              Everything you need to create a compelling, USCIS-ready petition in just 2-3 weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-900/50 p-8 rounded-xl">
              <div className="bg-amber-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Guidance</h3>
              <p className="text-gray-300">
                Step-by-step prompts tailored to your specific achievements and USCIS criteria.
              </p>
            </div>

            <div className="bg-indigo-900/50 p-8 rounded-xl">
              <div className="bg-amber-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-500"
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
              <h3 className="text-xl font-semibold mb-4">Recommender Letter Generator</h3>
              <p className="text-gray-300">
                Create compelling letters that your references can easily review, edit, and sign.
              </p>
            </div>

            <div className="bg-indigo-900/50 p-8 rounded-xl">
              <div className="bg-amber-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">USCIS-Ready Templates</h3>
              <p className="text-gray-300">
                Attorney-designed templates that follow exactly what USCIS officers expect to see.
              </p>
            </div>

            <div className="bg-indigo-900/50 p-8 rounded-xl">
              <div className="bg-amber-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-500"
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
              <h3 className="text-xl font-semibold mb-4">2-3 Week Completion</h3>
              <p className="text-gray-300">
                Finish your entire petition in weeks, not months, with our structured approach.
              </p>
            </div>

            <div className="bg-indigo-900/50 p-8 rounded-xl">
              <div className="bg-amber-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Feedback</h3>
              <p className="text-gray-300">Get professional review of your petition from immigration specialists.</p>
            </div>

            <div className="bg-indigo-900/50 p-8 rounded-xl">
              <div className="bg-amber-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Legal Review (Pro Max)</h3>
              <p className="text-gray-300">
                Optional attorney review to ensure your petition is legally sound and optimized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            One-time payment. No hidden fees. Choose the plan that fits your needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Essential Plan */}
            <div className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-2">Essential</h3>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold">$299</span>
                <span className="text-gray-500 ml-2">one-time</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>AI petition builder</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Recommender letter generator</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>USCIS-ready templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>PDF export</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Expert review</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Signed recommendation letters</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Attorney review</span>
                </li>
              </ul>

              <Button className="w-full bg-gray-900 hover:bg-gray-800" asChild>
                <a href="https://forms.office.com/r/KNDUcFg5Vw" target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-purple-500 rounded-xl p-8 shadow-lg relative">
              <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg font-medium">
                POPULAR
              </div>

              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold">$799</span>
                <span className="text-gray-500 ml-2">one-time</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>AI petition builder</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Recommender letter generator</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>USCIS-ready templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>PDF export</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>1 expert review</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>2 signed recommendation letters</strong>
                  </span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Attorney review</span>
                </li>
              </ul>

              <Button className="w-full bg-purple-700 hover:bg-purple-800" asChild>
                <a href="https://forms.office.com/r/KNDUcFg5Vw" target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
            </div>

            {/* Pro Max Plan */}
            <div className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-gray-50 to-white">
              <h3 className="text-2xl font-bold mb-2">Pro Max</h3>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold">$1,499</span>
                <span className="text-gray-500 ml-2">one-time</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>AI petition builder</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Recommender letter generator</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>USCIS-ready templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>PDF export</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>2 expert reviews</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>3 signed recommendation letters</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Attorney review & refund guarantee</strong>
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

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Success Stories</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <Image
                    src="/images/testimonial-1.jpeg"
                    alt="Dr. Sarah Chen"
                    width={80}
                    height={80}
                    className="rounded-full object-cover h-20 w-20"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Dr. Sarah Chen</h3>
                  <p className="text-gray-500">Research Scientist</p>
                </div>
              </div>
              <div className="flex mb-4">
                <Star className="h-5 w-5 text-amber-500" />
                <Star className="h-5 w-5 text-amber-500" />
                <Star className="h-5 w-5 text-amber-500" />
                <Star className="h-5 w-5 text-amber-500" />
                <Star className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-gray-700 mb-4">
                "Approved in just 22 days! Exelita made the process so straightforward. The AI guidance helped me
                highlight achievements I wouldn't have thought to include."
              </p>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block text-sm font-medium">
                Approved ✓
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <Image
                    src="/images/testimonial-2.jpeg"
                    alt="Michael Rodriguez"
                    width={80}
                    height={80}
                    className="rounded-full object-cover h-20 w-20"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Michael Rodriguez</h3>
                  <p className="text-gray-500">Tech Founder</p>
                </div>
              </div>
              <div className="flex mb-4">
                <Star className="h-5 w-5 text-amber-500" />
                <Star className="h-5 w-5 text-amber-500" />
                <Star className="h-5 w-5 text-amber-500" />
                <Star className="h-5 w-5 text-amber-500" />
                <Star className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-gray-700 mb-4">
                "Saved me over $10,000 in legal fees. The recommender letter generator was a game-changer—my references
                loved how easy it was to review and sign."
              </p>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block text-sm font-medium">
                Approved ✓
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <Image
                    src="/images/testimonial-3.jpeg"
                    alt="Dr. Priya Sharma"
                    width={80}
                    height={80}
                    className="rounded-full object-cover h-20 w-20"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Dr. Priya Sharma</h3>
                  <p className="text-gray-500">Professor</p>
                </div>
              </div>
              <div className="flex mb-4">
                <Star className="h-5 w-5 text-amber-500" />
                <Star className="h-5 w-5 text-amber-500" />
                <Star className="h-5 w-5 text-amber-500" />
                <Star className="h-5 w-5 text-amber-500" />
                <Star className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-gray-700 mb-4">
                "I was skeptical about using AI for something so important, but the expert review gave me confidence.
                Completed my petition in just 18 days and got approved!"
              </p>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block text-sm font-medium">
                Approved ✓
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3">Is this a lawyer replacement?</h3>
              <p className="text-gray-600">
                No, Exelita is not a substitute for legal advice. We provide tools and guidance to help you prepare your
                own EB-1 petition. For those who want legal oversight, our Pro Max plan includes attorney review to
                ensure your petition is legally sound.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3">Can my recommenders write letters on the platform?</h3>
              <p className="text-gray-600">
                Yes! You can invite your recommenders to the platform where they can review AI-generated drafts based on
                your achievements, make edits, and digitally sign their letters. This makes the process much easier for
                busy professionals.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3">What if I don't qualify for EB-1?</h3>
              <p className="text-gray-600">
                We offer a free eligibility quiz before you start. If our assessment indicates you may not qualify for
                EB-1, we'll suggest alternative visa categories that might be more suitable for your background and
                achievements.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3">How long does the process take?</h3>
              <p className="text-gray-600">
                Most users complete their petitions in 2-3 weeks using our platform. This is significantly faster than
                the typical 3-6 months it takes when working with traditional law firms or doing it yourself without
                guidance.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3">What's included in the expert review?</h3>
              <p className="text-gray-600">
                Our expert reviewers are fellow EB-1 self-petitioners who will analyze your petition for completeness,
                persuasiveness, and alignment with USCIS expectations. They'll provide detailed feedback on how to
                strengthen your case before submission.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-xl font-semibold mb-3">Is there a refund policy?</h3>
              <p className="text-gray-600">
                Yes. We offer a 7-day satisfaction guarantee if you're not happy with our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-20 bg-gradient-to-r from-indigo-950 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Petition the Smarter Way?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Avoid $10,000+ in legal fees. Let AI and experts guide you through your EB-1 petition.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-lg px-8 py-6 rounded-lg"
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
                className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 text-lg px-8 py-6 rounded-lg"
              >
                Take Eligibility Quiz
              </Button>
            </EligibilityQuizController>
          </div>

          <div className="mt-10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-amber-500 mr-2" />
            <span className="text-gray-300">100% Secure Payment | 7-Day Satisfaction Guarantee</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/images/exelita-logo.png" alt="Exelita" width={40} height={40} className="mr-2" />
                <h3 className="text-white font-semibold">Exelita</h3>
              </div>
              <p className="mb-4">AI-powered EB-1 petition builder for extraordinary professionals.</p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/exelita_ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/exelita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <SmoothScrollLink href="#features" className="hover:text-white">
                    Features
                  </SmoothScrollLink>
                </li>
                <li>
                  <SmoothScrollLink href="#pricing" className="hover:text-white">
                    Pricing
                  </SmoothScrollLink>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <SmoothScrollLink href="#faq" className="hover:text-white">
                    FAQ
                  </SmoothScrollLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-first-preference-eb-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    EB-1 Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white"
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector('button[children="Take Eligibility Quiz"]')?.click()
                    }}
                  >
                    Eligibility Quiz
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.uscis.gov/administrative-appeals/aao-decisions/aao-non-precedent-decisions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    AAO Non-Precedent Decisions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="mailto:exelitaai@gmail.com" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© {new Date().getFullYear()} Exelita. All rights reserved.</p>
            <p className="mt-2 text-sm">Exelita is not a law firm and does not provide legal advice.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
