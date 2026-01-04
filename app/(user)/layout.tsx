"use client"

import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Sidebar } from "@/components/dahsboard/Sidebar"
import { Header } from "@/components/dahsboard/Header"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={["USER"]}>
      <div className="flex min-h-screen">
        <div>
            <Sidebar />
        </div>
        <main className="flex flex-1 flex-col bg-gray-100">
            <Header />
            <div className="flex-1 p-4 ">{children}</div>
        </main>
    </div> 
    </ProtectedRoute>
  )
}
