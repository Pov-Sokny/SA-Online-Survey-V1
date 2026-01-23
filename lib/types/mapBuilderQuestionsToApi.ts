import type { /*BuilderQuestion*/ ApiQuestionType } from "./survey-type"

export interface BuilderQuestion {
  uuid?: string
  type: string
  title: string
  description?: string
  required: boolean
  orderIndex: number
  options: {
    uuid?: string
    text: string
    orderIndex: number
  }[]
}

export function mapBuilderQuestionsToApi(questions: BuilderQuestion[]) {
  return questions.map((q, qIndex) => ({
    // ✅ send uuid ONLY if it's a real backend uuid
    ...(isRealUuid(q.uuid) ? { uuid: q.uuid } : {}),

    questionText: q.title,
    questionType: mapType(q.type),
    isRequired: q.required,
    orderIndex: qIndex + 1,

    options:
      q.options?.map((o, oIndex) => ({
        ...(isRealUuid(o.uuid) ? { uuid: o.uuid } : {}),
        optionText: o.text,
        orderIndex: oIndex + 1,
      })) ?? [],
  }))
}

/** ✅ helper */
function isRealUuid(uuid?: string) {
  if (!uuid) return false
  if (uuid.startsWith("temp_")) return false
  return true
}

function mapType(type: BuilderQuestion["type"]): ApiQuestionType {
  switch (type) {
    case "multiple_choice":
      return "MULTIPLE_CHOICE"
    case "single_choice":
      return "SINGLE_CHOICE"
    default:
      return "SHORT_ANSWER"
  }
}
