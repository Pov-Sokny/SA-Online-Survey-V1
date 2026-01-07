"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import { ArrowLeft, Wand2, FileText, LayoutTemplate } from "lucide-react"
import { useCreateSurveyMutation } from "@/lib/features/surveys/surveys-api"

export default function NewSurveyPage() {
  const [title, setTitle] = useState("Untitled form")
  const [description, setDescription] = useState("Description")

  const [createSurvey, { isLoading }] = useCreateSurveyMutation()
  const router = useRouter()

const handleCreateSurvey = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    await createSurvey({ title, description }).unwrap()

    toast.success("Survey created 🎉", {
      description: "Your survey was created successfully",
    })
  } catch (error: any) {
    toast.error("Create survey failed", {
      description:
        error?.data?.message ||
        error?.error ||
        "Something went wrong",
    })
  }
}




  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Survey</h1>
        <p className="text-gray-500 mt-2">
          Choose how you want to start building your survey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 hover:border-emerald-500 hover:shadow-md cursor-pointer">
          <FileText className="h-6 w-6 text-emerald-500 mb-3" />
          <h3 className="font-semibold">Start from Scratch</h3>
        </Card>

        <Card className="p-6 hover:border-emerald-500 hover:shadow-md cursor-pointer">
          <LayoutTemplate className="h-6 w-6 text-blue-500 mb-3" />
          <h3 className="font-semibold">Use a Template</h3>
        </Card>

        <Card className="p-6 hover:border-emerald-500 hover:shadow-md cursor-pointer">
          <Wand2 className="h-6 w-6 text-purple-500 mb-3" />
          <h3 className="font-semibold">Generate with AI</h3>
        </Card>
      </div>

      <h2 className="text-2xl font-bold py-4">Create Survey</h2>

      <div className="max-w-3xl bg-white border-t-8 border-emerald-500 rounded-xl p-6 shadow">
        <form onSubmit={handleCreateSurvey} className="flex flex-col gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-semibold border-b-2 focus:border-emerald-500 outline-none"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-b-2 focus:border-emerald-500 outline-none"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            {isLoading ? "Creating..." : "Create Survey"}
          </Button>
        </form>
      </div>
    </div>
  )
}
