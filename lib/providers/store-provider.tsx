"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Provider } from "react-redux"
import { makeStore, type AppStore } from "@/lib/store"
import { restoreAuth } from "@/lib/features/auth/auth-slice"

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
    // Restore auth state from localStorage on mount
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token")
      const userStr = localStorage.getItem("user")

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr)
          storeRef.current?.dispatch(restoreAuth({ token, user }))
        } catch (error) {
          console.error("Failed to restore auth state:", error)
          localStorage.removeItem("auth_token")
          localStorage.removeItem("user")
        }
      }
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}
