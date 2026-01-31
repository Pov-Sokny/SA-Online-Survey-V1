"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Eye, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { QuestionEditor } from "@/components/survey-builder/QuestionEditor"
import { QuestionEditor1 } from "@/components/survey-builder/QuestionEditor1"
import { ResponsesTab } from "@/components/survey-builder/ResponsesTab"
import { SettingsTab } from "@/components/survey-builder/SettingsTab"

import {
  useCreateQuestionsMutation,
  useGetQuestionsBySurveyUuidQuery,
  useGetSurveyByUuidQuery,
} from "@/lib/features/surveys/surveys-api"

import { mapApiQuestionsToBuilder } from "@/lib/types/mapApiQuestionToBuilder"
import { mapBuilderQuestionsToApi } from "@/lib/types/mapBuilderQuestionsToApi"
import type { BuilderQuestion } from "@/lib/types/survey-type"

import { useRouter } from "next/navigation"
import { useToggleSurveyPublicMutation } from "@/lib/features/surveys/surveys-api"
import { PublicSurveyConfirmDialog } from "@/components/modal/PublicSurveyConfirmDialog"


export default function SurveyEditorPage() {
  const { uuid } = useParams<{ uuid: string }>()
  const surveyUuid = uuid

  const [activeTab, setActiveTab] = useState("questions")
  const [questions, setQuestions] = useState<BuilderQuestion[]>([])
  const [surveyTitle, setSurveyTitle] = useState("")

  const router = useRouter()
  const [toggleOpen, setToggleOpen] = useState(false)
  const [toggleSurveyPublic] = useToggleSurveyPublicMutation()


  /** =======================
   *  FETCH SURVEY (TITLE)
   *  ======================= */
  const {
    data: surveyData,
    isLoading: surveyLoading,
  } = useGetSurveyByUuidQuery(surveyUuid, {
    skip: !surveyUuid,
  })

  /** =======================
   *  FETCH QUESTIONS
   *  ======================= */
  const {
    data: questionsData,
    isLoading: questionsLoading,
    isError: questionsError,
  } = useGetQuestionsBySurveyUuidQuery(surveyUuid, {
    skip: !surveyUuid,
  })

  /** =======================
   *  MUTATIONS
   *  ======================= */
  const [createQuestions, { isLoading: isSaving }] =
    useCreateQuestionsMutation()

  /** =======================
   *  EFFECTS
   *  ======================= */
  useEffect(() => {
    if (surveyData?.title) {
      setSurveyTitle(surveyData.title)
    }
  }, [surveyData])

  useEffect(() => {
    if (questionsData) {
      setQuestions(mapApiQuestionsToBuilder(questionsData))
    }
  }, [questionsData])

  /** =======================
   *  LOADING / ERROR STATES
   *  ======================= */
  if (!surveyUuid) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading survey...
      </div>
    )
  }

  if (surveyLoading || questionsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  if (questionsError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load questions
      </div>
    )
  }

  /** =======================
   *  HANDLERS
   *  ======================= */
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

  const handleShareClick = () => {
    if (!surveyData?.isPublic) {
      setToggleOpen(true) // open confirm modal
      return
    }

    router.push(`/user/surveys/${surveyUuid}/share`)
  }

  const handleConfirmMakePublic = async () => {
    try {
      await toggleSurveyPublic({ uuid: surveyUuid }).unwrap()
      setToggleOpen(false)
      router.push(`/user/surveys/${surveyUuid}/share`)
    } catch (err) {
      console.error(err)
      alert("Failed to make survey public")
    }
  }



  /** =======================
   *  RENDER
   *  ======================= */
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
            <Link href={`/user/surveys/${surveyUuid}/preview`}>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </Link>

            {/* <Link href={`/user/surveys/${surveyUuid}/share`}>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </Link> */}

            <Button variant="ghost" size="sm" onClick={handleShareClick}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>


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
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="responses">Responses</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
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

          {toggleOpen && (
            <PublicSurveyConfirmDialog
              open
              isPublic={false}
              onClose={() => setToggleOpen(false)}
              onConfirm={handleConfirmMakePublic}
            />
          )}

        </div>
      </main>
    </div>
  )
}
