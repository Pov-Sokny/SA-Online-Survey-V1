export interface SurveyRequest {
  title: string
  description?: string
}

export interface SurveyResponse {
  message: string
  surveyId?: string
  id?: string
  createdAt?: string
}

export interface SurverResponeList {
  uuid: string
  title: string
  description: string
  startDate: string
  closeDate: string
  isPublic: string
  isClosed: string
  surveyType: string
}

export interface SurveyListResponse {
  content: SurverResponeList[]
  message?: string
}

export interface QuestionOption {
  text: string
  value?: string
}

export interface Question {
  id?: string
  type: "single_choice" | "multiple_choice" | "text" | "long_text" | "rating" | "matrix"
  title: string
  description?: string
  required: boolean
  options?: QuestionOption[]
  rows?: string[]
  columns?: string[]
  maxRating?: number
  symbol?: string
}

export interface CreateQuestionRequest {
  questions: Question[]
}

export interface CreateQuestionResponse {
  message: string
  questionIds?: string[]
}
