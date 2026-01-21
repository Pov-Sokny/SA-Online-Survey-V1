import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Book, MessageCircle, Video, FileText, Settings, Shield } from "lucide-react"

export default function HelpCenterPage() {
  const categories = [
    {
      icon: FileText,
      title: "Getting Started",
      desc: "Learn the basics of creating your first survey",
    },
    {
      icon: Settings,
      title: "Account & Billing",
      desc: "Manage your subscription and account details",
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      desc: "How we protect your data and compliance",
    },
    {
      icon: Book,
      title: "Survey Best Practices",
      desc: "Tips for creating effective surveys",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      desc: "Step-by-step video guides",
    },
    {
      icon: MessageCircle,
      title: "Contact Support",
      desc: "Get help from our support team",
    },
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12">
      {/* Hero Search */}
      <div className="text-center py-12 bg-[#00a368]/5 rounded-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h1>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input className="pl-12 h-12 text-lg shadow-sm" placeholder="Search for articles, guides, and more..." />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <Card key={i} className="p-6 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00a368] transition-colors">
              <cat.icon className="h-6 w-6 text-[#00a368] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{cat.title}</h3>
            <p className="text-gray-500">{cat.desc}</p>
          </Card>
        ))}
      </div>

      {/* Popular Articles */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "How to export survey data",
            "Integrating with Google Sheets",
            "Customizing survey themes",
            "Understanding NPS calculation",
          ].map((article, i) => (
            <div
              key={i}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-[#00a368] cursor-pointer transition-colors flex items-center justify-between"
            >
              <span className="text-gray-700 font-medium">{article}</span>
              <Book className="h-4 w-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
