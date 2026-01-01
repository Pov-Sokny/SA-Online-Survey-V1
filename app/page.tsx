"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

import { HeroSection } from "@/components/home-page/hero-section"
import { SocialProofSection } from "@/components/home-page/social-proof-section"
import { FeaturesSection } from "@/components/home-page/features-section"
import { Navbar } from "@/components/home-page/navbar"

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push("/dashboard")
  //   }
  //   else {
  //     router.push("/login")
  //   }
  // }, [isAuthenticated, router])

  return (
    <main className="min-h-screen w-full bg-brand-cream selection:bg-brand-yellow selection:text-brand-dark">
      
      {/* Navigation */}
      <Navbar />

      {/* Home page */}
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />

      {/* Footer */}
      <footer className="py-12 mt-20 bg-white border-t border-gray-100 text-center">
        <p className="text-gray-400">© 2026 SurveyPop. Made with ❤️ and ☕️</p>
      </footer>
      
    </main>
  )
}
