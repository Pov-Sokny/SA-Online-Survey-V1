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
})


  }),
})

export const { useCreateSurveyMutation, useGetSurveysQuery,useCreateQuestionsMutation, useGetQuestionsBySurveyUuidQuery } = surveyApi
