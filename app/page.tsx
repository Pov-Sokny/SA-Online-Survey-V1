"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

import { HeroSection } from "@/components/home-page/hero-section"
import { SocialProofSection } from "@/components/home-page/social-proof-section"
import { FeaturesSection } from "@/components/home-page/features-section"

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
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span className="font-bold text-xl text-brand-dark">SurveyPop</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-brand-green font-medium transition-colors">
              Features
            </a>
            <a href="#" className="text-gray-600 hover:text-brand-green font-medium transition-colors">
              Examples
            </a>
            <a href="#" className="text-gray-600 hover:text-brand-green font-medium transition-colors">
              Pricing
            </a>
          </div>
          <button className="font-bold text-brand-dark hover:text-brand-green transition-colors cursor-pointer">
            Log in
          </button>
        </div>
      </nav>

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
