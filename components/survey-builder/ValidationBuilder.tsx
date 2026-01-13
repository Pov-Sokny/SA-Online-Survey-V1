import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { Switch } from '../ui/Switch';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
export function ValidationBuilder() {
  const [isRequired, setIsRequired] = useState(false);
  const [validationType, setValidationType] = useState('none');
  const [errorMessage, setErrorMessage] = useState('');
  return <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Validation Rules
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Required Question</span>
          <Switch checked={isRequired} onCheckedChange={setIsRequired} />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Select label="Input Format" value={validationType} onChange={e => setValidationType(e.target.value)} options={[{
          value: 'none',
          label: 'No specific format'
        }, {
          value: 'email',
          label: 'Email Address'
        }, {
          value: 'number',
          label: 'Number'
        }, {
          value: 'url',
          label: 'URL / Website'
        }, {
          value: 'date',
          label: 'Date'
        }, {
          value: 'phone',
          label: 'Phone Number'
        }, {
          value: 'regex',
          label: 'Custom Regex'
        }]} />

          {validationType === 'number' && <div className="grid grid-cols-2 gap-2">
              <Input label="Min Value" type="number" placeholder="Any" />
              <Input label="Max Value" type="number" placeholder="Any" />
            </div>}

          {validationType === 'regex' && <Input label="Regular Expression" placeholder="e.g. ^[A-Z]{3}-\d{3}$" />}

          <div className="pt-2">
            <Input label="Custom Error Message" value={errorMessage} onChange={e => setErrorMessage(e.target.value)} placeholder="e.g. Please enter a valid email address" />
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Shown to user when validation fails
            </p>
          </div>
        </div>
      </div>
    </div>;
}
