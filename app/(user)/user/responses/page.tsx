"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ResponseFilters } from "@/components/responses/ResponseFilter"
import { Eye, Trash2 } from "lucide-react"
import Link from "next/link"
// Mock data
const mockResponses = [
  {
    id: "RES-001",
    submittedAt: "2023-10-25 14:30",
    completion: 100,
    timeTaken: "2m 15s",
    ip: "192.168.x.x",
    status: "Completed",
  },
  {
    id: "RES-002",
    submittedAt: "2023-10-25 15:45",
    completion: 100,
    timeTaken: "3m 10s",
    ip: "10.0.0.x",
    status: "Completed",
  },
  {
    id: "RES-003",
    submittedAt: "2023-10-26 09:12",
    completion: 45,
    timeTaken: "1m 05s",
    ip: "172.16.x.x",
    status: "Partial",
  },
  {
    id: "RES-004",
    submittedAt: "2023-10-26 11:20",
    completion: 100,
    timeTaken: "1m 55s",
    ip: "192.168.x.x",
    status: "Completed",
  },
  {
    id: "RES-005",
    submittedAt: "2023-10-27 10:05",
    completion: 100,
    timeTaken: "2m 40s",
    ip: "10.0.0.x",
    status: "Completed",
  },
]
export default function ResponsesPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const [selectedResponses, setSelectedResponses] = useState<string[]>([])
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedResponses(mockResponses.map((r) => r.id))
    } else {
      setSelectedResponses([])
    }
  }
  const toggleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedResponses([...selectedResponses, id])
    } else {
      setSelectedResponses(selectedResponses.filter((r) => r !== id))
    }
  }
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Responses</h1>
          <p className="text-gray-500">View and manage individual survey responses.</p>
        </div>
        {selectedResponses.length > 0 && (
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
            <span className="text-sm font-medium text-[#00a368]">{selectedResponses.length} selected</span>
            <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <ResponseFilters onSearch={() => {}} onStatusChange={() => {}} onExport={() => {}} />

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="p-4 w-10">
                  <Checkbox
                    checked={selectedResponses.length === mockResponses.length && mockResponses.length > 0}
                    onCheckedChange={(checked) => toggleSelectAll(!!checked)}
                  />
                </th>
                <th className="p-4">Response ID</th>
                <th className="p-4">Submitted At</th>
                <th className="p-4">Status</th>
                <th className="p-4">Time Taken</th>
                <th className="p-4">IP Address</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockResponses.map((response) => (
                <tr key={response.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedResponses.includes(response.id)}
                      onCheckedChange={(checked) => toggleSelect(response.id, !!checked)}
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    <Link
                      href={`/surveys/${params.id}/responses/${response.id}`}
                      className="hover:text-[#00a368] hover:underline"
                    >
                      {response.id}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-600">{response.submittedAt}</td>
                  <td className="p-4">
                    <Badge
                      variant={response.status === "Completed" ? "default" : "secondary"}
                      className={
                        response.status === "Completed"
                          ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200"
                      }
                    >
                      {response.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-gray-600">{response.timeTaken}</td>
                  <td className="p-4 text-gray-600 font-mono text-xs">{response.ip}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/surveys/${params.id}/responses/${response.id}`}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4 text-gray-500" />
                        </Button>
                      </Link>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <span>Showing 1-5 of 5 responses</span>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
