"use client"

import { useState } from "react"
import { GripVertical, Trash2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { BuilderQuestion, QuestionOption } from "@/lib/types/survey-type"
import { AiGenerateModal } from "@/components/survey-builder/AiGeneratorModal"

interface QuestionEditorProps {
  surveyTitle: string
  questions: BuilderQuestion[]
  setQuestions: (questions: BuilderQuestion[]) => void
}

const QUESTION_TYPES = [
  { value: "single_choice", label: "Single Choice" },
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "text", label: "Short Text" },
  { value: "long_text", label: "Long Text" },
  { value: "rating", label: "Rating" },
  { value: "nps", label: "NPS" },
]

export function QuestionEditor1({
  surveyTitle,
  questions,
  setQuestions,
}: QuestionEditorProps) {
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null
  )

  const handleAddQuestion = () => {
    const newQuestion: BuilderQuestion = {
      uuid: `temp_${Date.now()}`,
      type: "single_choice",
      title: "New Question",
      description: "",
      required: false,
      orderIndex: questions.length,
      validationType: "none",
      options: [
        {
          uuid: `temp_option_${Date.now()}_0`,
          text: "Option 1",
          orderIndex: 0,
        },
        {
          uuid: `temp_option_${Date.now()}_1`,
          text: "Option 2",
          orderIndex: 1,
        },
      ],
    }
    setQuestions([...questions, newQuestion])
    setExpandedQuestionId(newQuestion.uuid)
  }

  const handleDeleteQuestion = (uuid: string) => {
    setQuestions(questions.filter((q) => q.uuid !== uuid))
  }

  const handleUpdateQuestion = (
    uuid: string,
    updates: Partial<BuilderQuestion>
  ) => {
    setQuestions(
      questions.map((q) => (q.uuid === uuid ? { ...q, ...updates } : q))
    )
  }

  const handleAddOption = (questionUuid: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.uuid === questionUuid) {
          const newOption: QuestionOption = {
            uuid: `temp_option_${Date.now()}_${q.options?.length || 0}`,
            text: `Option ${(q.options?.length || 0) + 1}`,
            orderIndex: q.options?.length || 0,
          }
          return {
            ...q,
            options: [...(q.options || []), newOption],
          }
        }
        return q
      })
    )
  }

  const handleUpdateOption = (
    questionUuid: string,
    optionUuid: string,
    text: string
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.uuid === questionUuid && q.options) {
          return {
            ...q,
            options: q.options.map((opt) =>
              opt.uuid === optionUuid ? { ...opt, text } : opt
            ),
          }
        }
        return q
      })
    )
  }

  const handleDeleteOption = (questionUuid: string, optionUuid: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.uuid === questionUuid && q.options) {
          return {
            ...q,
            options: q.options.filter((opt) => opt.uuid !== optionUuid),
          }
        }
        return q
      })
    )
  }

  const handleQuestionsGenerated = (newQuestions: BuilderQuestion[]) => {
    setQuestions([...questions, ...newQuestions])
  }

  const hasOptions = (type: string) => {
    return type === "single_choice" || type === "multiple_choice"
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
        <div className="flex gap-3">
          <AiGenerateModal
            surveyTitle={surveyTitle}
            onQuestionsGenerated={handleQuestionsGenerated}
          />
          <Button
            onClick={handleAddQuestion}
            className="bg-[#00a368] hover:bg-[#008f5b] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <p className="text-gray-500 mb-4">No questions yet</p>
          <p className="text-sm text-gray-400 mb-6">
            Add questions manually or generate them with AI
          </p>
          <div className="flex gap-3 justify-center">
            <AiGenerateModal
              surveyTitle={surveyTitle}
              onQuestionsGenerated={handleQuestionsGenerated}
            />
            <Button
              onClick={handleAddQuestion}
              variant="outline"
              className="bg-transparent"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {questions.map((question, index) => {
            const isExpanded = expandedQuestionId === question.uuid
            return (
              <Card key={question.uuid} className="p-4">
                <div className="space-y-4">
                  {/* Question Header */}
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      className="cursor-grab hover:bg-gray-100 p-1 rounded mt-1"
                    >
                      <GripVertical className="h-5 w-5 text-gray-400" />
                    </button>
                    <div className="flex-1 space-y-3">
                      {/* Question Number and Title */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-500 min-w-[60px]">
                          Q{index + 1}
                        </span>
                        <Input
                          value={question.title}
                          onChange={(e) =>
                            handleUpdateQuestion(question.uuid, {
                              title: e.target.value,
                            })
                          }
                          placeholder="Enter question text"
                          className="flex-1 font-medium"
                        />
                      </div>

                      {/* Expanded View */}
                      {isExpanded && (
                        <div className="space-y-4 pl-[76px]">
                          {/* Description */}
                          <div className="space-y-2">
                            <Label>Description (Optional)</Label>
                            <Textarea
                              value={question.description || ""}
                              onChange={(e) =>
                                handleUpdateQuestion(question.uuid, {
                                  description: e.target.value,
                                })
                              }
                              placeholder="Add a description for this question"
                              className="h-20"
                            />
                          </div>

                          {/* Question Type */}
                          <div className="space-y-2">
                            <Label>Question Type</Label>
                            <Select
                              value={question.type}
                              onValueChange={(value) =>
                                handleUpdateQuestion(question.uuid, {
                                  type: value as any,
                                })
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {QUESTION_TYPES.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Options (for single_choice and multiple_choice) */}
                          {hasOptions(question.type) && (
                            <div className="space-y-2">
                              <Label>Options</Label>
                              <div className="space-y-2">
                                {question.options?.map((option) => (
                                  <div
                                    key={option.uuid}
                                    className="flex items-center gap-2"
                                  >
                                    <Input
                                      value={option.text}
                                      onChange={(e) =>
                                        handleUpdateOption(
                                          question.uuid,
                                          option.uuid,
                                          e.target.value
                                        )
                                      }
                                      placeholder="Option text"
                                      className="flex-1"
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        handleDeleteOption(
                                          question.uuid,
                                          option.uuid
                                        )
                                      }
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50 bg-transparent"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleAddOption(question.uuid)}
                                  className="w-full bg-transparent"
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Option
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Required Toggle */}
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={question.required}
                              onCheckedChange={(checked) =>
                                handleUpdateQuestion(question.uuid, {
                                  required: checked,
                                })
                              }
                            />
                            <Label>Required question</Label>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setExpandedQuestionId(
                            isExpanded ? null : question.uuid
                          )
                        }
                        className="text-gray-600 hover:bg-gray-100 bg-transparent"
                      >
                        {isExpanded ? "Collapse" : "Edit"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuestion(question.uuid)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
