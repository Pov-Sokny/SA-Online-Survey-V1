"use client"

import { RegisterForm } from "@/components/auth/register-form"
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RegisterPage() {
  const router = useRouter()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) {
    return null
  }
  // </CHANGE>

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* <RegisterForm /> */}
      <RegisterForm />
    </div>
  )
}
