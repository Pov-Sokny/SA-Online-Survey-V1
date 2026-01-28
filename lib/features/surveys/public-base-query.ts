// lib/api/public-base-query.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const publicBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json")
    return headers
  },
})
