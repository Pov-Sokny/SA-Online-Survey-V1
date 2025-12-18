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

export function LoginForm2() {
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
    <Card
      className="
        relative z-10
        w-full max-w-sm sm:max-w-md
        rounded-2xl
        border border-white/20
        bg-white/40
        backdrop-blur-md
        shadow-2xl
      "
    >
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-xl sm:text-2xl font-semibold text-primary">
          Login
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-muted-foreground">
          Enter your information to login to Survey Online
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email">Email or Username</Label>
            <Input
              id="email"
              type="text"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="focus-visible:ring-primary"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="
              w-full rounded-xl
              bg-primary text-white
              hover:bg-primary/90
            "
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-secondary hover:underline"
          >
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
    
  </div>
)
}
