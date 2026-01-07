"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Archive } from "lucide-react"

interface ArchiveSurveyDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  surveyTitle: string
}

export function ArchiveSurveyDialog({ isOpen, onClose, onConfirm, surveyTitle }: ArchiveSurveyDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archive Survey</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
            <Archive className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Archive "{surveyTitle}"?</h3>
          <p className="text-sm text-gray-500 mb-6">
            Archived surveys will be moved to the Archive folder. They will no longer accept new responses, but existing
            data will be preserved. You can unarchive them later.
          </p>
          <div className="flex space-x-3 w-full">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Archive
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
