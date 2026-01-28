// lib/features/surveys/public-survey-api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { ApiQuestion } from "@/lib/types/survey-type"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://sa-api.supersurvey.live/api/v1"

/* =========================
   Types
========================= */

export interface PublicSurvey {
  uuid: string
  title: string
  description: string
  questions: ApiQuestion[]
}

export interface PublicSurveyResponse {
  questionUuid: string
  answer: string
}

export interface SubmitPublicSurveyPayload {
  surveyUuid: string
  responses: PublicSurveyResponse[]
}

/* =========================
   API
========================= */

export const publicSurveyApi = createApi({
  reducerPath: "publicSurveyApi",

  // 🚨 PUBLIC API — NO AUTH, NO COOKIES
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "omit",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json")
      return headers
    },
  }),

  tagTypes: ["PublicSurvey"],

  endpoints: (builder) => ({
    /* -------- Get public survey -------- */
    getPublicSurvey: builder.query<PublicSurvey, string>({
      query: (slage) => `/surveys/share/${slage}`,
      providesTags: (_result, _error, uuid) => [
        { type: "PublicSurvey", id: uuid },
      ],
    }),

    /* -------- Submit survey response -------- */
    submitPublicResponse: builder.mutation<
      { message: string },
      SubmitPublicSurveyPayload
    >({
      query: ({ surveyUuid, responses }) => ({
        url: `/surveys/${surveyUuid}/response`,
        method: "POST",
        body: { responses },
      }),
      invalidatesTags: (_result, _error, { surveyUuid }) => [
        { type: "PublicSurvey", id: surveyUuid },
      ],
    }),
  }),
})

/* =========================
   Hooks
========================= */

export const {
  useGetPublicSurveyQuery,
  useSubmitPublicResponseMutation,
} = publicSurveyApi
