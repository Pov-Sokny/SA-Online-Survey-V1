"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { UserMenu } from "@/components/auth/user-menu"
import { useAppSelector } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <UserMenu />
          </div>
        </header>

        <main className="container py-8">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>You are successfully logged in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
                {user?.name && (
                  <p className="text-sm">
                    <span className="font-medium">Name:</span> {user.name}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
