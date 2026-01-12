"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageIcon, X, RefreshCcw } from "lucide-react"

interface ImageUploadProps {
  preview?: string | null
  onSelect: (file: File) => void
  onCancel: () => void
}

export function ImageUpload({
  preview,
  onSelect,
  onCancel,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="border-2 border-dashed rounded-lg p-6 space-y-4 text-center">
      {!preview ? (
        <>
          <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Upload a cover image for your survey
          </p>

          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onSelect(file)
            }}
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
          >
            Choose Image
          </Button>
        </>
      ) : (
        <>
          <img
            src={preview}
            alt="Preview"
            className="mx-auto max-h-48 rounded-md object-cover"
          />

          <div className="flex justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Change
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={onCancel}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>

          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onSelect(file)
            }}
          />
        </>
      )}
    </div>
  )
}
