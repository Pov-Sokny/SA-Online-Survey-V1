"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useGetCurrentUserQuery } from "@/lib/features/auth/auth-api"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { restoreAuth, logout } from "@/lib/features/auth/auth-slice"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  allowedRoles?: string[]
}

export function ProtectedRoute({ children, redirectTo = "/login", allowedRoles }: ProtectedRouteProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [isChecking, setIsChecking] = useState(true)

  const {
    data: user,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  })

  useEffect(() => {
    // Wait until the initial fetch is complete
    if (isLoading || isFetching) return

    if (isError || error || !user) {
      console.log("[v0] Security: Authentication failed or no session found. Redirecting to login.")
      dispatch(logout())
      router.replace(redirectTo) // Using replace to prevent back-button loops
      setIsChecking(false)
      return
    }

    if (user) {
      dispatch(restoreAuth({ user }))

      if (allowedRoles && user.roles) {
        // Strip brackets [ ] and split roles
        const userRoles = user.roles
          .replace(/[[\]]/g, "")
          .split(",")
          .map((r) => r.trim())

        const hasRole = allowedRoles.some((role) => userRoles.includes(role))

        if (!hasRole) {
          console.log("[v0] Security: Unauthorized role access. Redirecting to authorized zone.")
          if (userRoles.includes("ADMIN")) {
            router.replace("/admin")
          } else if (userRoles.includes("USER")) {
            router.replace("/user")
          } else {
            router.replace("/login")
          }
          return
        }
      }

      setIsChecking(false)
    }
  }, [user, error, isError, isLoading, isFetching, router, dispatch, redirectTo, allowedRoles])

  if (isChecking || isLoading || isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
