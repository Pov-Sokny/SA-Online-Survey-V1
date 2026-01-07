"use client"

import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Sidebar } from "@/components/dahsboard/Sidebar"
import { Header } from "@/components/dahsboard/Header"
import { Toaster } from "sonner"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={["USER"]}>
      <div className="flex min-h-screen bg-gray-100">
        
        {/* Sidebar */}
        <aside className="sticky top-0 h-screen w-64 bg-white">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex flex-1 flex-col">
          {/* Header (optional sticky) */}
          <Header />

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
            <Toaster position="top-right" richColors />
          </div>
        </main>

      </div>
    </ProtectedRoute>
  )
}
