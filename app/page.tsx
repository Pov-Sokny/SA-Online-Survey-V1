"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
    else {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  return (
    <div></div>
  )
}
