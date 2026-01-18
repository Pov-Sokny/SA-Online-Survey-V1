import type { ApiQuestion, BuilderQuestion } from "./survey-type"

export function mapApiQuestionsToBuilder(
  apiQuestions: ApiQuestion[],
): BuilderQuestion[] {
  return [...apiQuestions]
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((q) => {
      const mappedType = mapQuestionType(q.questionType)
      return {
        uuid: q.uuid,
        title: q.questionText,
        type: mappedType,
        required: q.isRequired,
        orderIndex: q.orderIndex,
        options: q.options?.map((o) => ({
          uuid: o.uuid,
          text: o.optionText,
          orderIndex: o.orderIndex,
        })) || [],
      } as BuilderQuestion
    })
}

function mapQuestionType(apiType: string): BuilderQuestion["type"] {
  switch (apiType) {
    case "MULTIPLE_CHOICE":
      return "multiple_choice"
    case "SINGLE_CHOICE":
      return "single_choice"
    case "SHORT_ANSWER":
      return "text"
    default:
      return "text"
  }
}
