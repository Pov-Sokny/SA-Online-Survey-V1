import React from 'react';
import { Card } from '@/components/ui/card';
interface NPSScoreProps {
  score: number;
  promoters: number;
  passives: number;
  detractors: number;
  total: number;
}
export function NPSScore({
  score,
  promoters,
  passives,
  detractors,
  total
}: NPSScoreProps) {
  return <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Net Promoter Score (NPS)
      </h3>

      <div className="flex items-center justify-between mb-8">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900 mb-1">{score}</div>
          <div className="text-sm text-gray-500">NPS Score</div>
        </div>

        <div className="flex-1 ml-8 space-y-4">
          {/* Promoters */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-green-600 font-medium">
                Promoters (9-10)
              </span>
              <span className="text-gray-600">
                {Math.round(promoters / total * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{
              width: `${promoters / total * 100}%`
            }} />
            </div>
          </div>

          {/* Passives */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-yellow-600 font-medium">
                Passives (7-8)
              </span>
              <span className="text-gray-600">
                {Math.round(passives / total * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400" style={{
              width: `${passives / total * 100}%`
            }} />
            </div>
          </div>

          {/* Detractors */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-red-600 font-medium">Detractors (0-6)</span>
              <span className="text-gray-600">
                {Math.round(detractors / total * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-500" style={{
              width: `${detractors / total * 100}%`
            }} />
            </div>
          </div>
        </div>
      </div>
    </Card>;
}
