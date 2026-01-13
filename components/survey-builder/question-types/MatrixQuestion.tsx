import React from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
interface MatrixQuestionProps {
  rows: string[];
  columns: string[];
  onChange: (updates: {
    rows?: string[];
    columns?: string[];
  }) => void;
}
export function MatrixQuestion({
  rows,
  columns,
  onChange
}: MatrixQuestionProps) {
  const updateRow = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index] = value;
    onChange({
      rows: newRows
    });
  };
  const updateColumn = (index: number, value: string) => {
    const newCols = [...columns];
    newCols[index] = value;
    onChange({
      columns: newCols
    });
  };
  const addRow = () => onChange({
    rows: [...rows, `Row ${rows.length + 1}`]
  });
  const addColumn = () => onChange({
    columns: [...columns, `Col ${columns.length + 1}`]
  });
  const removeRow = (index: number) => onChange({
    rows: rows.filter((_, i) => i !== index)
  });
  const removeColumn = (index: number) => onChange({
    columns: columns.filter((_, i) => i !== index)
  });
  return <div className="space-y-6">
      <div className="overflow-x-auto pb-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 w-1/4"></th>
              {columns.map((col, i) => <th key={i} className="p-2 text-center min-w-[100px]">
                  <div className="text-sm text-gray-500 mb-2">{col}</div>
                  <div className="w-4 h-4 rounded-full border border-gray-300 mx-auto" />
                </th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => <tr key={i} className="border-b border-gray-100">
                <td className="p-2">
                  <div className="text-sm text-gray-700">{row}</div>
                </td>
                {columns.map((_, j) => <td key={j} className="p-2 text-center">
                    <div className="w-4 h-4 rounded-full border border-gray-300 mx-auto" />
                  </td>)}
              </tr>)}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Rows</h4>
          {rows.map((row, i) => <div key={i} className="flex items-center gap-2">
              <Input value={row} onChange={e => updateRow(i, e.target.value)} className="h-8 text-sm" />
              <button onClick={() => removeRow(i)} className="text-gray-400 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </div>)}
          <Button variant="ghost" size="sm" onClick={addRow} className="text-[#00a368]">
            <Plus className="h-4 w-4 mr-2" /> Add Row
          </Button>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Columns</h4>
          {columns.map((col, i) => <div key={i} className="flex items-center gap-2">
              <Input value={col} onChange={e => updateColumn(i, e.target.value)} className="h-8 text-sm" />
              <button onClick={() => removeColumn(i)} className="text-gray-400 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </div>)}
          <Button variant="ghost" size="sm" onClick={addColumn} className="text-[#00a368]">
            <Plus className="h-4 w-4 mr-2" /> Add Column
          </Button>
        </div>
      </div>
    </div>;
}
