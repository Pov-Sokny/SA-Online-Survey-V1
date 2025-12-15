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
}

export function ProtectedRoute({ children, redirectTo = "/login" }: ProtectedRouteProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [isChecking, setIsChecking] = useState(true)

  const { data: user, error, isLoading } = useGetCurrentUserQuery()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (error) {
      if ((error as any)?.status === 401) {
        dispatch(logout())
        router.push(redirectTo)
      } else if ((error as any)?.status === 404) {
        dispatch(logout())
        router.push(redirectTo)
      }
      setIsChecking(false)
      return
    }

    if (user) {
      dispatch(restoreAuth({ user }))
      setIsChecking(false)
    }
  }, [user, error, isLoading, router, dispatch, redirectTo])

  if (isChecking || isLoading) {
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
