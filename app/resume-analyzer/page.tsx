import ResumeAnalyzer from "@/components/resume-analyzer"
import SampleResumeLink from "@/components/sample-resume-link"

export default function ResumeAnalyzerPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">EB-1 Resume Analyzer</h1>
      <p className="text-center text-gray-600 mb-4 max-w-2xl mx-auto">
        Paste your resume below to get an instant analysis of your EB-1 eligibility. Our AI will determine the best EB-1
        category for you and extract key information from your resume.
      </p>
      <div className="flex justify-center mb-8">
        <SampleResumeLink />
      </div>
      <ResumeAnalyzer />
    </div>
  )
}
