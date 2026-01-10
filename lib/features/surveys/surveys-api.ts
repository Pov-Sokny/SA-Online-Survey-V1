import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { SurveyRequest, SurveyResponse, SurverResponeList } from "@/lib/types/survey-type"

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

interface SurveysContentResponse {
  content: SurverResponeList[]
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
      { sortBy?: string; orderBy?: "ASC" | "DESC" }
    >({
      query: ({ sortBy = "title", orderBy = "ASC" } = {}) => ({
        url: "/surveys/my-survey",
        method: "POST",
        params: {
          sortBy,
          orderBy,
        },
        credentials: "include",
      }),
      providesTags: ["Survey"],
    }),

  }),
})

export const { useCreateSurveyMutation, useGetSurveysQuery } = surveyApi
