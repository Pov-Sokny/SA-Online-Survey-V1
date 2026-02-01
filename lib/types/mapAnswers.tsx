import { ApiQuestion } from "@/lib/types/survey-type";

function mapAnswers(questions: ApiQuestion[], formData: FormData) {
  return questions.map((q) => {
    const value = formData[q.uuid];

    if (!value) return null;

    // Choice questions
    if (q.questionType === "SINGLE_CHOICE") {
      return {
        questionUuid: q.uuid,
        optionUuid: [value as string],
        answerText: null,
      };
    }

    if (q.questionType === "MULTIPLE_CHOICE") {
      return {
        questionUuid: q.uuid,
        optionUuid: value as string[],
        answerText: null,
      };
    }

    // Text questions
    return {
      questionUuid: q.uuid,
      optionUuid: [],
      answerText: value as string,
    };
  }).filter(Boolean);
}
