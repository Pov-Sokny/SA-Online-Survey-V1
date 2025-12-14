import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://aa7ea781de46.ngrok-free.app/api/v1"

export interface LoginRequest {
  username?: string
  email?: string
  password: string
}

export interface LoginResponse {
  message: string
}

export interface User {
  id: string
  email: string
  name?: string
  username?: string
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      console.log("[v0] Making API request with credentials: include")
      // Add ngrok headers to bypass browser warning
      headers.set("ngrok-skip-browser-warning", "true")
      headers.set("Content-Type", "application/json")
      return headers
    },
  }),
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: "/auth/me",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User"],
    }),
  }),
})

export const { useLoginMutation, useGetCurrentUserQuery, useLogoutMutation } = authApi
