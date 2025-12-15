"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useVerifyOtpMutation, useResendOtpMutation, authApi } from "@/lib/features/auth/auth-api"
import { setCredentials } from "@/lib/features/auth/auth-slice"
import { useAppDispatch } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, ArrowLeft, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export function VerifyOtpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation()
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation()

  const emailFromUrl = searchParams.get("email") || ""

  const [email, setEmail] = useState(emailFromUrl)
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (!email) {
      router.push("/register")
    }
  }, [email, router])

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsExpired(false)

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    try {
      const result = await verifyOtp({ email, token: otp }).unwrap()

      setSuccess(result.message || "Email verified successfully!")

      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (result.user) {
        dispatch(setCredentials({ user: result.user }))
        router.push("/dashboard")
      } else {
        try {
          const userData = await dispatch(authApi.endpoints.getCurrentUser.initiate()).unwrap()
          if (userData) {
            dispatch(setCredentials({ user: userData }))
            router.push("/dashboard")
          }
        } catch {
          router.push("/login")
        }
      }
    } catch (err: any) {
      if (err.status === 400) {
        const errorMsg = err?.data?.message || "Invalid or expired OTP"
        setError(errorMsg)

        if (errorMsg.toLowerCase().includes("expired")) {
          setIsExpired(true)
        }
      } else if (err.status === 404) {
        setError("Verification failed. User not found.")
        setIsExpired(true)
      } else if (err.status === 410) {
        setError("OTP has expired. Please request a new one.")
        setIsExpired(true)
      } else if (err.status === 500) {
        setError("Server error. Please try again later.")
      } else {
        setError(err?.data?.message || err?.data?.error || "OTP verification failed. Please try again.")
      }
    }
  }

  const handleResendOtp = async () => {
    setError(null)
    setSuccess(null)
    setIsExpired(false)
    setOtp("")

    try {
      const result = await resendOtp({ email }).unwrap()
      setSuccess(result.message || "New OTP sent to your email!")
    } catch (err: any) {
      if (err.status === 404) {
        setError("Email not found. Please register first.")
        setTimeout(() => router.push("/register"), 2000)
      } else if (err.status === 429) {
        setError("Too many requests. Please wait a moment before resending.")
      } else if (err.status === 400 && err?.data?.message?.includes("already verified")) {
        setSuccess("Email already verified! Redirecting to login...")
        setTimeout(() => router.push("/login"), 2000)
      } else {
        setError(err?.data?.message || "Failed to resend OTP. Please try again.")
      }
    }
  }

  const handleBackToRegister = () => {
    router.push("/register")
  }

  if (!email) {
    return null
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Verify Your Email</CardTitle>
        <CardDescription className="text-balance">
          Enter the 6-digit OTP sent to <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-100">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Label htmlFor="otp" className="text-center block">
              Enter OTP Code
            </Label>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={isVerifying}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="text-xs text-center text-muted-foreground">Check your email inbox and spam folder</p>
          </div>

          <Button type="submit" className="w-full" disabled={isVerifying || otp.length !== 6}>
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Verify Email
              </>
            )}
          </Button>

          {isExpired || error ? (
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleResendOtp}
                disabled={isResending || isVerifying}
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend OTP
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={handleBackToRegister}
                disabled={isVerifying || isResending}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Register
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <Button type="button" variant="ghost" size="sm" onClick={handleBackToRegister} disabled={isVerifying}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={handleResendOtp}
                disabled={isResending || isVerifying}
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already verified?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login here
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
