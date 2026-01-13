"use client"

import { GripVertical, Trash2, Copy, MoreHorizontal } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { QuestionTypeSelector } from "./QuestionTypeSelector"
import { SingleChoice } from "./question-types/SingleChoice"
import { MultiChoice } from "./question-types/MultiChoice"
import { TextQuestion } from "./question-types/TextQuestion"
import { RatingQuestion } from "./question-types/RatingQuestion"
import { MatrixQuestion } from "./question-types/MatrixQuestion"
import { NPSQuestion } from "./question-types/NPSQuestion"

interface QuestionCardProps {
  question: any
  isActive: boolean
  onClick: () => void
  onUpdate: (updates: any) => void
  onDelete: () => void
  onDuplicate: () => void
}

export function QuestionCard({ question, isActive, onClick, onUpdate, onDelete, onDuplicate }: QuestionCardProps) {
  const renderQuestionBody = () => {
    switch (question.type) {
      case "single_choice":
        return (
          <SingleChoice
            options={question.options}
            onChange={(options) =>
              onUpdate({
                options,
              })
            }
          />
        )
      case "multi_choice":
        return (
          <MultiChoice
            options={question.options}
            onChange={(options) =>
              onUpdate({
                options,
              })
            }
          />
        )
      case "text":
        return <TextQuestion isLong={question.isLong} validationType={question.validationType} onChange={onUpdate} />
      case "rating":
        return <RatingQuestion maxRating={question.maxRating} symbol={question.symbol} onChange={onUpdate} />
      case "matrix":
        return <MatrixQuestion rows={question.rows} columns={question.columns} onChange={onUpdate} />
      case "nps":
        return <NPSQuestion />
      default:
        return null
    }
  }

  if (!isActive) {
    return (
      <Card className="p-4 cursor-pointer hover:border-[#00a368] transition-colors group relative" onClick={onClick}>
        <div className="flex items-start gap-4">
          <div className="mt-1 text-gray-400 group-hover:text-gray-600">
            <GripVertical className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">
              {question.title || <span className="text-gray-400 italic">Untitled Question</span>}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </h3>
            <p className="text-sm text-gray-500 mt-1 capitalize">{question.type.replace("_", " ")}</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-l-4 border-l-[#00a368] shadow-lg relative">
      <div className="absolute top-1/2 -left-3 -translate-y-1/2 cursor-move p-1 bg-white rounded-full shadow border border-gray-100 hover:text-[#00a368]">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      <div className="p-6 space-y-6">
        <div className="flex gap-4 items-start">
          <div className="flex-1 space-y-2">
            <Input
              value={question.title}
              onChange={(e) =>
                onUpdate({
                  title: e.target.value,
                })
              }
              placeholder="Question Title"
              className="text-lg font-medium border-transparent hover:border-gray-200 focus:border-[#00a368] bg-gray-50 focus:bg-white transition-colors"
            />
            <Input
              value={question.description || ""}
              onChange={(e) =>
                onUpdate({
                  description: e.target.value,
                })
              }
              placeholder="Description (optional)"
              className="text-sm text-gray-500 border-transparent hover:border-gray-200 focus:border-[#00a368] bg-transparent focus:bg-white"
            />
          </div>
          <QuestionTypeSelector
            value={question.type}
            onChange={(type) =>
              onUpdate({
                type,
              })
            }
          />
        </div>

        <div className="pt-2">{renderQuestionBody()}</div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
            <span className="text-sm text-gray-600">Required</span>
            <Switch
              checked={question.required}
              onCheckedChange={(checked) =>
                onUpdate({
                  required: checked,
                })
              }
            />
          </div>

          <button
            onClick={onDuplicate}
            className="p-2 text-gray-500 hover:text-[#00a368] hover:bg-green-50 rounded-full transition-colors"
            title="Duplicate"
          >
            <Copy className="h-5 w-5" />
          </button>

          <button
            onClick={onDelete}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Delete"
          >
            <Trash2 className="h-5 w-5" />
          </button>

          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  )
}
