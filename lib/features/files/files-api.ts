import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sa-api.supersurvey.live/api/v1"

export interface BackgroundFile {
  id: string
  url: string
  name?: string
  type?: string
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

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: baseQuery,
  tagTypes: ["Files"],
  endpoints: (builder) => ({
    getBackgroundFile: builder.query<BackgroundFile, { type: string }>({
      query: ({ type }) => ({
        url: `/files/background?type=${type}`,
      }),
      providesTags: ["Files"],
    }),
  }),
})

export const { useGetBackgroundFileQuery } = filesApi
