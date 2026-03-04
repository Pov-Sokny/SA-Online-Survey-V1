import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Calendar } from "lucide-react"
import { ResponseChart } from "@/components/analytics/ResponseChart"
import { NPSScore } from "@/components/analytics/NPSScore"
export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Survey Analytics</h1>
          <p className="text-gray-500">Customer Satisfaction Survey • Active</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="text-sm text-gray-500 mb-1">Total Responses</div>
          <div className="text-3xl font-bold text-gray-900">1,248</div>
          <div className="text-sm text-green-600 mt-2 flex items-center">↑ 12% from last month</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-500 mb-1">Completion Rate</div>
          <div className="text-3xl font-bold text-gray-900">86%</div>
          <div className="text-sm text-green-600 mt-2 flex items-center">↑ 4% from last month</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-500 mb-1">Avg. Time</div>
          <div className="text-3xl font-bold text-gray-900">2m 14s</div>
          <div className="text-sm text-gray-500 mt-2">Target: &lt; 3m</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-500 mb-1">NPS Score</div>
          <div className="text-3xl font-bold text-gray-900">42</div>
          <div className="text-sm text-green-600 mt-2 flex items-center">Excellent</div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponseChart title="Responses Over Time" type="line" data={[]} />
        <NPSScore score={42} promoters={560} passives={320} detractors={120} total={1000} />
      </div>

      {/* Question Breakdown */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Question Breakdown</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponseChart title="Q2: How long have you been using our product?" type="bar" data={[]} />
          <ResponseChart title="Q4: Feature Ratings (Matrix)" type="bar" data={[]} />
        </div>
      </div>
    </div>
  )
}
