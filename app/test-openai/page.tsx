import OpenAITestPanel from "@/components/openai-test-panel"

export default function TestOpenAIPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">OpenAI API Test</h1>
          <p className="text-lg text-gray-600">Verify that your OpenAI integration is working properly</p>
        </div>

        <OpenAITestPanel />

        {/* No changes needed in the footer section */}
      </div>
    </div>
  )
}
