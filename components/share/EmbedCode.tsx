"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Check } from "lucide-react"

interface EmbedCodeProps {
  surveyId: string
}

export function EmbedCode({ surveyId }: EmbedCodeProps) {
  const [copied, setCopied] = useState(false)

  const embedCode = `<iframe src="https://supersurvey.live/s/${surveyId}" width="100%" height="800" frameborder="0" style="border: none; border-radius: 8px;"></iframe>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">
        Copy this code and paste it into your website's HTML to embed the survey.
      </p>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900">
          Embed Code
        </label>
        <Card className="p-4 bg-gray-50 border border-gray-200">
          <pre className="text-xs text-gray-600 overflow-x-auto font-mono">
            {embedCode}
          </pre>
        </Card>
      </div>

      <Button
        onClick={handleCopy}
        className="bg-[#00a368] hover:bg-[#008f5b] text-white gap-2"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied to Clipboard
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy Embed Code
          </>
        )}
      </Button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          Customization Options
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Adjust width and height attributes to fit your layout</li>
          <li>• Remove border-radius for a squared appearance</li>
          <li>• Add border styling with border-color and border-width</li>
        </ul>
      </div>
    </div>
  )
}
