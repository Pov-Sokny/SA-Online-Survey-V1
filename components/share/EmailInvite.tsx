import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Send, Plus, X } from 'lucide-react';
export function EmailInvite() {
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const addEmail = () => {
    if (currentEmail && currentEmail.includes('@')) {
      setEmails([...emails, currentEmail]);
      setCurrentEmail('');
    }
  };
  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };
  return <div className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipients
          </label>
          <div className="flex gap-2 mb-2">
            <Input placeholder="Enter email address" value={currentEmail} onChange={e => setCurrentEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && addEmail()} />
            <Button onClick={addEmail} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {emails.length > 0 && <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md border border-gray-200 min-h-[60px]">
              {emails.map((email, i) => <div key={i} className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200 text-sm">
                  <span>{email}</span>
                  <button onClick={() => removeEmail(i)} className="text-gray-400 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </div>)}
            </div>}
          <p className="text-xs text-gray-500 mt-1">
            Enter email addresses individually or upload a CSV list.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <Input defaultValue="Invitation to participate in a survey" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <Textarea className="min-h-[150px]" defaultValue="Hi there,\n\nI would appreciate your feedback on this survey. It will only take a few minutes to complete.\n\nClick the button below to start." />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button variant="outline">Preview Email</Button>
        <Button className="bg-[#00a368] hover:bg-[#008f5b]" disabled={emails.length === 0}>
          <Send className="h-4 w-4 mr-2" />
          Send Invitations
        </Button>
      </div>
    </div>;
}
