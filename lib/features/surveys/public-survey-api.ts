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

export interface SubmitSurveyPayload {
  startTime: string
  surveyUuid: string
  fingerprint: string
  browserUuid: string
  answers: {
    questionUuid: string
    optionUuid: string[]
    answerText: string | null
  }[]
}

export interface SubmitResponseResult {
  message: string
  responseUuid?: string
}

/* =========================
   API
========================= */

export const publicSurveyApi = createApi({
  reducerPath: "publicSurveyApi",

  // 🚨 PUBLIC API — NO AUTH
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "omit",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json")
      headers.delete("Authorization") // 🔥 VERY IMPORTANT
      return headers
    },
  }),

  endpoints: (builder) => ({
    /* -------- Get public survey -------- */
    getPublicSurvey: builder.query<
      PublicSurvey,
      {
        uuid: string
        fingerprint: string
        browserUuid: string
      }
    >({
      query: ({ uuid, fingerprint, browserUuid }) => ({
        url: `/responses/share/${uuid}`,
        method: "POST",
        body: {
          fingerprint,
          browserUuid,
        },
      }),
    }),




    /* -------- Submit response -------- */
    submitResponse: builder.mutation<
      SubmitResponseResult,
      SubmitSurveyPayload
    >({
      query: (body) => ({
        url: "/responses/submit",
        method: "POST",
        body,
      }),
    }),


  }),
})

/* =========================
   Hooks
========================= */

export const {
  useGetPublicSurveyQuery,
  useSubmitResponseMutation,
} = publicSurveyApi
