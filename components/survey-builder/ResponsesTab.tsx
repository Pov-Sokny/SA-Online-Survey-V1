import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Clock, CheckCircle2, Users } from "lucide-react"
export function ResponsesTab() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Responses</p>
            <h3 className="text-2xl font-bold">124</h3>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-full text-[#00a368]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completion Rate</p>
            <h3 className="text-2xl font-bold">87%</h3>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-full text-purple-600">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg. Time</p>
            <h3 className="text-2xl font-bold">2m 14s</h3>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-4">
          <div className="p-3 bg-orange-50 rounded-full text-orange-600">
            <ExternalLink className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Response</p>
            <h3 className="text-xl font-bold">2 mins ago</h3>
          </div>
        </Card>
      </div>

      {/* Charts Section Placeholder */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Response Trend</h3>
          <select className="text-sm border-gray-200 rounded-md">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>All time</option>
          </select>
        </div>
        <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center text-gray-400">
          Chart Visualization Placeholder
        </div>
      </Card>

      {/* Responses Table */}
      <Card>
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Individual Responses</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Respondent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Taken
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Anonymous #{1000 + i}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 24, 2023 10:{30 + i} AM</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1m {45 + i}s</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#00a368] hover:text-[#008f5b]">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
