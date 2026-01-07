"use client"

import { Label } from "@/components/ui/label"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Wand2, FileText, LayoutTemplate } from "lucide-react"
import Link from "next/link"
import { useCreateSurveyMutation } from "@/lib/features/surveys/surveys-api"


export default function NewSurveyPage() {
  const [title, setTitle] = useState("Untitled form")
  const [description, setDescription] = useState("Description")
  const [createSurvey, { isLoading }] = useCreateSurveyMutation()
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const [loading, setLoading] = useState(false)
//   const handleCreate = (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     // Simulate API call
//     setTimeout(() => {
//       router.push("/surveys/123/edit")
//     }, 1000)
//   }

  const handleCreateSurvey = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const surveyData = {
        title,
        description,
      }
      const result = await createSurvey(surveyData).unwrap()
      console.log("[v0] Survey created:", result)
    //   const surveyId = result.id || result.surveyId
    //   if (surveyId) {
    //     router.push(`/surveys/${surveyId}/edit`)
    //   }
    } catch (error: any) {
      console.log("[v0] Error creating survey:", error)
      setError(error?.data?.message || "Failed to create survey. Please try again.")
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/dashboard" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Survey</h1>
        <p className="text-gray-500 mt-2">Choose how you want to start building your survey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 cursor-pointer hover:border-[#00a368] transition-all hover:shadow-md group">
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-[#00a368] mb-4 group-hover:scale-110 transition-transform">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Start from Scratch</h3>
          <p className="text-sm text-gray-500">Build a survey from the ground up with our easy editor.</p>
        </Card>

        <Card className="p-6 cursor-pointer hover:border-[#00a368] transition-all hover:shadow-md group">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <LayoutTemplate className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Use a Template</h3>
          <p className="text-sm text-gray-500">Choose from 50+ expert-designed templates.</p>
        </Card>

        <Card className="p-6 cursor-pointer hover:border-[#00a368] transition-all hover:shadow-md group">
          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
            <Wand2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Generate with AI</h3>
          <p className="text-sm text-gray-500">Describe your goal and let AI build it for you.</p>
        </Card>
      </div>

      <h1 className="text-2xl font-bold py-4">Create Survey</h1>
      <div className="w-[95%] max-w-3xl bg-white border-t-8 border-emerald-500 rounded-t-2xl rounded-b-xl p-6 shadow-md">
        <form onSubmit={handleCreateSurvey} className="flex flex-col gap-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl text-gray-800 font-semibold border-b-2 border-gray-300 focus:outline-none focus:border-emerald-500 bg-transparent"
          />

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-base border-b-2 border-gray-300 focus:outline-none focus:border-emerald-500 bg-transparent"
          />

          <Button type="submit" disabled={isLoading} className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white">
            {isLoading ? "Creating..." : "Create Survey"}
          </Button>
        </form>
      </div>

    {/* <section className="w-screen min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-2xl font-bold py-4">Create Survey</h1>
      <div className="w-[95%] max-w-3xl bg-white border-t-8 border-emerald-500 rounded-t-2xl rounded-b-xl p-6 shadow-md">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl text-gray-800 font-semibold border-b-2 border-gray-300 focus:outline-none focus:border-emerald-500 bg-transparent"
          />

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-base border-b-2 border-gray-300 focus:outline-none focus:border-emerald-500 bg-transparent"
          />

          <Button
            onClick={handleCreateSurvey}
            disabled={isLoading}
            className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            {isLoading ? "Creating..." : "Create Survey"}
          </Button>
        </div>
      </div>


    </section> */}

    </div>
  )
}
