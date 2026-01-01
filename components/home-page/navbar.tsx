import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6 px-8 md:px-12 lg:px-24">
      <div className="flex items-center gap-2">
        <span className="text-xl font-serif font-bold tracking-tight">Moment</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
          Products
        </Link>
        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
          Resources
        </Link>
        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
          Company
        </Link>
      </div>
      <Button variant="default" className="rounded-full px-6 py-5 h-auto text-sm">
        Request Access
      </Button>
    </nav>
  )
}
