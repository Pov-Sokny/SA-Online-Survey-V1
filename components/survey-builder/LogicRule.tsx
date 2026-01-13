import React from 'react';
import { Trash2, Edit2, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
interface LogicRuleProps {
  id: string;
  ifCondition: string;
  thenAction: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
export function LogicRule({
  id,
  ifCondition,
  thenAction,
  onEdit,
  onDelete
}: LogicRuleProps) {
  return <Card className="p-4 mb-3 border-l-4 border-l-[#00a368] hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <Badge variant="outline" className="bg-gray-50 font-mono text-xs">
            IF
          </Badge>
          <span className="text-sm font-medium text-gray-700">
            {ifCondition}
          </span>

          <ArrowRight className="h-4 w-4 text-gray-400" />

          <Badge variant="outline" className="bg-green-50 text-green-700 font-mono text-xs border-green-200">
            THEN
          </Badge>
          <span className="text-sm font-medium text-gray-900">
            {thenAction}
          </span>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button onClick={() => onEdit(id)} className="p-1.5 text-gray-400 hover:text-[#00a368] hover:bg-green-50 rounded-md transition-colors" title="Edit rule">
            <Edit2 className="h-4 w-4" />
          </button>
          <button onClick={() => onDelete(id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete rule">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>;
}
