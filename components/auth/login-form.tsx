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
import Image from "next/image"

// import NextImage from "next/image";
// import {Image} from "@heroui/react";

export function LoginForm() {
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
    "
      style={{
        // backgroundImage: "url('/auth/login1.jpg')",
        backgroundImage: "url('https://resource.supersurvey.live/api/v1/files/view/454e0af5-8485-44ab-a8fb-433d47ce1712.jpg')",
      }}
    >
      {/* Dark / gradient overlay for readability */}
      <div className="absolute inset-0 bg-black/30 " />

      <section className="relative z-10 w-full max-w-5xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
          {/* LEFT: Image (Desktop only, clear & optimized) */}
          <div className="hidden lg:block relative">
            <div className="hidden lg:block relative min-h-[520px] isolate">
              {/* <Image
                // as={NextImage}
                src="https://resource.supersurvey.live/api/v1/files/view/c60f5f54-9975-4161-86b4-53ab1b83b61b.jpg"
                alt="Login illustration"
                // fill
                className="object-cover"
                radius="none"
              /> */}
              <Image
                // src="/auth/test1.jpg"
                src="https://resource.supersurvey.live/api/v1/files/view/c60f5f54-9975-4161-86b4-53ab1b83b61b.jpg"
                alt="Login illustration"
                fill
                priority
                quality={100}
                unoptimized
                sizes="(min-width: 1024px) 50vw, 0vw"
                className="object-cover object-fit opacity-100"
              />
              {/* <img src="./auth/login-image.jpg" alt=""  width={10000} height={1000}/> */}
            </div>
          </div>

          {/* RIGHT: Login Form */}
          <div className="flex items-center justify-center lg:bg-white/10 lg:backdrop-blur-xl md:p-6 lg:p-10">
            <Card
              className="
          w-full max-w-sm
          rounded-2xl
          border border-white/20
          bg-white/12 dark:bg-black/20
          backdrop-blur-[10px]
        "
            >
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-300">Login</CardTitle>
                <CardDescription className="text-gray-200">
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

                  <div className="space-y-2">
                    <Label className="text-gray-300">Email or Username</Label>
                    <Input
                      className="text-gray-100"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Password</Label>
                    <Input
                      type="password"
                      className="text-gray-100"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <Button className="w-full rounded-xl" disabled={isLoading}>
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

              <CardFooter className="justify-center">
                <p className="text-sm text-gray-200">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Register
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
