import type { Metadata } from "next"
import ResumeAnalyzer from "@/components/resume-analyzer"

export const metadata: Metadata = {
  title: "EB-1 Resume Analyzer | Exelita - AI-Powered Visa Petition Builder",
  description:
    "Analyze your resume for EB-1 visa eligibility with our AI-powered tool. Get instant feedback on your qualifications for EB-1A, EB-1B, or EB-1C categories.",
  keywords: "EB-1 resume analyzer, visa eligibility check, immigration resume review, EB-1A EB-1B EB-1C analysis",
}

export default function ResumeAnalyzerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">EB-1 Resume Analyzer</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your resume to get an AI-powered analysis of your EB-1 visa eligibility. Receive personalized
              recommendations to strengthen your petition.
            </p>
          </div>

          <ResumeAnalyzer />
        </div>
      </div>
    </div>
  )
}
