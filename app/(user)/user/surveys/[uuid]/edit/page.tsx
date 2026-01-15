"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, Share2, MoreHorizontal, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { QuestionEditor } from "@/components/survey-builder/QuestionEditor"
import { ResponsesTab } from "@/components/survey-builder/ResponsesTab"
import { SettingsTab } from "@/components/survey-builder/SettingsTab"

import { useCreateQuestionsMutation } from "@/lib/features/surveys/surveys-api"
import { mapQuestionsToApi } from "@/lib/types/mapQuestionsToApi"

import { useParams } from "next/navigation"

export function test() {

  const params = useParams()
  
  const surveyUuid = params?.uuid as string

  console.log("UUID from useParams():", surveyUuid)

  if (!surveyUuid) {
    return <div>Loading survey...</div>
  }

}

export default function SurveyEditorPage() {
  /** ✅ SURVEY UUID */
  const params = useParams()
  
  const surveyUuid = params?.uuid as string


  console.log("UUID:", surveyUuid)

  /*test()*/

  const [questions, setQuestions] = useState<any[]>([
    {
      uuid: crypto.randomUUID(),
      type: "single_choice",
      title: "How satisfied are you with our service?",
      description: "",
      required: true,
      options: [
        { uuid: crypto.randomUUID(), text: "Very satisfied" },
        { uuid: crypto.randomUUID(), text: "Satisfied" },
        { uuid: crypto.randomUUID(), text: "Neutral" },
      ],
    },
  ])

  const [createQuestions, { isLoading }] = useCreateQuestionsMutation()

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    try {
      const payload = mapQuestionsToApi(questions)

      await createQuestions({
        surveyUuid,
        questions: payload,
      }).unwrap()

      alert("Questions saved successfully ✅")
    } catch (err) {
      console.error(err)
      alert("Failed to save questions ❌")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/surveys" className="text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <h1 className="text-lg font-semibold flex items-center gap-2">
              Edit Survey
              <Badge variant="outline" className="text-xs">
                Draft
              </Badge>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>

            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            <Button
              size="sm"
              disabled={isLoading}
              onClick={handleSave}
              className="bg-[#00a368] hover:bg-[#008f5b] text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save"}
            </Button>

            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <Tabs defaultValue="questions">
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4">
              <TabsList className="h-12 bg-transparent p-0 space-x-6">
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="responses">Responses</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-8">
            <TabsContent value="questions">
              <QuestionEditor
                questions={questions}
                setQuestions={setQuestions}
              />
            </TabsContent>

            <TabsContent value="responses">
              <ResponsesTab />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsTab />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  )
}
