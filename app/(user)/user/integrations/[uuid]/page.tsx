"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { WebhookSetup } from "@/components/integrations/WebhookSetup"

export default function IntegrationDetailPage() {
  const params = useParams()
  const id = params.id as string
  const isWebhook = id === "webhooks"
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/integrations" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Integrations
        </Link>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-400">
            {id[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">{id.replace("-", " ")}</h1>
            <p className="text-gray-500">Configure your integration settings.</p>
          </div>
        </div>
      </div>

      {isWebhook ? (
        <WebhookSetup />
      ) : (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Connect to {id.replace("-", " ")}</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            To connect this integration, you'll need to authenticate with your account.
          </p>
          <Button variant="primary">Authenticate Account</Button>
        </div>
      )}
    </div>
  )
}
