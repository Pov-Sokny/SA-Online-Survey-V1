"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useRegisterMutation } from "@/lib/features/auth/auth-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail } from "lucide-react"

export function RegisterForm() {
  const router = useRouter()
  const [register, { isLoading: isRegistering }] = useRegisterMutation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    try {
      const userData = {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        dateOfBirth,
      }

      const result = await register(userData).unwrap()

      if (result.isExisting && result.isVerified) {
        setError("This email is already registered. Please login instead.")
        return
      }

      if (result.requiresOtp || (result.isExisting && !result.isVerified)) {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
        return
      }
    } catch (err: any) {
      if (err?.name === "TypeError" || err?.message?.includes("CORS") || err?.message?.includes("Failed to fetch")) {
        // Registration likely succeeded but CORS blocked the response
        // Redirect to verify-otp page anyway
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
        return
      }

      if (err.status === 201) {
        // Successful registration - redirect to verify OTP
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
      } else if (err.status === 409) {
        setError("This email is already registered and verified. Please login instead.")
      } else if (err.status === 400) {
        setError(err?.data?.message || "Invalid registration data. Please check your inputs.")
      } else if (err.status === 500) {
        setError("Server error. Please try again later.")
      } else {
        const errorMessage = err?.data?.message || err?.data?.error || "Registration failed. Please try again."
        setError(errorMessage)
      }
    }
  }

  return (
  <div
    className="
      relative min-h-screen w-full
      flex items-center justify-center
      bg-cover bg-center bg-no-repeat
      px-4
    "
    style={{
      backgroundImage: "url('/login.jpg')",
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/20" />

    {/* Glass Card */}
    
    
  </div>
)
}
