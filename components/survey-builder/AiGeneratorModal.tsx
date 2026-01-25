"use client"

import { useState } from "react"
import { Loader2, Zap } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { BuilderQuestion } from "@/lib/types/survey-type"

interface AiGenerateModalProps {
  surveyTitle: string
  onQuestionsGenerated: (questions: BuilderQuestion[]) => void
}

const SURVEY_TYPES = [
  { value: "single_choice", label: "Single Choice" },
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "text", label: "Short Text" },
  { value: "long_text", label: "Long Text" },
  { value: "rating", label: "Rating" },
  { value: "nps", label: "NPS" },
]

const PROVIDERS = [
  { value: "groq", label: "Groq (Fast)" },
  { value: "google", label: "Google" },
  { value: "openai", label: "OpenAI" },
]

const DIFFICULTY_LEVELS = [
  { value: "LOW", label: "Basic" },
  { value: "MID", label: "Intermediate" },
  { value: "ADVANCE", label: "Advanced" },
]

export function AiGenerateModal({
  surveyTitle,
  onQuestionsGenerated,
}: AiGenerateModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [surveyType, setSurveyType] = useState("single_choice")
  const [numberOfQuestions, setNumberOfQuestions] = useState("5")
  const [level, setLevel] = useState("ADVANCE")
  const [provider, setProvider] = useState("groq")

  const handleGenerate = async () => {
    setError(null)

    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    if (!surveyTitle) {
      setError("Survey title is missing")
      return
    }

    setLoading(true)
    try {
      const backendUrl = 'https://sa-api.supersurvey.live'

      if (!backendUrl) {
        throw new Error("Backend API URL not configured. Please set NEXT_PUBLIC_BACKEND_API_URL environment variable.")
      }

      console.log("[v0] Calling backend at:", `${backendUrl}/api/v1/ai-generate/survey`)

      const response = await fetch(`${backendUrl}/api/v1/ai-generate/survey`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          prompt: prompt.trim(),
          surveyTitle: surveyTitle.trim(),
          surveyType,
          numberOfQuestions: parseInt(numberOfQuestions),
          level,
          provider,
        }),
      })

      if (!response.ok) {
        let errorMessage = "Failed to generate questions"
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          errorMessage = `Server error: ${response.status}`
        }
        throw new Error(errorMessage)
      }

      const generatedData = await response.json()
      console.log("[v0] Generated data:", generatedData)

      // Handle both array and object response formats
      const questionsArray = Array.isArray(generatedData)
        ? generatedData
        : generatedData?.questions || generatedData?.data || []

      // Transform API response to BuilderQuestion format
      const transformedQuestions = transformApiQuestions(
        questionsArray,
        surveyType
      )

      if (transformedQuestions.length === 0) {
        setError("No questions were generated. Please try again.")
        return
      }

      onQuestionsGenerated(transformedQuestions)
      setOpen(false)
      setPrompt("")
      setSurveyType("single_choice")
      setNumberOfQuestions("5")
      setLevel("ADVANCE")
      setProvider("groq")
      setError(null)
    } catch (error) {
      console.error("[v0] Error generating questions:", error)
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate questions"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const transformApiQuestions = (
    apiQuestions: any[],
    selectedType: string
  ): BuilderQuestion[] => {
    console.log("[v0] Transforming API questions:", apiQuestions)
    console.log("[v0] Selected type:", selectedType)
    
    return (apiQuestions || []).map((q, index) => {
      console.log("[v0] Processing question:", q)
      
      const baseQuestion: BuilderQuestion = {
        // Don't set uuid - let QuestionEditor handle it
        type: selectedType as any,
        title: q.questionText || q.title || "",
        description: q.description || "",
        required: q.isRequired !== undefined ? q.isRequired : true,
        orderIndex: index,
        validationType: "none",
      }

      // Add options if they exist (check multiple possible formats)
      const options = q.options || q.choices || []
      if (options && options.length > 0) {
        baseQuestion.options = options.map((opt: any, idx: number) => ({
          // Don't set uuid - let QuestionEditor handle it
          text: opt.optionText || opt.text || opt.value || `Option ${idx + 1}`,
          orderIndex: idx,
        }))
        console.log("[v0] Added options:", baseQuestion.options)
      } else if (selectedType === "single_choice" || selectedType === "multiple_choice") {
        // If type requires options but none provided, add default ones
        baseQuestion.options = [
          { text: "Option 1", orderIndex: 0 },
          { text: "Option 2", orderIndex: 1 },
          { text: "Option 3", orderIndex: 2 },
          { text: "Option 4", orderIndex: 3 },
        ]
        console.log("[v0] No options found, added defaults")
      }

      // Add matrix rows/columns if needed
      if (selectedType === "matrix") {
        baseQuestion.rows = q.rows || ["Row 1"]
        baseQuestion.columns = q.columns || ["Column 1"]
      }

      // Add rating settings if needed
      if (selectedType === "rating" || selectedType === "nps") {
        baseQuestion.maxRating = q.maxRating || 5
        baseQuestion.symbol = q.symbol || "star"
      }

      console.log("[v0] Final transformed question:", baseQuestion)
      return baseQuestion
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-[#00a368] text-[#00a368] hover:bg-[#00a368] hover:text-white bg-transparent"
        >
          <Zap className="h-4 w-4 mr-2" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate Questions with AI</DialogTitle>
          <DialogDescription>
            Describe the survey you want to create, and AI will generate
            questions for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm font-medium">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
              <p className="text-red-600 text-xs mt-2">
                Check environment variables or{" "}
                <a
                  href="/docs/ENV_SETUP.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-red-700"
                >
                  setup guide
                </a>
              </p>
            </div>
          )}

          {/* Survey Title Display */}
          <div className="space-y-2">
            <Label>Survey Title</Label>
            <div className="px-3 py-2 bg-gray-100 rounded-md border border-gray-300 text-gray-700">
              {surveyTitle || "No title"}
            </div>
          </div>

          {/* Prompt */}
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt *</Label>
            <Textarea
              id="prompt"
              placeholder="E.g., Create a form for my student with java basic practice with single choice and 4 options for each question, use English"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
              className="h-24"
            />
          </div>

          {/* Survey Type */}
          <div className="space-y-2">
            <Label htmlFor="surveyType">Question Type *</Label>
            <Select
              value={surveyType}
              onValueChange={setSurveyType}
              disabled={loading}
            >
              <SelectTrigger id="surveyType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SURVEY_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Number of Questions */}
          <div className="space-y-2">
            <Label htmlFor="numberOfQuestions">Number of Questions *</Label>
            <Input
              id="numberOfQuestions"
              type="number"
              min="1"
              max="50"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Difficulty Level */}
          <div className="space-y-2">
            <Label htmlFor="level">Difficulty Level *</Label>
            <Select value={level} onValueChange={setLevel} disabled={loading}>
              <SelectTrigger id="level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTY_LEVELS.map((lvl) => (
                  <SelectItem key={lvl.value} value={lvl.value}>
                    {lvl.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Provider */}
          <div className="space-y-2">
            <Label htmlFor="provider">AI Provider *</Label>
            <Select
              value={provider}
              onValueChange={setProvider}
              disabled={loading}
            >
              <SelectTrigger id="provider">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROVIDERS.map((prov) => (
                  <SelectItem key={prov.value} value={prov.value}>
                    {prov.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-[#00a368] hover:bg-[#008f5b] text-white"
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {loading ? "Generating..." : "Generate Questions"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
