"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react"

import { useCreateSurveyMutation } from "@/lib/features/surveys/surveys-api"

import { ImageUpload } from "@/components/upload/image-upload"


export default function NewSurveyPage() {
  const router = useRouter()
  const [createSurvey, { isLoading }] = useCreateSurveyMutation()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const isSubmitting = isLoading || isUploading

  /* Create new sruvey */
  const handleCreateSurvey = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageName: string | undefined

      if (imageFile) {
        setIsUploading(true)

        const formData = new FormData()
        formData.append("file", imageFile)

        const res = await fetch(
          "https://resource.supersurvey.live/api/v1/files?resize=SD&compress=true&level=MEDIUM&type=SURVEY",
          { method: "POST", body: formData }
        )

        if (!res.ok) throw new Error("Image upload failed")

        const data = await res.json()
        imageName = data.name

        setIsUploading(false)
      }

      await createSurvey({
        title,
        description,
        image: imageName,
      }).unwrap()

      toast.success("Survey created 🎉")
      router.push("/user/surveys")

    } catch (error: any) {
      setIsUploading(false)

      toast.error("Create survey failed", {
        description: error?.message || "Something went wrong",
      })
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Back */}
      <Link
        href="/user"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <div>
        <h1 className="text-3xl font-bold">Create New Survey</h1>
        <p className="text-muted-foreground">
          Fill in the details and optionally upload a cover image.
        </p>
      </div>

      <Card className="p-8 space-y-8">
        <form onSubmit={handleCreateSurvey} className="space-y-6 max-w-2xl">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Survey Title</Label>
            <Input
              id="title"
              placeholder="e.g. Customer Satisfaction Survey"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe the purpose of this survey..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <ImageUpload
            preview={imagePreview}
            onSelect={(file) => {
              setImageFile(file)
              setImagePreview(URL.createObjectURL(file))
            }}
            onCancel={() => {
              setImageFile(null)
              setImagePreview(null)
            }}
          />

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="submit"
              className="bg-[#00a368] hover:bg-[#008f5b] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Survey"}
            </Button>

          </div>
        </form>
      </Card>
    </div>
  )
}
