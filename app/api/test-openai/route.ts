import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function GET() {
  try {
    // Test basic OpenAI connection
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: "Say 'OpenAI API is working correctly!' and nothing else.",
      maxTokens: 20,
    })

    return NextResponse.json({
      success: true,
      message: "OpenAI API is working correctly!",
      response: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("OpenAI API test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { testPrompt } = body

    if (!testPrompt) {
      return NextResponse.json({ error: "testPrompt is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: testPrompt,
      maxTokens: 150,
    })

    return NextResponse.json({
      success: true,
      prompt: testPrompt,
      response: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("OpenAI API test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
