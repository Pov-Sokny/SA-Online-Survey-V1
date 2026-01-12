"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import { ArrowLeft, Wand2, FileText, LayoutTemplate, Upload } from "lucide-react"
import { useCreateSurveyMutation } from "@/lib/features/surveys/surveys-api"

export default function NewSurveyPage() {
  const [title, setTitle] = useState("Untitled form")
  const [description, setDescription] = useState("Description")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const [createSurvey, { isLoading }] = useCreateSurveyMutation()
  const router = useRouter()

  // Select file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      setUploadedImageName(null) // reset previously uploaded
    }
  }

  // Upload image to server
  const handleUploadImage = async () => {
  if (!imageFile) return
  setIsUploading(true)

  try {
    const formData = new FormData()
    formData.append("file", imageFile)

    const res = await fetch(
      "https://resource.supersurvey.live/api/v1/files",
      {
        method: "POST",
        body: formData,          // <- Do NOT set Content-Type manually
        // credentials: "include" // optional, not needed for public upload
      }
    )

    if (!res.ok) throw new Error("Upload failed")
    const data = await res.json()
    setUploadedImageName(data.name)
    toast.success("Image uploaded successfully!")
  } catch (err: any) {
    toast.error("Image upload failed", {
      description: err.message || "Try again",
    })
  } finally {
    setIsUploading(false)
  }
}



  // Create survey
  const handleCreateSurvey = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createSurvey({
        title,
        description,
        image: uploadedImageName || undefined,
      }).unwrap()

      toast.success("Survey created 🎉", { description: "Your survey was created successfully" })
      router.push("/surveys")
    } catch (error: any) {
      toast.error("Create survey failed", {
        description: error?.data?.message || error?.error || "Something went wrong",
      })
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Back link */}
      <Link href="/dashboard" className="inline-flex items-center text-gray-500 hover:text-gray-900">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-gray-900">Create New Survey</h1>
      <p className="text-gray-500">Fill in details and optionally upload an image for your survey.</p>

      <Card className="p-6 space-y-4">
        <form onSubmit={handleCreateSurvey} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Survey Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter survey title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Survey Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter survey description"
              required
            />
          </div>

          {/* Image upload */}
          <div>
            <Label>Upload Image (optional)</Label>
            <div className="flex items-center gap-4">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {imageFile && (
                <Button
                  type="button"
                  onClick={handleUploadImage}
                  disabled={isUploading || uploadedImageName !== null}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {isUploading ? "Uploading..." : uploadedImageName ? "Uploaded" : "Upload"}
                </Button>
              )}
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 max-h-48 rounded border border-gray-200 object-cover"
              />
            )}
          </div>

          {/* Create button */}
          <Button
            type="submit"
            disabled={isLoading || (imageFile && !uploadedImageName)}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            {isLoading ? "Creating..." : "Create Survey"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
