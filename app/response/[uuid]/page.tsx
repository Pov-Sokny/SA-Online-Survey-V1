"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { CheckCircle2, AlertCircle, Loader, ClipboardCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

import {
  useGetPublicSurveyQuery,
  useSubmitResponseMutation,
} from "@/lib/features/surveys/public-survey-api"

import type { ApiQuestion } from "@/lib/types/survey-type"
import { getFingerprint } from "@/utils/fingerpint"
import { getBrowserUuid } from "@/utils/broswerUuid"

interface FormData {
  [questionUuid: string]: string | string[]
}

export default function SurveyResponsePage() {
  const { uuid } = useParams<{ uuid: string }>()
  const [formData, setFormData] = useState<FormData>({})
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: survey, isLoading, isError } = useGetPublicSurveyQuery(uuid!, {
    skip: !uuid,
  })

  const [submitResponse, { isLoading: isSubmitting }] =
    useSubmitResponseMutation()

  /* ======================
     QUESTIONS
  ====================== */
  const questions = useMemo<ApiQuestion[]>(() => {
    return [...(survey?.questions ?? [])].sort(
      (a, b) => a.orderIndex - b.orderIndex
    )
  }, [survey])

  /* ======================
     FORM
  ====================== */
  const setAnswer = (questionUuid: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [questionUuid]: value }))
  }

  const requiredQuestions = questions.filter((q) => q.isRequired)

  const filledRequiredCount = requiredQuestions.filter((q) => {
    const v = formData[q.uuid]
    return Array.isArray(v) ? v.length > 0 : Boolean(v)
  }).length

  const progress =
    requiredQuestions.length === 0
      ? 100
      : (filledRequiredCount / requiredQuestions.length) * 100

  /* ======================
     SUBMIT
  ====================== */
  const handleSubmit = async () => {
    try {
      setError(null)
      if (!survey?.uuid) return

      const answers = questions
        .map((q) => {
          const value = formData[q.uuid]
          if (!value) return null

          if (q.questionType === "SINGLE_CHOICE") {
            return {
              questionUuid: q.uuid,
              optionUuid: [value as string],
              answerText: null,
            }
          }

          if (q.questionType === "MULTIPLE_CHOICE") {
            return {
              questionUuid: q.uuid,
              optionUuid: value as string[],
              answerText: null,
            }
          }

          return {
            questionUuid: q.uuid,
            optionUuid: [],
            answerText: value as string,
          }
        })
        .filter(Boolean)

      const fingerprint = await getFingerprint()
      const browserUuid = getBrowserUuid()

      await submitResponse({
        surveyUuid: survey.uuid,
        startTime: new Date().toISOString(),
        fingerprint,
        browserUuid,
        answers,
      }).unwrap()

      setSubmitted(true)
    } catch (error) {
      console.error("Submit failed:", error)
      setError("Failed to submit survey. Please try again.")
    }
  }

  /* ======================
     STATES
  ====================== */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <Card className="max-w-md w-full p-8 sm:p-10 text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-300">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl" />
            <CheckCircle2 className="mx-auto h-16 w-16 sm:h-20 sm:w-20 text-emerald-600 relative animate-in zoom-in-50 duration-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">
            Thank you!
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Your response has been submitted successfully. We appreciate your time!
          </p>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white">
        <Loader className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-emerald-600 mb-4" />
        <p className="text-gray-600 text-sm sm:text-base">Loading survey...</p>
      </div>
    )
  }

  if (isError || !survey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white p-4">
        <Card className="p-8 sm:p-10 text-center max-w-md w-full shadow-xl border-0">
          <AlertCircle className="mx-auto h-12 w-12 sm:h-14 sm:w-14 text-red-500 mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
            Survey not found
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            The survey you're looking for doesn't exist or has been removed.
          </p>
        </Card>
      </div>
    )
  }

  /* ======================
     RENDER
  ====================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header - Sticky */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-5">
          {/* Icon & Title */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 mt-1">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <ClipboardCheck className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {survey.title}
              </h1>
              {survey.description && (
                <p className="text-sm sm:text-base text-gray-600 mt-1 leading-relaxed">
                  {survey.description}
                </p>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {requiredQuestions.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="font-medium text-gray-700">Progress</span>
                <span className="text-gray-600 font-semibold">
                  {filledRequiredCount} / {requiredQuestions.length} completed
                </span>
              </div>
              <Progress
                value={progress}
                className="h-2 sm:h-2.5 bg-gray-200"
              />
            </div>
          )}
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
        {questions.map((q, index) => (
          <Card
            key={q.uuid}
            className="p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 border-gray-200 bg-white"
          >
            {/* Question Header */}
            <div className="mb-2.5 sm:mb-3">
              <h3 className="text-base text-[14px] sm:text-[20px] font-semibold text-gray-900 leading-snug">
                <span className="inline-flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-emerald-100 text-emerald-700 text-sm sm:text-base font-bold mr-2">
                  {index + 1}
                </span>
                {q.questionText}
                {q.isRequired && (
                  <span className="text-red-500 ml-1 text-lg">*</span>
                )}
              </h3>
            </div>

            {/* Single Choice */}
            {q.questionType === "SINGLE_CHOICE" && (
              <RadioGroup
                value={formData[q.uuid] as string}
                onValueChange={(v) => setAnswer(q.uuid, v)}
                className="space-y-2"
              >
                {q.options.map((o) => {
                  const isSelected = formData[q.uuid] === o.uuid
                  return (
                    <div
                      key={o.uuid}
                      className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-lg border transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50 shadow-sm"
                          : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      <RadioGroupItem
                        value={o.uuid}
                        id={o.uuid}
                        className="border-2"
                      />
                      <Label
                        htmlFor={o.uuid}
                        className={`flex-1 text-sm sm:text-base cursor-pointer leading-relaxed ${
                          isSelected ? "text-emerald-900 font-medium" : "text-gray-700"
                        }`}
                      >
                        {o.optionText}
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
            )}

            {/* Multiple Choice */}
            {q.questionType === "MULTIPLE_CHOICE" && (
              <div className="space-y-2">
                {q.options.map((o) => {
                  const current = (formData[q.uuid] as string[]) ?? []
                  const isSelected = current.includes(o.uuid)
                  return (
                    <div
                      key={o.uuid}
                      className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-lg border transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50 shadow-sm"
                          : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      <Checkbox
                        id={o.uuid}
                        checked={isSelected}
                        onCheckedChange={() =>
                          setAnswer(
                            q.uuid,
                            current.includes(o.uuid)
                              ? current.filter((v) => v !== o.uuid)
                              : [...current, o.uuid]
                          )
                        }
                        className="border-2"
                      />
                      <Label
                        htmlFor={o.uuid}
                        className={`flex-1 text-sm sm:text-base cursor-pointer leading-relaxed ${
                          isSelected ? "text-emerald-900 font-medium" : "text-gray-700"
                        }`}
                      >
                        {o.optionText}
                      </Label>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Short Answer */}
            {q.questionType === "SHORT_ANSWER" && (
              <Textarea
                value={(formData[q.uuid] as string) ?? ""}
                onChange={(e) => setAnswer(q.uuid, e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            )}
          </Card>
        ))}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-4 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Button
            onClick={handleSubmit}
            disabled={
              isSubmitting || filledRequiredCount < requiredQuestions.length
            }
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 disabled:hover:shadow-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader className="h-5 w-5 animate-spin" />
                Submitting...
              </span>
            ) : (
              "Submit Survey"
            )}
          </Button>

          {filledRequiredCount < requiredQuestions.length && (
            <p className="text-xs sm:text-sm text-gray-500 text-center mt-2.5">
              Please complete all required questions ({requiredQuestions.length - filledRequiredCount} remaining)
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
