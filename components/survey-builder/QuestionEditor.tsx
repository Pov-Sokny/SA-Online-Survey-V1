"use client"

"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuestionCard } from "@/components/survey-builder/QuestionCard"
import type { BuilderQuestion } from "@/lib/types/survey-type"

interface QuestionEditorProps {
  questions: BuilderQuestion[]
  setQuestions: (questions: BuilderQuestion[]) => void
}

export function QuestionEditor({ questions, setQuestions }: QuestionEditorProps) {
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(
    questions && questions.length > 0 ? questions[0]?.uuid : null
  )

  const addQuestion = () => {
    const tempUuid = `temp_${Date.now()}`
    const newQuestion: BuilderQuestion = {
      uuid: tempUuid,
      type: "single_choice" as const,
      title: "",
      description: "",
      required: false,
      options: [
        {
          uuid: `temp_option_${Date.now()}`,
          text: "Option 1",
          orderIndex: 0,
        },
      ],
      rows: ["Row 1"],
      columns: ["Col 1"],
      maxRating: 5,
      symbol: "star",
      isLong: false,
      validationType: "none",
      orderIndex: (questions?.length || 0),
    }
    setQuestions([...(questions || []), newQuestion])
    setActiveQuestionId(tempUuid)
  }

  const updateQuestion = (uuid: string, updates: any) => {
    setQuestions(
      (questions || []).map((q) =>
        q.uuid === uuid
          ? {
              ...q,
              ...updates,
            }
          : q,
      ),
    )
  }

  const deleteQuestion = (uuid: string) => {
    setQuestions((questions || []).filter((q) => q.uuid !== uuid))
    if (activeQuestionId === uuid) {
      setActiveQuestionId(null)
    }
  }

  const duplicateQuestion = (question: any) => {
    const newUuid = crypto.randomUUID()
    const newQuestion = {
      ...question,
      uuid: newUuid,
      title: `${question.title} (Copy)`,
    }
    const index = (questions || []).findIndex((q) => q.uuid === question.uuid)
    const newQuestions = [...(questions || [])]
    newQuestions.splice(index + 1, 0, newQuestion)
    setQuestions(newQuestions)
    setActiveQuestionId(newUuid)
  }

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="space-y-4">
        {(questions || []).map((question) => (
          <QuestionCard
            key={question.uuid}
            question={question}
            isActive={activeQuestionId === question.uuid}
            onClick={() => setActiveQuestionId(question.uuid)}
            onUpdate={(updates) => updateQuestion(question.uuid, updates)}
            onDelete={() => deleteQuestion(question.uuid)}
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
