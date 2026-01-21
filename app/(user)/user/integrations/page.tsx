"use client"

import { useState } from "react"
import { IntegrationCard } from "@/components/integrations/IntegrationCard"
import { Input } from "@/components/ui/input" // Fixed Input import from capital to lowercase
import { Search } from "lucide-react"
const INTEGRATIONS = [
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Automatically send new survey responses to a Google Sheet in real-time.",
    category: "Productivity",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg",
    status: "connected" as const,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get notified in a Slack channel whenever a new response is submitted.",
    category: "Communication",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    status: "available" as const,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect your surveys to 5,000+ apps via Zapier automation workflows.",
    category: "Automation",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zapier_logo.svg",
    status: "available" as const,
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Add respondents to your Mailchimp audience and trigger email campaigns.",
    category: "Marketing",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Mailchimp_Freddie_icon.svg",
    status: "available" as const,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Create leads or update contacts in Salesforce from survey responses.",
    category: "CRM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    status: "beta" as const,
  },
  {
    id: "webhooks",
    name: "Webhooks",
    description: "Send JSON payloads to any URL when survey events occur.",
    category: "Developer",
    logo: "",
    status: "available" as const,
  },
]
export default function IntegrationsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const categories = ["All", "Productivity", "Communication", "Automation", "Marketing", "CRM", "Developer"]
  const filteredIntegrations = INTEGRATIONS.filter(
    (i) =>
      (category === "All" || i.category === category) &&
      (i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.description.toLowerCase().includes(search.toLowerCase())),
  )
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-500 mt-2">Supercharge your surveys by connecting with your favorite tools.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search integrations..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${category === cat ? "bg-[#00a368] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <IntegrationCard key={integration.id} integration={integration} />
        ))}
      </div>
    </div>
  )
}
