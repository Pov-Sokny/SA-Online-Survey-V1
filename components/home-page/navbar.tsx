import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.jpg" alt="Supersuvey logo" width={36} height={36} className="rounded-lg" />
          <span className="font-bold text-xl text-brand-dark text-primary">Super Suvey</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Resources
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            About Us
          </Link>
        </div>
        <Button variant="default" className=" px-6 py-3 h-auto text-sm">
          Login
        </Button>
      </div>
    </nav>
  )
}
