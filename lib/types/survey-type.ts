export interface SurveyRequest {
  title: string
  description?: string
  image?: string
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
