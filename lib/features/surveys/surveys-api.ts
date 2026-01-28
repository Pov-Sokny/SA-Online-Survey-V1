import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { SurveyRequest, SurveyResponse, SurverResponeList, Question, CreateQuestionResponse, } from "@/lib/types/survey-type"
import { mapQuestionsToApi } from "@/lib/types/mapQuestionsToApi"
import type { ApiQuestion } from "@/lib/types/survey-type"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sa-api.supersurvey.live/api/v1"

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("ngrok-skip-browser-warning", "true")
    headers.set("Content-Type", "application/json")
    return headers
  },
})

interface ShareResponse {
  link: string
  qrCodeUrl: string
}

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST", credentials: "include" },
      api,
      extraOptions,
    )

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

interface PageInfo {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

interface SurveysContentResponse {
  content: SurverResponeList[]
  page: PageInfo
}

interface ShareResponse {
  link: string
  qrCodeUrl: string
}

interface ResponseSubmission {
  surveyUuid: string
  responses: Array<{
    questionUuid: string
    answer: string | string[]
  }>
}

interface SubmitResponseResult {
  message: string
  responseUuid?: string
}

interface PublicSurvey {
  uuid: string
  title: string
  description: string
  startDate: string | null
  closeDate: string | null
  surveyType: string
  questions: ApiQuestion[]
}


export const surveyApi = createApi({
  reducerPath: "surveyApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Survey"],
  endpoints: (builder) => ({
    createSurvey: builder.mutation<SurveysContentResponse, SurveyRequest>({
      query: (surveyData) => ({
        url: "/surveys",
        method: "POST",
        body: surveyData,
        credentials: "include",
      }),
      invalidatesTags: ["Survey"],
    }),
    getSurveys: builder.query<
      SurveysContentResponse,
      {
        sortBy?: string
        orderBy?: "ASC" | "DESC"
        title_like?: string
        pageSize?: number
        pageNumber?: number
      }
    >({
      query: ({
        sortBy = "title",
        orderBy = "ASC",
        title_like,
        pageSize = 10,
        pageNumber = 0,
      } = {}) => ({
        url: "/surveys/my-survey",
        method: "POST",
        params: {
          sortBy,
          orderBy,
          pageSize,
          pageNumber,
          ...(title_like ? { title_like } : {}),
        },
        credentials: "include",
      }),
      providesTags: ["Survey"],
    }),

    createQuestions: builder.mutation<
      CreateQuestionResponse,
      { surveyUuid: string; questions: ApiQuestion[] }
    >({
      query: ({ surveyUuid, questions }) => ({
        url: `/surveys/${surveyUuid}/question`,
        method: "PATCH",
        body: questions, // 👈 MUST be array
        credentials: "include",
      }),
      invalidatesTags: ["Survey"],
    }),

    getQuestionsBySurveyUuid: builder.query<Question[], string>({
      query: (uuid) => `/surveys/${uuid}/question`,
    }),

    shareSurvey: builder.mutation<ShareResponse, string>({
      query: (surveyUuid) => ({
        url: "/surveys/share?stg=dev",
        method: "POST",
        body: { surveyUuid },
        credentials: "include",
      }),
    }),

    getPublicSurvey: builder.query<PublicSurvey, string>({
      query: (slug) => `/surveys/share/${slug}`,
    }),

    // ADD THIS ENDPOINT
    getSurveyByUuid: builder.query<SurveyResponse, string>({
      query: (uuid) => `/surveys/${uuid}`,
    }),

    submitResponse: builder.mutation<SubmitResponseResult, ResponseSubmission>({
      query: (data) => ({
        url: `/surveys/${data.surveyUuid}/response`,
        method: "POST",
        body: {
          responses: data.responses,
        },
      }),
    }),

  }),
})

export const { useCreateSurveyMutation, useGetSurveysQuery,
  useCreateQuestionsMutation, useGetQuestionsBySurveyUuidQuery,
  useShareSurveyMutation, useGetPublicSurveyQuery,
  useSubmitResponseMutation, useGetSurveyByUuidQuery } = surveyApi
