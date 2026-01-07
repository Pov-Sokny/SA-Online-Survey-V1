"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemName: string
  itemType?: string
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = "survey",
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {itemType}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Are you sure?</h3>
          <p className="text-sm text-gray-500 mb-6">
            This action cannot be undone. This will permanently delete <strong>{itemName}</strong> and remove all
            associated data.
          </p>
          <div className="flex space-x-3 w-full">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
