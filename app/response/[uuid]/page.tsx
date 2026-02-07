"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { skipToken } from "@reduxjs/toolkit/query"
import {
  CheckCircle2,
  AlertCircle,
  Loader,
  ClipboardCheck,
} from "lucide-react"

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

/* ======================
   TYPES
====================== */
interface FormData {
  [questionUuid: string]: string | string[]
}

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
     INIT IDENTITY (ONCE)
  ====================== */
  useEffect(() => {
    const init = async () => {
      const fp = await getFingerprint()
      const bu = getBrowserUuid()

      setFingerprint(fp)
      setBrowserUuid(bu)
    }

    init()
  }, [])

  /* ======================
     FETCH SURVEY (POST)
  ====================== */
  const { data: survey, isLoading, isError } = useGetPublicSurveyQuery(
    fingerprint && browserUuid && uuid
      ? { uuid, fingerprint, browserUuid }
      : skipToken
  )

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
     FORM HELPERS
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
      if (!survey || !fingerprint || !browserUuid) return

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

      await submitResponse({
        surveyUuid: survey.uuid,
        startTime: new Date().toISOString(),
        fingerprint,
        browserUuid,
        answers,
      }).unwrap()

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError("Failed to submit survey. Please try again.")
    }
  }

  /* ======================
     STATES
  ====================== */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <Card className="max-w-md w-full p-8 text-center shadow-xl border-0">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
          <p className="text-gray-600">
            Your response has been submitted successfully.
          </p>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-10 w-10 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (isError || !survey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-3" />
          <h2 className="text-xl font-bold">Survey not found</h2>
        </Card>
      </div>
    )
  }

  /* ======================
     RENDER
  ====================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center">
              <ClipboardCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{survey.title}</h1>
              {survey.description && (
                <p className="text-gray-600">{survey.description}</p>
              )}
            </div>
          </div>

          {requiredQuestions.length > 0 && (
            <div className="mt-4">
              <Progress value={progress} />
            </div>
          )}
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {questions.length === 0 && (
          <Card className="p-4 text-gray-600 text-center">
            This survey has no questions. Click submit to continue.
          </Card>
        )}

        {questions.map((q, index) => (
          <Card key={q.uuid} className="p-4">
            <h3 className="font-semibold mb-3">
              {index + 1}. {q.questionText}
              {q.isRequired && <span className="text-red-500 ml-1">*</span>}
            </h3>

            {q.questionType === "SINGLE_CHOICE" && (
              <RadioGroup
                value={formData[q.uuid] as string}
                onValueChange={(v) => setAnswer(q.uuid, v)}
              >
                {q.options.map((o) => (
                  <div key={o.uuid} className="flex items-center gap-2">
                    <RadioGroupItem value={o.uuid} id={o.uuid} />
                    <Label htmlFor={o.uuid}>{o.optionText}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {q.questionType === "MULTIPLE_CHOICE" && (
              <div className="space-y-2">
                {q.options.map((o) => {
                  const current = (formData[q.uuid] as string[]) ?? []
                  return (
                    <div key={o.uuid} className="flex items-center gap-2">
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
                      <Label>{o.optionText}</Label>
                    </div>
                  )
                })}
              </div>
            )}

            {q.questionType === "SHORT_ANSWER" && (
              <Textarea
                value={(formData[q.uuid] as string) ?? ""}
                onChange={(e) => setAnswer(q.uuid, e.target.value)}
              />
            )}
          </Card>
        ))}

        {error && (
          <div className="text-red-600 text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={
            isSubmitting || filledRequiredCount < requiredQuestions.length
          }
          className="w-full h-12"
        >
          {isSubmitting ? "Submitting..." : "Submit Survey"}
        </Button>
      </div>
    </div>
  )
}
