import type { ApiQuestion, BuilderQuestion } from "./survey-type"

export function mapApiQuestionsToBuilder(
  apiQuestions: ApiQuestion[],
): BuilderQuestion[] {
  return [...apiQuestions]
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((q) => ({
      uuid: q.uuid,
      title: q.questionText,
      type:
        q.questionType === "MULTIPLE_CHOICE"
          ? "multiple_choice"
          : q.questionType === "SINGLE_CHOICE"
          ? "single_choice"
          : "text",
      required: q.isRequired,
      orderIndex: q.orderIndex,
      options: q.options?.map((o) => ({
        uuid: o.uuid,
        optionText: o.optionText,
        orderIndex: o.orderIndex,
      })),
    }))
}
