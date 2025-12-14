"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Provider } from "react-redux"
import { makeStore, type AppStore } from "@/lib/store"
import { restoreAuth } from "@/lib/features/auth/auth-slice"
import { authApi } from "@/lib/features/auth/auth-api"

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await storeRef.current?.dispatch(authApi.endpoints.getCurrentUser.initiate())

        if (result?.data) {
          console.log("[v0] Auth restored from API, status: 200")
          storeRef.current?.dispatch(
            restoreAuth({
              user: result.data,
            }),
          )
        } else {
          console.log("[v0] Not authenticated, status:", result?.error?.status || "unknown")
        }
      } catch (error) {
        console.log("[v0] Auth check failed:", error)
      }
    }

    checkAuth()
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}
