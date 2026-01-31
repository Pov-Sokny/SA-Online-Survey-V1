"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  isPublic: boolean
}

export function PublicSurveyConfirmDialog({
  open,
  onClose,
  onConfirm,
  isPublic,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isPublic ? "Make survey private?" : "Publish survey?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isPublic
              ? "This survey will no longer be accessible by public link."
              : "Anyone with the link will be able to view and respond to this survey."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
