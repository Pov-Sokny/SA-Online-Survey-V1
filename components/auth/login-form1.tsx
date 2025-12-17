"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useLoginMutation, authApi } from "@/lib/features/auth/auth-api"
import { setCredentials } from "@/lib/features/auth/auth-slice"
import { useAppDispatch } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export function LoginForm1() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const credentials = {
        email,
        username: email,
        password,
      }

      await login(credentials).unwrap()

      await new Promise((resolve) => setTimeout(resolve, 100))

      try {
        const result = await dispatch(authApi.endpoints.getCurrentUser.initiate()).unwrap()

        if (result) {
          dispatch(setCredentials({ user: result }))
          router.push("/dashboard")
        } else {
          setError("Failed to fetch user data. Please try again.")
        }
      } catch (fetchError: any) {
        if (fetchError?.status === 401) {
          setError(
            "Authentication failed. Check backend Set-Cookie header includes: Path=/; HttpOnly; SameSite=None; Secure (for ngrok)",
          )
        } else {
          setError("Failed to load user profile. Please try again.")
        }
      }
    } catch (err: any) {
      if (err?.message?.includes("CORS") || err?.name === "TypeError") {
        setError("Connection blocked. Backend CORS must allow origin 'http://localhost:3000' with credentials: true")
      } else if (err.status === 401) {
        setError("Invalid credentials. Please try again.")
      } else if (err.status === 404) {
        setError("Login endpoint not found. Please contact support.")
      } else if (err.status === 500) {
        setError("Server error. Please try again later.")
      } else {
        const errorMessage =
          err?.data?.message || err?.data?.error || err?.error || "Login failed. Please check your credentials."
        setError(errorMessage)
      }
    }
  }

return (
  <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0b1e] flex items-center justify-center px-4">
    {/* Gradient Blobs */}
    <div className="absolute -top-32 -left-32 h-[320px] w-[320px] rounded-full bg-gradient-to-br from-green-400 to-cyan-400 blur-3xl opacity-90" />
    <div className="absolute -bottom-40 right-0 h-[360px] w-[360px] rounded-full bg-gradient-to-br from-pink-500 to-orange-400 blur-3xl opacity-90" />

    {/* Glass Card */}
    <Card
      className="
        relative z-10
        w-full max-w-xs sm:max-w-sm
        rounded-2xl
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        shadow-2xl
      "
    >
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-xl font-semibold text-white">
          Sign In
        </CardTitle>
        <CardDescription className="text-white/70 text-sm">
          Enter your information to login
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1">
            <Label className="text-white/80">Email or Username</Label>
            <Input
              className="
                bg-white/20
                border-white/20
                text-white
                placeholder:text-white/50
                focus-visible:ring-primary
              "
              id="email"
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-white/80">Password</Label>
            <Input
              className="
                bg-white/20
                border-white/20
                text-white
                placeholder:text-white/50
                focus-visible:ring-primary
              "
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
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
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-xs text-white/60">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  </div>
)
}