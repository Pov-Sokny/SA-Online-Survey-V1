import type { BuilderQuestion, ApiQuestionType } from "./survey-type"

export function mapBuilderQuestionsToApi(questions: BuilderQuestion[]) {
  return questions.map((q, index) => ({
    questionText: q.title,
    questionType: mapType(q.type),
    isRequired: q.required,
    orderIndex: index + 1,
    options:
      q.type === "single_choice" || q.type === "multiple_choice"
        ? q.options?.map((o, i) => ({
            optionText: o.text || o.optionText,
            orderIndex: i + 1,
          })) ?? []
        : [],
  }))
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
