"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { UserMenu } from "@/components/auth/user-menu"
import { useAppSelector } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Question from "@/components/form-create-survey/Question"

export default function CreateSurvey() {
  const { user } = useAppSelector((state) => state.auth)

  return (
      <ProtectedRoute>
        <div className="min-h-screen ">
          <header className="border-b flex items-center justify-center">
            <div className="container flex h-16 items-center justify-between ">
              <div className="flex items-center gap-2">
                 <Image src="/logo.jpg" alt="Supersuvey logo" width={36} height={36} className="rounded-lg" />
                  <span className="font-bold text-xl text-brand-dark text-primary">Super Suvey</span>
              </div>
              <UserMenu />
            </div>
          </header>

          <main>
            <Question />
          </main>

        </div>
      </ProtectedRoute>
  )
}
