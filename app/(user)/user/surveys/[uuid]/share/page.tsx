"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Copy, Check, Download, RefreshCw } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useShareSurveyMutation } from "@/lib/features/surveys/surveys-api"

export default function SharePage() {
  const { uuid } = useParams<{ uuid: string }>()
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("link")
  const [shareData, setShareData] = useState<{ link: string; qrCodeUrl: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const [shareSurvey] = useShareSurveyMutation()

  useEffect(() => {
    if (uuid) {
      handleGenerateLink()
    }
  }, [uuid])

  const handleGenerateLink = async () => {
    try {
      setIsLoading(true)
      setIsError(false)
      const result = await shareSurvey(uuid).unwrap()
      setShareData(result)
    } catch (error) {
      console.error("Error generating share link:", error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (shareData?.link) {
      navigator.clipboard.writeText(shareData.link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownloadQR = () => {
    if (shareData?.qrCodeUrl) {
      const link = document.createElement("a")
      link.href = shareData.qrCodeUrl
      link.download = `survey-${uuid}-qr.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (!uuid) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Generating share link...
      </div>
    )
  }

  if (isError || !shareData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to generate share link
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href={`/user/surveys/${uuid}/edit`} className="hover:bg-gray-100 p-1 rounded">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Share Survey</h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("link")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "link"
                    ? "bg-[#00a368]/10 text-[#00a368]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Copy className="h-5 w-5" />
                Public Link
              </button>
              <button
                onClick={() => setActiveTab("qr")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "qr"
                    ? "bg-[#00a368]/10 text-[#00a368]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <RefreshCw className="h-5 w-5" />
                QR Code
              </button>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <Card className="p-6">
                {activeTab === "link" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Public Survey Link</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Share this link with respondents to collect responses
                      </p>
                      <div className="flex gap-2">
                        <Input 
                          value={shareData.link} 
                          readOnly 
                          className="bg-gray-50 font-mono text-sm" 
                        />
                        <Button 
                          onClick={handleCopy} 
                          className="bg-[#00a368] hover:bg-[#008f5b]"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "qr" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code</h3>
                      <p className="text-sm text-gray-500 mb-6">
                        Respondents can scan this QR code to access the survey
                      </p>
                      
                      <div className="flex flex-col items-center space-y-6">
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          {shareData.qrCodeUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                              src={shareData.qrCodeUrl || "/placeholder.svg"} 
                              alt="Survey QR Code" 
                              className="w-48 h-48 object-contain"
                            />
                          ) : (
                            <div className="w-48 h-48 bg-gray-100 rounded flex items-center justify-center">
                              <p className="text-gray-400">QR Code loading...</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <Button 
                            onClick={handleGenerateLink} 
                            variant="outline"
                            className="gap-2 bg-transparent"
                          >
                            <RefreshCw className="h-4 w-4" />
                            Regenerate
                          </Button>
                          <Button 
                            onClick={handleDownloadQR}
                            className="bg-[#00a368] hover:bg-[#008f5b] gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download PNG
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
