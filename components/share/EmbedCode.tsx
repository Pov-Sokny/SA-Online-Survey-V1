import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Select } from '../ui/select';
import { Copy, Check } from 'lucide-react';
interface EmbedCodeProps {
  surveyId: string;
}
export function EmbedCode({
  surveyId
}: EmbedCodeProps) {
  const [copied, setCopied] = useState(false);
  const [type, setType] = useState('inline');
  const embedCode = `<iframe 
  src="https://supersurvey.com/s/${surveyId}?embed=${type}" 
  width="100%" 
  height="600px" 
  frameborder="0" 
  marginheight="0" 
  marginwidth="0">
  Loading...
</iframe>`;
  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Embed Type
          </label>
          <Select options={[{
          label: 'Inline Iframe',
          value: 'inline'
        }, {
          label: 'Popup Button',
          value: 'popup'
        }, {
          label: 'Side Tab',
          value: 'tab'
        }]} onChange={e => setType(e.target.value)} />
        </div>
      </div>

      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
          {embedCode}
        </pre>
        <Button size="sm" className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white border-0" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
        <strong>Tip:</strong> Paste this code into your website's HTML where you
        want the survey to appear.
      </div>
    </div>;
}
