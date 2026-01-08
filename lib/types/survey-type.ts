
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
    uuid: string,
    title: string,
    description: string,
    startDate: string,
    closeDate: string,
    isPublic: string,
    isClosed: string,
    surveyType: string
}