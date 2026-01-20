import { CheckCircle, Share2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-8 text-center animate-in zoom-in-95 duration-500">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-[#00a368]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 text-lg mb-8">
          Your response has been successfully recorded. We appreciate your time and feedback.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-sm text-gray-500">
          Response ID: <span className="font-mono font-medium text-gray-900">RES-8X92-MN23</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            Share Survey
          </Button>
          <Link href="/">
            <Button className="w-full sm:w-auto flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
