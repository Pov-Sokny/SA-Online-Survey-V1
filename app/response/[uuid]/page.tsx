"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { CheckCircle2, AlertCircle, Loader } from "lucide-react"
//import { MOCK_SURVEY } from "@/lib/constants/mock-survey" // Import MOCK_SURVEY

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

import { useGetPublicSurveyQuery, useSubmitResponseMutation } from "@/lib/features/surveys/surveys-api"
import type { ApiQuestion } from "@/lib/types/survey-type"

interface FormData {
  [questionUuid: string]: string | string[]
}

export default function SurveyResponsePage() {
  const { uuid } = useParams<{ uuid: string }>()
  const [formData, setFormData] = useState<FormData>({})
  const [submitted, setSubmitted] = useState(false)

  // Fetch survey data from API
  const { data: survey, isLoading, isError, error } = useGetPublicSurveyQuery(uuid || "", {
    skip: !uuid,
  })

  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation()

  // Sort questions by orderIndex - create a copy first to avoid mutating read-only array
  const questions = [...(survey?.questions || [])].sort((a, b) => a.orderIndex - b.orderIndex)

  const handleSingleChoice = (questionUuid: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [questionUuid]: value,
    }))
  }

  const handleMultipleChoice = (questionUuid: string, value: string) => {
    setFormData((prev) => {
      const current = (prev[questionUuid] as string[]) || []
      const isChecked = current.includes(value)
      return {
        ...prev,
        [questionUuid]: isChecked
          ? current.filter((v) => v !== value)
          : [...current, value],
      }
    })
  }

  const handleTextChange = (questionUuid: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [questionUuid]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      const responses = questions
        .filter((q) => formData[q.uuid] !== undefined && formData[q.uuid] !== "")
        .map((q) => ({
          questionUuid: q.uuid,
          answer: Array.isArray(formData[q.uuid])
            ? (formData[q.uuid] as string[]).join(",")
            : (formData[q.uuid] as string),
        }))

      await submitResponse({
        surveyUuid: survey?.uuid || "",
        responses,
      }).unwrap()

      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting response:", error)
    }
  }

  const getRequiredQuestions = () => {
    return questions.filter((q) => q.isRequired)
  }

  const getFilledRequiredQuestions = () => {
    return getRequiredQuestions().filter((q) => formData[q.uuid])
  }

  const progress = (getFilledRequiredQuestions().length / getRequiredQuestions().length) * 100

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center p-8 shadow-lg">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900 p-4">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your response has been submitted successfully. We appreciate your feedback.
          </p>
          <Button className="w-full bg-[#00a368] hover:bg-[#008f5b] text-white">
            Back to Home
          </Button>
        </Card>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-[#00a368] mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading survey...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (isError || !survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center p-8 shadow-lg">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-100 dark:bg-red-900 p-4">
              <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Survey Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The survey you are looking for does not exist or has been closed.
          </p>
          <Button className="w-full bg-[#00a368] hover:bg-[#008f5b] text-white">
            Back to Home
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            {survey.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {survey.description}
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Progress</span>
              <span>
                {getFilledRequiredQuestions().length} of{" "}
                {getRequiredQuestions().length} required
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card
              key={question.uuid}
              className="p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00a368] text-white flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                      {question.questionText}
                    </h3>
                    {question.isRequired && (
                      <span className="text-red-500 font-bold">*</span>
                    )}
                  </div>

                  {/* Single Choice */}
                  {question.questionType === "SINGLE_CHOICE" && (
                    <RadioGroup
                      value={formData[question.uuid] as string}
                      onValueChange={(value) =>
                        handleSingleChoice(question.uuid, value)
                      }
                    >
                      <div className="space-y-3">
                        {question.options.map((option) => (
                          <div
                            key={option.uuid}
                            className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition"
                          >
                            <RadioGroupItem
                              value={option.uuid}
                              id={option.uuid}
                            />
                            <Label
                              htmlFor={option.uuid}
                              className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300"
                            >
                              {option.optionText}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}

                  {/* Multiple Choice */}
                  {question.questionType === "MULTIPLE_CHOICE" && (
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <div
                          key={option.uuid}
                          className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition"
                        >
                          <Checkbox
                            id={option.uuid}
                            checked={(
                              formData[question.uuid] as string[]
                            )?.includes(option.uuid)}
                            onCheckedChange={() =>
                              handleMultipleChoice(question.uuid, option.uuid)
                            }
                          />
                          <Label
                            htmlFor={option.uuid}
                            className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300"
                          >
                            {option.optionText}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Short Answer */}
                  {question.questionType === "SHORT_ANSWER" && (
                    <Textarea
                      placeholder="Enter your answer here..."
                      value={(formData[question.uuid] as string) || ""}
                      onChange={(e) =>
                        handleTextChange(question.uuid, e.target.value)
                      }
                      className="min-h-24 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                    />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex gap-4 sticky bottom-0 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-900 dark:to-transparent p-4">
          <Button
            onClick={handleSubmit}
            disabled={
              isSubmitting || getFilledRequiredQuestions().length < getRequiredQuestions().length
            }
            className="flex-1 bg-[#00a368] hover:bg-[#008f5b] text-white h-12 text-base font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Survey"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
