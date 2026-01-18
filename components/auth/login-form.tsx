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
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"

// import NextImage from "next/image";
// import {Image} from "@heroui/react";

export function LoginForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const GOOGLE_LOGIN_URL =
    process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL ??
    "https://sa-api.supersurvey.live/oauth2/authorization/google?prompt=select_account"

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL
  }


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

      await new Promise((resolve) => setTimeout(resolve, 300))

      toast.success("Login successful 🎉", {
        description: "Welcome back! bro/sis",
      })



      try {
        const result = await dispatch(
          authApi.endpoints.getCurrentUser.initiate(undefined, { forceRefetch: true }),
        ).unwrap()

        if (result) {
          dispatch(setCredentials({ user: result }))
          const userRoles = result.roles?.replace(/[[\]]/g, "") || ""
          if (userRoles.includes("ADMIN")) {
            router.push("/admin")
          } else {
            router.push("/user")
          }
        } else {
          setError("Failed to fetch user data. Please try again.")
        }
      } catch (fetchError: any) {
        if (fetchError?.status === 401) {
          setError(
            "Authentication failed. Please login again.",
          )
        } else {
          setError("Failed to load user profile. Please try again.")
        }
      }
    } catch (err: any) {
      if (err?.message?.includes("CORS") || err?.name === "TypeError") {
        setError("Connection blocked. Backend CORS must allow origin 'http://localhost:3000' with credentials: true")
      } else if (err.status === 401) {
        /*setError("Invalid credentials. Please try again.")*/

        toast.error("Login failed", {
          description:
            err?.data?.message ||
            err?.error ||
            "Invalid email or password",
        })

      } else if (err.status === 404) {
        /*setError("Login endpoint not found. Please contact support.")*/

        toast.error("Login failed", {
          description:
            err?.data?.message ||
            err?.error ||
            "Login endpoint not found. Please contact support.",
        })

      } else if (err.status === 500) {
        /*setError("Server error. Please try again later.")*/

        toast.error("Login failed", {
          description:
            err?.data?.message ||
            err?.error ||
            "Server error. Please try again later.",
        })

      } else if (err.status === 503) {

        toast.error("Login failed", {
          description:
            err?.data?.message ||
            err?.error ||
            "Server error. please contact",
        })
      }
      else {
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
        backgroundImage:
          "url('https://resource.supersurvey.live/api/v1/files/background/smooth?type=BGLOGIN')",
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
              {/* <Image
                // src="/auth/test1.jpg"
                src="https://resource.supersurvey.live/api/v1/files/background/smooth?type=LOGIN"
                alt="Login Image"
                //fill
                // priority
                // quality={100}
                // unoptimized
                // placeholder="blur"
                fill
                priority
                //placeholder="blur"
                blurDataURL={'https://resource.supersurvey.live/api/v1/files/view/fc3009b3-1dc8-4938-9f44-1bb15aea7ff2.png'}
                style={{ objectFit: 'cover' }}
                sizes="(min-width: 1024px) 50vw, 0vw"
                className="object-cover object-fit opacity-100"
              /> */}
              <Image
                src="https://resource.supersurvey.live/api/v1/files/background/smooth?type=LOGIN"
                alt="Login Image"
                fill
                priority
                style={{ objectFit: 'cover' }}
                sizes="(min-width: 1024px) 50vw, 100vw" // Changed 0vw to 100vw so it shows on mobile
                className="opacity-100"
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

                {/* Start Login with google */}
                <Separator className="my-4 bg-white/20" />
                

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="
                    w-full rounded-xl
                    flex items-center justify-center gap-2
                    border-white/30
                    bg-primary/10
                    text-gray-200
                    hover:bg-primary hover:border-primay hover:text-white"
                >
                  <Image
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    width={18}
                    height={18}
                  />
                  Login with Google
                </Button>
                {/* End Login with google */}

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
