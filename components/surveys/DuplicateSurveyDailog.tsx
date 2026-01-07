"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DuplicateSurveyDialogProps {
  isOpen: boolean
  onClose: () => void
  onDuplicate: (data: any) => void
  originalTitle: string
}

export function DuplicateSurveyDialog({ isOpen, onClose, onDuplicate, originalTitle }: DuplicateSurveyDialogProps) {
  const [title, setTitle] = useState(`Copy of ${originalTitle}`)
  const [options, setOptions] = useState({
    questions: true,
    logic: true,
    settings: true,
    branding: true,
    responses: false,
  })
  const [folder, setFolder] = useState("none")

  const handleDuplicate = () => {
    onDuplicate({
      title,
      options,
      folder,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Duplicate Survey</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Survey Name</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter survey name" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What to copy?</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="questions"
                  checked={options.questions}
                  onCheckedChange={(checked) =>
                    setOptions({
                      ...options,
                      questions: checked as boolean,
                    })
                  }
                />
                <label htmlFor="questions" className="text-sm">
                  Questions & Pages
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="logic"
                  checked={options.logic}
                  onCheckedChange={(checked) =>
                    setOptions({
                      ...options,
                      logic: checked as boolean,
                    })
                  }
                />
                <label htmlFor="logic" className="text-sm">
                  Logic Rules & Flow
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="settings"
                  checked={options.settings}
                  onCheckedChange={(checked) =>
                    setOptions({
                      ...options,
                      settings: checked as boolean,
                    })
                  }
                />
                <label htmlFor="settings" className="text-sm">
                  Settings & Configuration
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="branding"
                  checked={options.branding}
                  onCheckedChange={(checked) =>
                    setOptions({
                      ...options,
                      branding: checked as boolean,
                    })
                  }
                />
                <label htmlFor="branding" className="text-sm">
                  Branding & Themes
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="responses" disabled checked={options.responses} />
                <label htmlFor="responses" className="text-sm text-gray-400">
                  Responses (Not recommended)
                </label>
                <span className="ml-2 text-xs text-gray-400">(Disabled)</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination Folder</label>
            <Select value={folder} onValueChange={setFolder}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">My Surveys (Root)</SelectItem>
                <SelectItem value="folder1">Customer Feedback</SelectItem>
                <SelectItem value="folder2">Employee Engagement</SelectItem>
                <SelectItem value="folder3">Market Research</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="bg-transparent">
              Cancel
            </Button>
            <Button variant="default" onClick={handleDuplicate}>
              Duplicate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
