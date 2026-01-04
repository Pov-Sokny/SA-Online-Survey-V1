import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sa-api.supersurvey.live/api/v1"

export interface LoginRequest {
  username?: string
  email?: string
  password: string
}

export interface LoginResponse {
  message: string
}

export interface RegisterRequest {
  email: string
  password: string
  name?: string
  username?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  confirmPassword: string
}

export interface RegisterResponse {
  message: string
  requiresOtp: boolean
  isExisting?: boolean
  isVerified?: boolean
}

export interface VerifyOtpRequest {
  email: string
  token: string // Changed from 'otp' to 'token' to match backend
}

export interface VerifyOtpResponse {
  message: string
  user?: User
}

export interface ResendOtpRequest {
  email: string
}

export interface User {
  id: string
  email: string
  name?: string
  username?: string
  roles?: string // Backend returns "[USER]" or "[ADMIN]" as a string
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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
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
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (data) => ({
        url: "/auth/email-verification",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    resendOtp: builder.mutation<{ message: string }, ResendOtpRequest>({
      query: (data) => ({
        url: "/auth/email-verification/token",
        method: "POST",
        body: data,
      }),
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
    refreshToken: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApi
