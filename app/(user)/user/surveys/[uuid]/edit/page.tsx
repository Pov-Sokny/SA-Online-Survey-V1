"use client"

import { useState } from "react"
import { ArrowLeft, Eye, Share2, MoreHorizontal, Save } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { QuestionEditor } from "@/components/survey-builder/QuestionEditor"
import { ResponsesTab } from "@/components/survey-builder/ResponsesTab"
import { SettingsTab } from "@/components/survey-builder/SettingsTab"
export default function SurveyEditorPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const [questions, setQuestions] = useState([
    {
      id: "1",
      type: "single_choice",
      title: "How satisfied are you with our service?",
      required: true,
      options: [
        {
          id: "1",
          text: "Very Satisfied",
        },
        {
          id: "2",
          text: "Satisfied",
        },
        {
          id: "3",
          text: "Neutral",
        },
        {
          id: "4",
          text: "Dissatisfied",
        },
      ],
    },
  ])
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                Customer Satisfaction Survey
                <Badge variant="outline" className="text-xs">
                  Draft
                </Badge>
              </h1>
            </div>
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
            <Button className="bg-[#00a368] hover:bg-[#008f5b] text-white" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Tabs defaultValue="questions" className="w-full">
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
              <TabsList className="bg-transparent h-12 p-0 space-x-6">
                <TabsTrigger
                  value="questions"
                  className="bg-transparent shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-[#00a368] data-[state=active]:text-[#00a368] px-1"
                >
                  Questions
                </TabsTrigger>
                <TabsTrigger
                  value="responses"
                  className="bg-transparent shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-[#00a368] data-[state=active]:text-[#00a368] px-1"
                >
                  Responses
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="bg-transparent shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-[#00a368] data-[state=active]:text-[#00a368] px-1"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-8">
            <TabsContent value="questions">
              <QuestionEditor questions={questions} setQuestions={setQuestions} />
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
