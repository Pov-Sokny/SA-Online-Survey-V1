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


export type ApiQuestionType =
  | "MULTIPLE_CHOICE"
  | "SINGE_CHOICE"
  | "SHORT_ANSWER"

export interface ApiOption {
  optionText: string
  orderIndex: number
}

export interface ApiQuestion {
  questionText: string
  questionType: ApiQuestionType
  orderIndex: number
  isRequired: boolean
  options: ApiOption[]
}

export type QuestionType = "SINGLE_CHOICE" | "MULTIPLE_CHOICE"

export interface QuestionOption {
  uuid: string
  orderIndex: number
  optionText: string
}

export interface QuestionOptionRequest {
  orderIndex: number
  optionText: string
}

export interface Question {
  uuid: string
  questionText: string
  questionType: QuestionType
  orderIndex: number
  isRequired: boolean
  options?: QuestionOption[]
}

export interface QuestionRequest {
  uuid: string
  questionText: string
  questionType: QuestionType
  orderIndex: number
  isRequired: boolean
  options?: QuestionOptionRequest[]
}


export interface BuilderOption {
  uuid: string
  text: string
  orderIndex: number
}

export interface BuilderQuestion {
  uuid: string
  type: "single_choice" | "multiple_choice" | "text" | "rating" | "matrix"
  title: string
  description?: string
  required: boolean
  options?: BuilderOption[]
  rows?: string[]
  columns?: string[]
  maxRating?: number
  symbol?: string
  isLong?: boolean
  validationType?: string
}


// ================= BACKEND =================


export interface ApiOption {
  uuid: string
  optionText: string
  orderIndex: number
}

export interface ApiQuestion {
  uuid: string
  questionText: string
  questionType: ApiQuestionType
  orderIndex: number
  isRequired: boolean
  options: ApiOption[]
}

// ================= BUILDER (FRONTEND) =================

export type BuilderQuestionType =
  | "single_choice"
  | "multiple_choice"
  | "text"
  | "rating"
  | "matrix"

export interface BuilderOption {
  uuid: string
  optionText: string
  orderIndex: number
}

export interface BuilderQuestion {
  uuid: string
  type: BuilderQuestionType
  title: string
  description?: string
  required: boolean
  orderIndex?: number
  options?: BuilderOption[]
  rows?: string[]
  columns?: string[]
  maxRating?: number
  symbol?: string
}
