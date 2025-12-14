import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API_BASE_URL = "https://aa7ea781de46.ngrok-free.app/api/v1"

export interface LoginRequest {
  username?: string
  email?: string
  password: string
}

export interface LoginResponse {
  token?: string
  accessToken?: string
  jwt?: string
  user?: {
    id: string
    email: string
    name?: string
    username?: string
  }
  // Spring Boot might include user data at root level
  id?: string
  email?: string
  name?: string
  username?: string
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
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
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
      transformResponse: (response: any) => {
        console.log("[v0] Spring Boot login response:", response)
        return response
      },
      invalidatesTags: ["Auth"],
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => "/auth/me",
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
