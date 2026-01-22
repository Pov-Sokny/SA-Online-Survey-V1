import { NextRequest, NextResponse } from "next/server"

interface AiGenerateRequest {
  prompt: string
  surveyTitle: string
  surveyType: string
  numberOfQuestions: number
  level: "LOW" | "MID" | "ADVANCE"
  provider: "groq" | "google" | "openai"
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AiGenerateRequest

    // Validate required fields
    if (
      !body.prompt ||
      !body.surveyTitle ||
      !body.surveyType ||
      !body.numberOfQuestions ||
      !body.level ||
      !body.provider
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields: prompt, surveyTitle, surveyType, numberOfQuestions, level, provider",
        },
        { status: 400 }
      )
    }

    // Validate numberOfQuestions range
    if (body.numberOfQuestions < 1 || body.numberOfQuestions > 50) {
      return NextResponse.json(
        {
          error: "numberOfQuestions must be between 1 and 50",
        },
        { status: 400 }
      )
    }

    // Validate level
    if (!["LOW", "MID", "ADVANCE"].includes(body.level)) {
      return NextResponse.json(
        {
          error: "level must be one of: LOW, MID, ADVANCE",
        },
        { status: 400 }
      )
    }

    // Validate provider
    if (!["groq", "google", "openai"].includes(body.provider)) {
      return NextResponse.json(
        {
          error: "provider must be one of: groq, google, openai",
        },
        { status: 400 }
      )
    }

    const backendUrl = process.env.BACKEND_API_URL

    if (!backendUrl) {
      return NextResponse.json(
        {
          error: "Backend API URL is not configured",
        },
        { status: 500 }
      )
    }

    console.log("[v0] Forwarding to backend:", `${backendUrl}/api/v1/ai-generate/survey`)

    // Forward request to backend API
    const backendResponse = await fetch(`${backendUrl}/api/v1/ai-generate/survey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}))
      console.error("[v0] Backend error:", errorData)

      return NextResponse.json(
        {
          error: errorData.error || `Backend API error: ${backendResponse.status}`,
          details: errorData.details || {},
        },
        { status: backendResponse.status }
      )
    }

    const data = await backendResponse.json()
    console.log("[v0] Backend response received, questions count:", Array.isArray(data) ? data.length : "unknown")

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("[v0] API Error:", error)

    const errorMessage = error instanceof Error ? error.message : "Internal server error"

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    )
  }
}
