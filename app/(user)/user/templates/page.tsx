"use client"

import { useState, Suspense } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { TemplateCategories } from "@/components/templates/TemplateCategories"
import { TemplateCard, type Template } from "@/components/templates/TemplateCard"
import { TemplatePreview } from "@/components/templates/TemplatePreview"
import Link from "next/link"
// Mock data
const templates: Template[] = [
  {
    id: "1",
    title: "Customer Satisfaction Survey (CSAT)",
    description: "Measure customer satisfaction with your product or service to identify areas for improvement.",
    category: "Customer Feedback",
    questionCount: 10,
    timeEstimate: "2 min",
    popular: true,
  },
  {
    id: "2",
    title: "Employee Engagement Survey",
    description: "Understand how engaged your employees are and what drives their motivation.",
    category: "Employee Engagement",
    questionCount: 15,
    timeEstimate: "5 min",
    popular: true,
  },
  {
    id: "3",
    title: "Product Market Fit Survey",
    description: "Determine if your product satisfies a strong market demand.",
    category: "Market Research",
    questionCount: 8,
    timeEstimate: "3 min",
    popular: false,
  },
  {
    id: "4",
    title: "Event Registration Form",
    description: "Collect attendee information and preferences for your upcoming event.",
    category: "Event Registration",
    questionCount: 6,
    timeEstimate: "2 min",
    popular: false,
  },
  {
    id: "5",
    title: "Course Evaluation",
    description: "Get feedback from students about course content, instructor, and overall experience.",
    category: "Education",
    questionCount: 12,
    timeEstimate: "4 min",
    popular: false,
  },
  {
    id: "6",
    title: "Patient Feedback Form",
    description: "Collect patient feedback to improve healthcare services and patient experience.",
    category: "Healthcare",
    questionCount: 9,
    timeEstimate: "3 min",
    popular: false,
  },
  {
    id: "7",
    title: "Net Promoter Score (NPS)",
    description: "The industry standard for measuring customer loyalty and brand sentiment.",
    category: "Customer Feedback",
    questionCount: 2,
    timeEstimate: "1 min",
    popular: true,
  },
  {
    id: "8",
    title: "Website Feedback",
    description: "Gather insights from visitors about their experience on your website.",
    category: "Market Research",
    questionCount: 5,
    timeEstimate: "2 min",
    popular: false,
  },
]

function TemplatesContent() {
  const [selectedCategory, setSelectedCategory] = useState("All Templates")
  const [searchQuery, setSearchQuery] = useState("")
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "All Templates" || template.category === selectedCategory
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Survey Templates</h1>
          <p className="text-gray-500 mt-1">Start with a pre-built template or create your own.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link href="/surveys/new">
            <Button className="bg-[#00a368] hover:bg-[#008f5b] whitespace-nowrap">
              <Plus className="h-4 w-4 mr-2" />
              Create Custom
            </Button>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <TemplateCategories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      {/* Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} onPreview={setPreviewTemplate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <Search className="h-full w-full" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No templates found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or category filter.</p>
          <Button
            variant="outline"
            className="mt-4 bg-transparent"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All Templates")
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Preview Modal */}
      <TemplatePreview template={previewTemplate} isOpen={!!previewTemplate} onClose={() => setPreviewTemplate(null)} />
    </div>
  )
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={null}>
      <TemplatesContent />
    </Suspense>
  )
}
