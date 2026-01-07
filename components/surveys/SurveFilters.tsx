"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

interface SurveyFiltersProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: any) => void
}

export function SurveyFilters({ isOpen, onClose, onApply }: SurveyFiltersProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl border-l transform transition-transform z-50 flex flex-col">
      <div className="p-4 border-b flex items-center justify-between bg-gray-50">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Status Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Status</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="active" defaultChecked />
              <label htmlFor="active" className="text-sm">
                Active
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="draft" defaultChecked />
              <label htmlFor="draft" className="text-sm">
                Draft
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="closed" />
              <label htmlFor="closed" className="text-sm">
                Closed
              </label>
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Date Range</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">From</label>
              <Input type="date" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">To</label>
              <Input type="date" />
            </div>
          </div>
        </div>

        {/* Responses */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Responses</h4>
          <div className="flex items-center space-x-2">
            <Input type="number" placeholder="Min" className="w-1/2" />
            <span className="text-gray-400">-</span>
            <Input type="number" placeholder="Max" className="w-1/2" />
          </div>
        </div>

        {/* Tags */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {["Urgent", "Q3", "Feedback", "Internal", "Client"].map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs cursor-pointer hover:bg-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t bg-gray-50 flex space-x-3">
        <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
          Clear All
        </Button>
        <Button variant="default" className="flex-1" onClick={() => onApply({})}>
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
