import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
interface ResponseDetailProps {
  response: any; // Using any for mock flexibility, ideally strict type
}
export function ResponseDetail({
  response
}: ResponseDetailProps) {
  const renderAnswer = (question: any, answer: any) => {
    if (!answer) return <span className="text-gray-400 italic">No answer provided</span>;
    switch (question.type) {
      case 'Single Choice':
      case 'Multi Choice':
        return <div className="space-y-2">
            {question.options.map((opt: string) => {
            const isSelected = Array.isArray(answer) ? answer.includes(opt) : answer === opt;
            return <div key={opt} className={`flex items-center gap-2 p-2 rounded ${isSelected ? 'bg-green-50 border border-green-100' : ''}`}>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-[#00a368] border-[#00a368]' : 'border-gray-300'}`}>
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className={isSelected ? 'font-medium text-gray-900' : 'text-gray-600'}>
                    {opt}
                  </span>
                </div>;
          })}
          </div>;
      case 'Rating':
        return <div className="flex gap-1">
            {[...Array(question.maxRating || 5)].map((_, i) => <Star key={i} className={`h-6 w-6 ${i < answer ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />)}
            <span className="ml-2 font-medium text-gray-700">
              ({answer}/{question.maxRating || 5})
            </span>
          </div>;
      case 'NPS':
        return <div className="space-y-3">
            <div className="flex gap-1 overflow-x-auto pb-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => <div key={score} className={`
                    w-10 h-10 flex items-center justify-center rounded border font-medium
                    ${score === answer ? 'bg-[#00a368] text-white border-[#00a368]' : 'bg-white text-gray-600 border-gray-200'}
                  `}>
                  {score}
                </div>)}
            </div>
            {response.npsFollowUp && <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 border border-gray-100">
                <strong>Follow-up:</strong> {response.npsFollowUp}
              </div>}
          </div>;
      case 'Matrix':
        return <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  {question.columns.map((col: string) => <th key={col} className="p-2 text-center font-medium text-gray-500">
                      {col}
                    </th>)}
                </tr>
              </thead>
              <tbody>
                {question.rows.map((row: string) => <tr key={row} className="border-t border-gray-100">
                    <td className="p-2 font-medium text-gray-700">{row}</td>
                    {question.columns.map((col: string) => {
                  const isSelected = answer[row] === col;
                  return <td key={col} className="p-2 text-center">
                          <div className={`w-4 h-4 mx-auto rounded-full border ${isSelected ? 'bg-[#00a368] border-[#00a368]' : 'border-gray-300'}`}></div>
                        </td>;
                })}
                  </tr>)}
              </tbody>
            </table>
          </div>;
      default:
        // Text
        return <div className="p-3 bg-gray-50 rounded border border-gray-100 text-gray-800">
            {answer}
          </div>;
    }
  };
  return <div className="space-y-6">
      {response.answers.map((item: any, index: number) => <Card key={index} className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500 shrink-0 mt-0.5">
              {index + 1}
            </span>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 text-lg mb-4">
                {item.question}
              </h3>
              {renderAnswer(item.questionConfig, item.answer)}
            </div>
          </div>
        </Card>)}
    </div>;
}
