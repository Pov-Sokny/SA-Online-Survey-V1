"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { QuestionEditor } from "@/components/survey-builder/QuestionEditor"
import { ResponsesTab } from "@/components/survey-builder/ResponsesTab"
import { SettingsTab } from "@/components/survey-builder/SettingsTab"

import {
  useCreateQuestionsMutation,
  useGetQuestionsBySurveyUuidQuery,
} from "@/lib/features/surveys/surveys-api"

import { mapApiQuestionsToBuilder } from "@/lib/types/mapQuestionsToApi"
import { mapBuilderQuestionsToApi } from "@/lib/types/mapBuilderQuestionsToApi"
import type { BuilderQuestion } from "@/lib/types/survey-type"

export default function SurveyEditorPage() {
  const { uuid: surveyUuid } = useParams<{ uuid: string }>()

  const [questions, setQuestions] = useState<BuilderQuestion[]>([])

  const { data, isLoading, isError } =
    useGetQuestionsBySurveyUuidQuery(surveyUuid, {
      skip: !surveyUuid,
    })

  const [createQuestions, { isLoading: isSaving }] =
    useCreateQuestionsMutation()

  useEffect(() => {
    if (data) {
      setQuestions(mapApiQuestionsToBuilder(data))
    }
  }, [data])

  if (!surveyUuid) return <div>Loading survey...</div>
  if (isLoading) return <div>Loading questions...</div>
  if (isError) return <div className="text-red-500">Failed to load</div>

  const handleSave = async () => {
    try {
      const payload = mapBuilderQuestionsToApi(questions)

      await createQuestions({
        surveyUuid,
        questions: payload,
      }).unwrap()

      alert("Saved ✅")
    } catch (e) {
      console.error(e)
      alert("Save failed ❌")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/user/surveys">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold flex items-center gap-2">
              Edit Survey  
              <Badge variant="outline">Draft</Badge>
            </h1>
          </div>

          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <Tabs defaultValue="questions">
          <TabsList>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

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
        </Tabs>
      </main>
    </div>
  )
}
