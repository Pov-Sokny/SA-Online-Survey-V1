"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Eye, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { QuestionEditor } from "@/components/survey-builder/QuestionEditor"
import { ResponsesTab } from "@/components/survey-builder/ResponsesTab"
import { SettingsTab } from "@/components/survey-builder/SettingsTab"

import {
  useCreateQuestionsMutation,
  useGetQuestionsBySurveyUuidQuery,
  useGetSurveysQuery,
} from "@/lib/features/surveys/surveys-api"

import { mapApiQuestionsToBuilder } from "@/lib/types/mapApiQuestionToBuilder"
import { mapBuilderQuestionsToApi } from "@/lib/types/mapBuilderQuestionsToApi"
import type { BuilderQuestion } from "@/lib/types/survey-type"

export default function SurveyEditorPage() {
  const { uuid } = useParams<{ uuid: string }>()
  const surveyUuid = uuid

  const [activeTab, setActiveTab] = useState("questions")
  const [questions, setQuestions] = useState<BuilderQuestion[]>([])
  const [surveyTitle, setSurveyTitle] = useState("")

  // Fetch survey details to get title
  const {
    data: surveysData,
    isLoading: surveysLoading,
  } = useGetSurveysQuery({})

  const {
    data,
    isLoading,
    isError,
  } = useGetQuestionsBySurveyUuidQuery(surveyUuid, {
    skip: !surveyUuid,
  })

  const [createQuestions, { isLoading: isSaving }] =
    useCreateQuestionsMutation()

  useEffect(() => {
    if (data) {
      setQuestions(mapApiQuestionsToBuilder(data))
    }
  }, [data])

  // Extract survey title from surveys list
  useEffect(() => {
    if (surveysData?.content) {
      const survey = surveysData.content.find(
        (s) => s.uuid === surveyUuid
      )
      if (survey) {
        setSurveyTitle(survey.title)
      }
    }
  }, [surveysData, surveyUuid])

  if (!surveyUuid) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading survey...
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading questions...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load questions
      </div>
    )
  }

  const handleSave = async () => {
    try {
      const payload = mapBuilderQuestionsToApi(questions)

      await createQuestions({
        surveyUuid,
        questions: payload,
      }).unwrap()

      alert("Survey saved successfully ✅")
    } catch (error) {
      console.error(error)
      alert("Failed to save survey ❌")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/user/surveys"
              className="hover:bg-gray-100 p-1 rounded"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>

            <h1 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
              Edit Survey
              <Badge variant="outline">Draft</Badge>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Preview */}
            <Link href={`/user/surveys/${surveyUuid}/preview`}>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </Link>

            {/* Share */}
            <Link href={`/user/surveys/${surveyUuid}/share`}>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </Link>

            {/* Save */}
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#00a368] hover:bg-[#008f5b] text-white gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="bg-white border-b sticky top-16 z-30">
              <TabsList className="justify-start rounded-none bg-transparent p-0 h-auto">
                <TabsTrigger value="questions">
                  Questions
                </TabsTrigger>
                <TabsTrigger value="responses">
                  Responses
                </TabsTrigger>
                <TabsTrigger value="settings">
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="questions" className="mt-0 p-6">
              <QuestionEditor
                surveyTitle={surveyTitle}
                questions={questions}
                setQuestions={setQuestions}
              />
            </TabsContent>

            <TabsContent value="responses" className="mt-0 p-6">
              <ResponsesTab />
            </TabsContent>

            <TabsContent value="settings" className="mt-0 p-6">
              <SettingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
