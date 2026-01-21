import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Card } from '../ui/card';
import { Plus, Trash2, Play } from 'lucide-react';
export function WebhookSetup() {
  const [url, setUrl] = useState('');
  const [events, setEvents] = useState({
    response_completed: true,
    response_updated: false,
    survey_published: false
  });
  const [headers, setHeaders] = useState([{
    key: '',
    value: ''
  }]);
  const addHeader = () => setHeaders([...headers, {
    key: '',
    value: ''
  }]);
  const removeHeader = (index: number) => setHeaders(headers.filter((_, i) => i !== index));
  return <div className="space-y-8">
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Webhook Configuration
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endpoint URL
            </label>
            <Input placeholder="https://api.yourservice.com/webhook" value={url} onChange={e => setUrl(e.target.value)} />
            <p className="text-xs text-gray-500 mt-1">
              We'll send a POST request to this URL.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trigger Events
            </label>
            <div className="space-y-2">
              <Checkbox label="New Response Completed" checked={events.response_completed} onChange={c => setEvents({
              ...events,
              response_completed: c
            })} />
              <Checkbox label="Response Updated" checked={events.response_updated} onChange={c => setEvents({
              ...events,
              response_updated: c
            })} />
              <Checkbox label="Survey Published/Closed" checked={events.survey_published} onChange={c => setEvents({
              ...events,
              survey_published: c
            })} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Headers
            </label>
            <div className="space-y-2">
              {headers.map((header, index) => <div key={index} className="flex gap-2">
                  <Input placeholder="Key" value={header.key} className="flex-1" />
                  <Input placeholder="Value" value={header.value} className="flex-1" />
                  <Button variant="ghost" size="sm" onClick={() => removeHeader(index)} className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>)}
              <Button variant="outline" size="sm" onClick={addHeader} className="mt-2">
                <Plus className="h-3 w-3 mr-1" /> Add Header
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-between">
          <Button variant="outline">
            <Play className="h-4 w-4 mr-2" /> Test Webhook
          </Button>
          <Button variant="primary">Save Configuration</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Deliveries
        </h3>
        <div className="text-center py-8 text-gray-500 text-sm">
          No webhook deliveries yet. Trigger an event to see logs here.
        </div>
      </Card>
    </div>;
}
