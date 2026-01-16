"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuestionCard } from "@/components/survey-builder/QuestionCard"
import type { QuestionRequest } from "@/lib/types/survey-type"

interface QuestionEditorProps {
  questions: QuestionRequest
  setQuestions: (questions: any[]) => void
}

export function QuestionEditor({ questions, setQuestions }: QuestionEditorProps) {
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(questions[0]?.uuid || null)

  const addQuestion = () => {
    const newQuestion = {
      id: crypto.randomUUID(),
      type: "single_choice",
      title: "",
      description: "",
      required: false,
      options: [
        {
          id: "1",
          text: "Option 1",
        },
      ],
      rows: ["Row 1"],
      columns: ["Col 1"],
      maxRating: 5,
      symbol: "star",
      isLong: false,
      validationType: "none",
    }
    setQuestions([...questions, newQuestion])
    setActiveQuestionId(newQuestion.id)
  }

  const updateQuestion = (id: string, updates: any) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              ...updates,
            }
          : q,
      ),
    )
  }

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
    if (activeQuestionId === id) {
      setActiveQuestionId(null)
    }
  }

  const duplicateQuestion = (question: any) => {
    const newQuestion = {
      ...question,
      id: crypto.randomUUID(),
      title: `${question.title} (Copy)`,
    }
    const index = questions.findIndex((q) => q.id === question.id)
    const newQuestions = [...questions]
    newQuestions.splice(index + 1, 0, newQuestion)
    setQuestions(newQuestions)
    setActiveQuestionId(newQuestion.id)
  }

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            isActive={activeQuestionId === question.id}
            onClick={() => setActiveQuestionId(question.id)}
            onUpdate={(updates) => updateQuestion(question.id, updates)}
            onDelete={() => deleteQuestion(question.id)}
            onDuplicate={() => duplicateQuestion(question)}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={addQuestion}
          className="bg-[#00a368] hover:bg-[#008f5b] text-white shadow-lg rounded-full px-6 py-6"
        >
          <Plus className="h-6 w-6 mr-2" />
          Add New Question
        </Button>
      </div>
    </div>
  )
}
