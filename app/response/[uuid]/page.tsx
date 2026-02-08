"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { skipToken } from "@reduxjs/toolkit/query"
import {
  AlertCircle,
  CheckCircle2,
  Loader,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

import {
  useGetPublicSurveyQuery,
  useSubmitResponseMutation,
} from "@/lib/features/surveys/public-survey-api"
import type { ApiQuestion } from "@/lib/types/survey-type"

import { getFingerprint } from "@/utils/fingerpint"
import { getBrowserUuid } from "@/utils/broswerUuid"

/* ======================
   TYPES
====================== */
type FormData = Record<string, string | string[]>

/* ======================
   PAGE
====================== */
export default function SurveyResponsePage() {
  const { uuid } = useParams<{ uuid: string }>()

  const [formData, setFormData] = useState<FormData>({})
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [fingerprint, setFingerprint] = useState<string | null>(null)
  const [browserUuid, setBrowserUuid] = useState<string | null>(null)

  /* ======================
     INIT CLIENT IDENTITY
  ====================== */
  useEffect(() => {
    ;(async () => {
      setFingerprint(await getFingerprint())
      setBrowserUuid(getBrowserUuid())
    })()
  }, [])

  /* ======================
     FETCH SURVEY
  ====================== */
  const {
    data: survey,
    isLoading,
    error: fetchError,
  } = useGetPublicSurveyQuery(
    fingerprint && browserUuid && uuid
      ? { uuid, fingerprint, browserUuid }
      : skipToken
  )

  const status = (fetchError as any)?.status
  const isAlreadySubmitted = status === 409
  const isNotFound = status === 404

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

  const requiredQuestions = questions.filter((q) => q.isRequired)

  const filledRequiredCount = requiredQuestions.filter((q) => {
    const value = formData[q.uuid]
    return Array.isArray(value) ? value.length > 0 : Boolean(value)
  }).length

  const progress =
    requiredQuestions.length === 0
      ? 100
      : (filledRequiredCount / requiredQuestions.length) * 100

  /* ======================
     HELPERS
  ====================== */
  const setAnswer = (questionUuid: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [questionUuid]: value }))
  }

  const buildAnswers = () =>
    questions
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

  /* ======================
     SUBMIT
  ====================== */
  const handleSubmit = async () => {
    if (!survey || !fingerprint || !browserUuid) return

    try {
      setError(null)

      await submitResponse({
        surveyUuid: survey.uuid,
        startTime: new Date().toISOString(),
        fingerprint,
        browserUuid,
        answers: buildAnswers(),
      }).unwrap()

      setSubmitted(true)
    } catch (err: any) {
      if (err?.status === 409) return
      setError("Failed to submit survey. Please try again.")
    }
  }

  /* ======================
     STATES
  ====================== */
  if (isLoading) {
    return (
      <Centered>
        <Loader className="h-8 w-8 animate-spin text-gray-500" />
      </Centered>
    )
  }

  if (isAlreadySubmitted) {
    return (

      <Centered>
        <Card className="p-8 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Survey already submitted</h2>
          <p className="text-gray-600">
            You have already completed this survey, Thank you 
          </p>
        </Card>
      </Centered>
    )
  }

  if (isNotFound) {
    return (
      <Centered>
        <Card className="p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-3" />
          <h2 className="text-xl font-bold">
            Survey not found
          </h2>
        </Card>
      </Centered>
    )
  }

  if (submitted) {
    return (
      <Centered>
        <Card className="p-8 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
          <p className="text-gray-600">
            Your response has been submitted successfully.
          </p>
        </Card>
      </Centered>
    )
  }

  if (!survey) return null

  /* ======================
     RENDER
  ====================== */
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">
            {survey.title}
          </h1>

          {survey.description && (
            <p className="text-gray-600 mb-4">
              {survey.description}
            </p>
          )}

          {requiredQuestions.length > 0 && (
            <>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>
                  {filledRequiredCount}/{requiredQuestions.length}
                </span>
              </div>
              <Progress value={progress} />
            </>
          )}
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {questions.map((q, index) => (
          <Card key={q.uuid} className="p-4">
            <h3 className="font-semibold mb-3">
              {index + 1}. {q.questionText}
              {q.isRequired && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </h3>

            {q.questionType === "SINGLE_CHOICE" && (
              <RadioGroup
                value={formData[q.uuid] as string}
                onValueChange={(v) => setAnswer(q.uuid, v)}
              >
                {q.options.map((o) => (
                  <Label key={o.uuid} className="flex gap-2">
                    <RadioGroupItem value={o.uuid} />
                    {o.optionText}
                  </Label>
                ))}
              </RadioGroup>
            )}

            {q.questionType === "MULTIPLE_CHOICE" && (
              <div className="space-y-2">
                {q.options.map((o) => {
                  const current =
                    (formData[q.uuid] as string[]) ?? []
                  return (
                    <Label key={o.uuid} className="flex gap-2">
                      <Checkbox
                        checked={current.includes(o.uuid)}
                        onCheckedChange={() =>
                          setAnswer(
                            q.uuid,
                            current.includes(o.uuid)
                              ? current.filter((v) => v !== o.uuid)
                              : [...current, o.uuid]
                          )
                        }
                      />
                      {o.optionText}
                    </Label>
                  )
                })}
              </div>
            )}

            {q.questionType === "SHORT_ANSWER" && (
              <Textarea
                value={(formData[q.uuid] as string) ?? ""}
                onChange={(e) =>
                  setAnswer(q.uuid, e.target.value)
                }
              />
            )}
          </Card>
        ))}

        {error && (
          <p className="text-sm text-red-600 flex gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </p>
        )}

        <Button
          className="w-full h-12"
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            filledRequiredCount < requiredQuestions.length
          }
        >
          {isSubmitting ? "Submitting..." : "Submit Survey"}
        </Button>
      </div>
    </div>
  )
}

/* ======================
   SHARED UI
====================== */
function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {children}
    </div>
  )
}
