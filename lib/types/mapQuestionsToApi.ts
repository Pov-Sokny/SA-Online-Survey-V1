import type { BuilderQuestion } from "@/lib/types/survey-type"

export function mapApiQuestionsToBuilder(apiQuestions: any[]): BuilderQuestion[] {
  return [...apiQuestions] // clone FIRST
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((q) => ({
      uuid: q.uuid, // ✅ from backend
      title: q.questionText,
      type: q.questionType,
      required: q.isRequired,
      orderIndex: q.orderIndex,
      options: [...q.options]
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map((o: any) => ({
          uuid: o.uuid, // ✅ from backend
          optionText: o.optionText,
          orderIndex: o.orderIndex,
        })),
    }))
}

export function mapQuestionsToApi(questions: BuilderQuestion[]) {
  return questions.map((q, index) => ({
    questionText: q.title,
    questionType: q.type,
    isRequired: q.required,
    orderIndex: index + 1,
    options:
      q.type === "MULTIPLE_CHOICE" || q.type === "SINGLE_CHOICE"
        ? q.options.map((o, i) => ({
            optionText: o.optionText,
            orderIndex: i + 1,
          }))
        : [],
  }))
}

