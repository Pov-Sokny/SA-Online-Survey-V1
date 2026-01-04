"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <h1 className="text-3xl font-bold">Admin Page</h1>
      </div>
    </ProtectedRoute>
  )
}
