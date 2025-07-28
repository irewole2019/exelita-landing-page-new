"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Loader2, Zap } from "lucide-react"

export default function OpenAITestPanel() {
  const [isTestingBasic, setIsTestingBasic] = useState(false)
  const [isTestingCustom, setIsTestingCustom] = useState(false)
  const [basicResult, setBasicResult] = useState<any>(null)
  const [customResult, setCustomResult] = useState<any>(null)
  const [customPrompt, setCustomPrompt] = useState("Explain what EB-1 visa is in one sentence.")

  const testBasicConnection = async () => {
    setIsTestingBasic(true)
    setBasicResult(null)

    try {
      const response = await fetch("/api/test-openai")
      const data = await response.json()
      setBasicResult(data)
    } catch (error) {
      setBasicResult({
        success: false,
        error: "Network error: " + (error instanceof Error ? error.message : "Unknown error"),
      })
    } finally {
      setIsTestingBasic(false)
    }
  }

  const testCustomPrompt = async () => {
    if (!customPrompt.trim()) return

    setIsTestingCustom(true)
    setCustomResult(null)

    try {
      const response = await fetch("/api/test-openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ testPrompt: customPrompt }),
      })
      const data = await response.json()
      setCustomResult(data)
    } catch (error) {
      setCustomResult({
        success: false,
        error: "Network error: " + (error instanceof Error ? error.message : "Unknown error"),
      })
    } finally {
      setIsTestingCustom(false)
    }
  }

  const ResultDisplay = ({ result, title }: { result: any; title: string }) => {
    if (!result) return null

    return (
      <Card className="p-4 mt-4">
        <div className="flex items-center gap-2 mb-3">
          {result.success ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          <h4 className="font-semibold">{title}</h4>
        </div>

        {result.success ? (
          <div className="space-y-2">
            <div className="bg-green-50 p-3 rounded-md">
              <p className="text-green-800 font-medium">✅ Success!</p>
              <p className="text-green-700 text-sm mt-1">{result.response}</p>
            </div>
            {result.timestamp && (
              <p className="text-xs text-gray-500">Tested at: {new Date(result.timestamp).toLocaleString()}</p>
            )}
          </div>
        ) : (
          <div className="bg-red-50 p-3 rounded-md">
            <p className="text-red-800 font-medium">❌ Error</p>
            <p className="text-red-700 text-sm mt-1">{result.error}</p>
            {result.timestamp && (
              <p className="text-xs text-gray-500 mt-2">Failed at: {new Date(result.timestamp).toLocaleString()}</p>
            )}
          </div>
        )}
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Zap className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">OpenAI API Test Panel</h1>
        </div>
        <p className="text-gray-600">Test your OpenAI integration to ensure everything is working properly</p>
      </div>

      {/* Basic Connection Test */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Connection Test</h2>
        <p className="text-gray-600 mb-4">
          This test verifies that your OpenAI API key is valid and the connection is working.
        </p>

        <Button onClick={testBasicConnection} disabled={isTestingBasic} className="bg-purple-600 hover:bg-purple-700">
          {isTestingBasic ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing Connection...
            </>
          ) : (
            "Test Basic Connection"
          )}
        </Button>

        <ResultDisplay result={basicResult} title="Basic Connection Result" />
      </Card>

      {/* Custom Prompt Test */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Custom Prompt Test</h2>
        <p className="text-gray-600 mb-4">Test with your own prompt to see how the AI responds.</p>

        <div className="space-y-4">
          <Textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Enter your test prompt here..."
            className="min-h-[100px]"
          />

          <Button
            onClick={testCustomPrompt}
            disabled={isTestingCustom || !customPrompt.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isTestingCustom ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Custom Prompt...
              </>
            ) : (
              "Test Custom Prompt"
            )}
          </Button>
        </div>

        <ResultDisplay result={customResult} title="Custom Prompt Result" />
      </Card>

      {/* API Status Summary */}
      <Card className="p-6 bg-blue-50">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">API Status Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            {basicResult?.success ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : basicResult?.success === false ? (
              <XCircle className="h-5 w-5 text-red-500" />
            ) : (
              <div className="h-5 w-5 bg-gray-300 rounded-full" />
            )}
            <span className="text-blue-800">Basic Connection</span>
          </div>

          <div className="flex items-center gap-2">
            {customResult?.success ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : customResult?.success === false ? (
              <XCircle className="h-5 w-5 text-red-500" />
            ) : (
              <div className="h-5 w-5 bg-gray-300 rounded-full" />
            )}
            <span className="text-blue-800">Custom Prompts</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
