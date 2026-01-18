// ================= SURVEY TYPES =================

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

// ================= API TYPES (BACKEND) =================

export type ApiQuestionType =
  | "MULTIPLE_CHOICE"
  | "SINGLE_CHOICE"
  | "SHORT_ANSWER"

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

// ================= BUILDER TYPES (FRONTEND) =================

export type BuilderQuestionType =
  | "single_choice"
  | "multiple_choice"
  | "text"
  | "long_text"
  | "rating"
  | "matrix"
  | "nps"

export interface BuilderOption {
  uuid: string
  text: string
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
  isLong?: boolean
  validationType?: string
}
