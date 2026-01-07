"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FolderInput } from "lucide-react"

interface MoveSurveyDialogProps {
  isOpen: boolean
  onClose: () => void
  onMove: (folderId: string) => void
  itemCount: number
}

export function MoveSurveyDialog({ isOpen, onClose, onMove, itemCount }: MoveSurveyDialogProps) {
  const [folder, setFolder] = useState("none")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Move {itemCount} Item{itemCount !== 1 ? "s" : ""}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg mb-4">
            <FolderInput className="h-8 w-8 text-gray-400 mr-3" />
            <div className="text-sm text-gray-600">Select a destination folder for the selected items.</div>
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
                <SelectItem value="folder4">Events</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="bg-transparent">
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => {
                onMove(folder)
                onClose()
              }}
            >
              Move Items
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
