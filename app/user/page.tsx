"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"

export default function UserPage() {
  return (
    <ProtectedRoute allowedRoles={["USER"]}>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <h1 className="text-3xl font-bold">User page</h1>
      </div>
    </ProtectedRoute>
  )
}
