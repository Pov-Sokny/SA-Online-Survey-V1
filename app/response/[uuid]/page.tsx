"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { CheckCircle2, AlertCircle, Loader } from "lucide-react"

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

  const { data: survey, isLoading, isError } =
    useGetPublicSurveyQuery(uuid!, { skip: !uuid })

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
    if (!survey?.uuid) return

    const answers = questions.flatMap((q) => {
      const value = formData[q.uuid]
      if (!value) return []

      if (q.questionType === "SINGLE_CHOICE") {
        return [{
          questionUuid: q.uuid,
          optionUuid: [value as string],
          answerText: null,
        }]
      }

      if (q.questionType === "MULTIPLE_CHOICE") {
        return [{
          questionUuid: q.uuid,
          optionUuid: value as string[],
          answerText: null,
        }]
      }

      return [{
        questionUuid: q.uuid,
        optionUuid: [],
        answerText: value as string,
      }]
    })

    if (answers.length === 0) {
      alert("No answers to submit")
      return
    }

    const fingerprint = await getFingerprint()
    const browserUuid = getBrowserUuid()

    await submitResponse({
      surveyUuid: survey.uuid, // ✅ used only for URL
      startTime: new Date().toISOString(),
      fingerprint,
      browserUuid,
      answers,
    }).unwrap()

    setSubmitted(true)
  } catch (err) {
    console.error("Submit failed:", err)
    alert("Submit failed ❌")
  }
}


  /* ======================
     STATES
  ====================== */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-600 mb-4" />
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
        <Loader className="h-10 w-10 animate-spin text-[#00a368]" />
      </div>
    )
  }

  if (isError || !survey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold">Survey not found</h2>
        </Card>
      </div>
    )
  }

  /* ======================
     RENDER
  ====================== */
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold">{survey.title}</h1>
          <p className="text-gray-600 mt-2">{survey.description}</p>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>
                {filledRequiredCount} / {requiredQuestions.length}
              </span>
            </div>
            <Progress value={progress} />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {questions.map((q, index) => (
          <Card key={q.uuid} className="p-6">
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

            {q.questionType === "MULTIPLE_CHOICE" &&
              q.options.map((o) => {
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

            {q.questionType === "SHORT_ANSWER" && (
              <Textarea
                value={(formData[q.uuid] as string) ?? ""}
                onChange={(e) => setAnswer(q.uuid, e.target.value)}
              />
            )}
          </Card>
        ))}

        <Button
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            filledRequiredCount < requiredQuestions.length
          }
          className="w-full h-12 bg-[#00a368]"
        >
          {isSubmitting ? "Submitting..." : "Submit Survey"}
        </Button>
      </div>
    </div>
  )
}
