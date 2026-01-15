export function mapQuestionsToApi(questions: any[]) {
  return questions.map((q, qIndex) => ({
    questionText: q.title,
    questionType:
      q.type === "single_choice"
        ? "MULTIPLE_CHOICE"
        : q.type === "multiple_choice"
        ? "MULTIPLE_CHOICE"
        : q.type === "text"
        ? "SHORT_ANSWER"
        : "SHORT_ANSWER",

    orderIndex: qIndex + 1,
    isRequired: q.required,

    options:
      q.type === "single_choice" || q.type === "multiple_choice"
        ? q.options.map((opt: any, i: number) => ({
            optionText: opt.text,
            orderIndex: i + 1,
          }))
        : [],
  }))
}
