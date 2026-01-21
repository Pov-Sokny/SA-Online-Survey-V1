"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mail } from "lucide-react"

export function EmailInvite() {
  const [emails, setEmails] = useState<string[]>([])
  const [emailInput, setEmailInput] = useState("")

  const handleAddEmail = () => {
    if (emailInput.trim() && !emails.includes(emailInput)) {
      setEmails([...emails, emailInput])
      setEmailInput("")
    }
  }

  const handleRemoveEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email))
  }

  const handleSendInvites = () => {
    console.log("Sending invites to:", emails)
    alert(`Invitations sent to ${emails.length} recipient(s)`)
    setEmails([])
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900">
          Recipient Email Addresses
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="name@example.com"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddEmail()
              }
            }}
          />
          <Button onClick={handleAddEmail} variant="outline">
            Add Email
          </Button>
        </div>
      </div>

      {emails.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-900">Recipients</h4>
          <div className="space-y-2">
            {emails.map((email) => (
              <Card key={email} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{email}</span>
                </div>
                <button
                  onClick={() => handleRemoveEmail(email)}
                  className="text-gray-400 hover:text-red-500 text-sm"
                >
                  Remove
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="block text-sm font-medium text-gray-900">
          Message (Optional)
        </label>
        <textarea
          placeholder="Add a personal message..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00a368] focus:border-transparent"
          rows={4}
        />
      </div>

      <Button
        onClick={handleSendInvites}
        disabled={emails.length === 0}
        className="w-full bg-[#00a368] hover:bg-[#008f5b] text-white"
      >
        Send Invitations ({emails.length})
      </Button>
    </div>
  )
}
