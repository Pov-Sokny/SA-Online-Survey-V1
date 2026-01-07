import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sa-api.supersurvey.live/api/v1"

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

export const surveyApi = createApi({
  reducerPath: "surveyApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Survey"],
  endpoints: (builder) => ({
    createSurvey: builder.mutation<SurveyResponse, SurveyRequest>({
      query: (surveyData) => ({
        url: "/surveys",
        method: "POST",
        body: surveyData,
        credentials: "include",
      }),
      invalidatesTags: ["Survey"],
    }),
    // getAllSurverys: builder.query<SurverResponeList, { type: string }>({
    //     query: ({ type }) => ({
    //         url: `/files/background?type=${type}`,
    //     }),
    //     invalidatesTags: ["Survey"],
    // }),
  }),
})

export const { useCreateSurveyMutation } = surveyApi
