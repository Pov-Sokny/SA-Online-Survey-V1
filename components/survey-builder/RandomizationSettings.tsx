import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';
import { Switch } from '../ui/Switch';
import { Checkbox } from '../ui/Checkbox';
export function RandomizationSettings() {
  const [randomizeQuestions, setRandomizeQuestions] = useState(false);
  const [randomizeChoices, setRandomizeChoices] = useState(false);
  return <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center gap-2 mb-2">
        <Shuffle className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Randomization</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Randomize Question Order
          </span>
          <Switch checked={randomizeQuestions} onCheckedChange={setRandomizeQuestions} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Randomize Answer Choices
          </span>
          <Switch checked={randomizeChoices} onCheckedChange={setRandomizeChoices} />
        </div>

        {randomizeChoices && <div className="pl-4 pt-2 space-y-2 border-l-2 border-gray-200 ml-1">
            <Checkbox label="Anchor last option (e.g. 'Other')" checked={true} />
            <Checkbox label="Anchor first option" />
          </div>}
      </div>
    </div>;
}
