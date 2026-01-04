"use client"

import { LoginForm } from "@/components/auth/login-form"
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated && user) {
      const roles = user.roles || ""
      if (roles.includes("ADMIN")) {
        router.push("/admin")
      } else {
        router.push("/user")
      }
    }
  }, [isAuthenticated, user, router])

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
      {/* <Test1 /> */}
    </div>
  )
}
