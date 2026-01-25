"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuestionCard } from "@/components/survey-builder/QuestionCard"
import { AiGenerateModal } from "@/components/survey-builder/AiGeneratorModal"
import type { BuilderQuestion } from "@/lib/types/survey-type"

interface QuestionEditorProps {
  surveyTitle: string
  questions: BuilderQuestion[]
  setQuestions: (questions: BuilderQuestion[]) => void
}

export function QuestionEditor({
  surveyTitle,
  questions,
  setQuestions,
}: QuestionEditorProps) {
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(
    questions?.[0]?.uuid ?? null
  )

  /** ✅ ADD NEW QUESTION (NO UUID) */
  const addQuestion = () => {
    const newQuestion: BuilderQuestion = {
      // ❌ NO uuid here
      type: "single_choice",
      title: "",
      description: "",
      required: false,
      orderIndex: questions.length,
      options: [
        {
          //uuid: '', // ❌ NO uuid here
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
    }

    setQuestions([...questions, newQuestion])
    // Make the new question active so user can immediately edit
    setActiveQuestionId(`temp_${questions.length}`)
  }

  /** ✅ UPDATE - Use index for questions without UUID */
  const updateQuestion = (index: number, updates: Partial<BuilderQuestion>) => {
    setQuestions(
      questions.map((q, i) =>
        i === index ? { ...q, ...updates } : q
      )
    )
  }

  /** ✅ DELETE - Use index for questions without UUID */
  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
    const questionId = questions[index]?.uuid ?? `temp_${index}`
    if (activeQuestionId === questionId) {
      setActiveQuestionId(null)
    }
  }

  /** ✅ DUPLICATE = NEW QUESTION (NO UUID, NO OPTION UUIDs) */
  const duplicateQuestion = (question: BuilderQuestion) => {
    const duplicated: BuilderQuestion = {
      ...question,
      uuid: undefined, // 🔥 IMPORTANT
      title: `${question.title} (Copy)`,
      options: question.options?.map((o) => ({
        ...o,
        uuid: undefined, // 🔥 IMPORTANT
      })),
      orderIndex: questions.length,
    }

    setQuestions([...questions, duplicated])
    // Make the duplicated question active so user can immediately edit
    setActiveQuestionId(`temp_${questions.length}`)
  }

  /** ✅ AI GENERATED = NEW QUESTIONS */
  const handleQuestionsGenerated = (generated: BuilderQuestion[]) => {
    const normalized = generated.map((q, idx) => ({
      ...q,
      uuid: undefined,
      options: q.options?.map((o) => ({
        ...o,
        uuid: undefined,
      })),
      orderIndex: questions.length + idx,
    }))

    const updatedQuestions = [...questions, ...normalized]
    setQuestions(updatedQuestions)
    // Set the first generated question as active so user can immediately edit
    if (normalized.length > 0) {
      setActiveQuestionId(`temp_${questions.length}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="space-y-4">
        {questions.map((question, index) => {
          const questionId = question.uuid ?? `temp_${index}`
          return (
            <QuestionCard
              key={questionId}
              question={question}
              isActive={activeQuestionId === questionId}
              onClick={() => setActiveQuestionId(questionId)}
              onUpdate={(updates) => updateQuestion(index, updates)}
              onDelete={() => deleteQuestion(index)}
              onDuplicate={() => duplicateQuestion(question)}
            />
          )
        })}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <Button
          onClick={addQuestion}
          className="bg-[#00a368] hover:bg-[#008f5b] text-white shadow-lg rounded-full px-6 py-6"
        >
          <Plus className="h-6 w-6 mr-2" />
          Add New Question
        </Button>

        <AiGenerateModal
          surveyTitle={surveyTitle}
          onQuestionsGenerated={handleQuestionsGenerated}
        />
      </div>
    </div>
  )
}
