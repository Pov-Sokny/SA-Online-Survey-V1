import React from 'react';
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Copy, QrCode, Mail } from 'lucide-react';
export function SettingsTab() {
  return <div className="max-w-4xl mx-auto space-y-6">
      {/* General Settings */}
      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold border-b pb-4">
          General Settings
        </h3>
        <div className="grid gap-6">
          <Input label="Survey Title" defaultValue="Customer Satisfaction Survey" />
          <Textarea label="Description" placeholder="Enter a description for your survey..." />
          <Textarea label="Thank You Message" placeholder="Message shown after submission..." defaultValue="Thank you for your feedback!" />
          <Input label="Redirect URL (Optional)" placeholder="https://" />
        </div>
      </Card>

      {/* Distribution */}
      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold border-b pb-4">Distribution</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Survey Link
            </label>
            <div className="flex gap-2">
              <Input value="https://supersurvey.com/s/x8k92m" readOnly className="bg-gray-50" />
              <Button variant="outline">
                <Copy className="h-4 w-4 mr-2" /> Copy
              </Button>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <Button variant="outline" className="flex-1">
              <QrCode className="h-4 w-4 mr-2" /> Generate QR Code
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" /> Email Invitation
            </Button>
          </div>
        </div>
      </Card>

      {/* Access Control */}
      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold border-b pb-4">Access Control</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Password Protection</h4>
              <p className="text-sm text-gray-500">
                Require a password to access the survey
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">One Response Per Person</h4>
              <p className="text-sm text-gray-500">
                Limit to one submission per browser/device
              </p>
            </div>
            <Switch checked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Response Quota</h4>
              <p className="text-sm text-gray-500">
                Automatically close after X responses
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch />
              <Input className="w-24" placeholder="100" disabled />
            </div>
          </div>
        </div>
      </Card>

      {/* Scheduling */}
      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold border-b pb-4">Scheduling</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input type="datetime-local" label="Start Date" />
          <Input type="datetime-local" label="End Date" />
        </div>
      </Card>
    </div>;
}
