"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { QRCodeGenerator } from "@/components/share/QRCodeGenerator"
import { EmailInvite } from "@/components/share/EmailInvite"
import { EmbedCode } from "@/components/share/EmbedCode"
import { LinkIcon, Mail, Code, QrCode, Share2, Copy, Check, Facebook, Twitter, Linkedin } from "lucide-react"
export default function SharePage({
  params,
}: {
  params: {
    uuid: string
  }
}) {
  const [activeTab, setActiveTab] = useState("link")
  const [copied, setCopied] = useState(false)
  const surveyUrl = `https://supersurvey.com/s/${params.uuid}`
  const handleCopy = () => {
    navigator.clipboard.writeText(surveyUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Share Survey</h1>
        <p className="text-gray-500 mt-1">Choose how you want to distribute your survey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          <button
            onClick={() => setActiveTab("link")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "link" ? "bg-[#00a368]/10 text-[#00a368]" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <LinkIcon className="h-5 w-5" />
            Public Link
          </button>
          <button
            onClick={() => setActiveTab("email")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "email" ? "bg-[#00a368]/10 text-[#00a368]" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <Mail className="h-5 w-5" />
            Email Invitation
          </button>
          <button
            onClick={() => setActiveTab("qr")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "qr" ? "bg-[#00a368]/10 text-[#00a368]" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <QrCode className="h-5 w-5" />
            QR Code
          </button>
          <button
            onClick={() => setActiveTab("embed")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "embed" ? "bg-[#00a368]/10 text-[#00a368]" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <Code className="h-5 w-5" />
            Embed on Website
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "social" ? "bg-[#00a368]/10 text-[#00a368]" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <Share2 className="h-5 w-5" />
            Social Media
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <Card className="p-6 min-h-[400px]">
            {activeTab === "link" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Public Survey Link</h3>
                  <div className="flex gap-2">
                    <Input value={surveyUrl} readOnly className="bg-gray-50 font-mono text-sm" />
                    <Button onClick={handleCopy} className="bg-[#00a368] hover:bg-[#008f5b]">
                      {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h4 className="font-medium text-gray-900">Link Settings</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Short URL</p>
                      <p className="text-sm text-gray-500">Generate a shorter, cleaner URL</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Password Protection</p>
                      <p className="text-sm text-gray-500">Require a password to access</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "email" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Email Invitations</h3>
                <EmailInvite />
              </div>
            )}

            {activeTab === "qr" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code</h3>
                <QRCodeGenerator url={surveyUrl} />
              </div>
            )}

            {activeTab === "embed" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Embed on Website</h3>
                <EmbedCode surveyId={params.uuid} />
              </div>
            )}

            {activeTab === "social" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share on Social Media</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-12 justify-start text-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/5 bg-transparent"
                  >
                    <Facebook className="h-5 w-5 mr-3" />
                    Share on Facebook
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 justify-start text-[#1DA1F2] hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 bg-transparent"
                  >
                    <Twitter className="h-5 w-5 mr-3" />
                    Share on Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 justify-start text-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/5 bg-transparent"
                  >
                    <Linkedin className="h-5 w-5 mr-3" />
                    Share on LinkedIn
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
