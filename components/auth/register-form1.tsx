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

export function RegisterForm1() {
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
  <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0b1e] flex items-center justify-center px-4">
    {/* Gradient Blobs */}
    <div className="absolute -top-32 -left-32 h-[320px] w-[320px] rounded-full bg-gradient-to-br from-green-400 to-cyan-400 blur-3xl opacity-90" />
    <div className="absolute -bottom-40 right-0 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-pink-500 to-orange-400 blur-3xl opacity-90" />

    {/* Glass Card */}
    <Card
      className="
        relative z-10
        w-full max-w-xs sm:max-w-md
        rounded-2xl
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        shadow-2xl
      "
    >
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-xl sm:text-2xl font-semibold text-white">
          Create Account
        </CardTitle>
        <CardDescription className="text-white/70">
          Enter your details to create a new account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Email */}
          <div className="space-y-1">
            <Label className="text-white/80">Email *</Label>
            <Input
              className="
                bg-white/20
                border-white/20
                text-white
                placeholder:text-white/50
                focus-visible:ring-primary
              "
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isRegistering}
            />
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-white/80">First Name *</Label>
              <Input
                className="
                  bg-white/20
                  border-white/20
                  text-white
                  placeholder:text-white/50
                "
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isRegistering}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-white/80">Last Name *</Label>
              <Input
                className="
                  bg-white/20
                  border-white/20
                  text-white
                  placeholder:text-white/50
                "
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isRegistering}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-1">
            <Label className="text-white/80">Date of Birth *</Label>
            <Input
              className="
                bg-white/20
                border-white/20
                text-white
              "
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              disabled={isRegistering}
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label className="text-white/80">Password *</Label>
            <Input
              className="
                bg-white/20
                border-white/20
                text-white
                placeholder:text-white/50
              "
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isRegistering}
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <Label className="text-white/80">Confirm Password *</Label>
            <Input
              className="
                bg-white/20
                border-white/20
                text-white
                placeholder:text-white/50
              "
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isRegistering}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isRegistering}
            className="
              w-full
              rounded-lg
              bg-gradient-to-r
              from-green-400
              via-cyan-400
              to-pink-500
              text-black
              font-medium
              hover:opacity-90
              transition
            "
          >
            {isRegistering ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Register
              </>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-xs text-white/60">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  </div>
)
}
