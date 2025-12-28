"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
  authApi,
} from "@/lib/features/auth/auth-api"
import { setCredentials } from "@/lib/features/auth/auth-slice"
import { useAppDispatch } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Loader2,
  Mail,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function VerifyOtpFormInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation()
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation()

  const emailFromUrl = searchParams.get("email") || ""

  const [email] = useState(emailFromUrl)
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (!email) {
      router.push("/register")
    }
  }, [email, router])

  // 👉 rest of your existing logic remains unchanged
  // handleVerifyOtp, handleResendOtp, JSX, etc.
}
