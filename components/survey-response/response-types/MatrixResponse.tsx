import React from 'react';
interface MatrixResponseProps {
  rows: string[];
  columns: string[];
  multiple?: boolean;
  value?: Record<string, string[]>;
  onChange: (value: Record<string, string[]>) => void;
  error?: string;
}
export function MatrixResponse({
  rows,
  columns,
  multiple,
  value = {},
  onChange,
  error
}: MatrixResponseProps) {
  const handleChange = (row: string, col: string) => {
    const current = value[row] || [];
    let newSelection: string[];
    if (multiple) {
      if (current.includes(col)) {
        newSelection = current.filter(c => c !== col);
      } else {
        newSelection = [...current, col];
      }
    } else {
      newSelection = [col];
    }
    onChange({
      ...value,
      [row]: newSelection
    });
  };
  return <div className="space-y-4 overflow-x-auto">
      <table className="w-full min-w-[600px] text-left border-collapse">
        <thead>
          <tr>
            <th className="p-4 border-b border-gray-200 w-1/3"></th>
            {columns.map(col => <th key={col} className="p-4 border-b border-gray-200 text-center font-medium text-gray-700">
                {col}
              </th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => <tr key={row} className={rowIndex % 2 === 0 ? 'bg-gray-50/50' : ''}>
              <td className="p-4 border-b border-gray-200 font-medium text-gray-900">
                {row}
              </td>
              {columns.map(col => {
            const isSelected = (value[row] || []).includes(col);
            return <td key={`${row}-${col}`} className="p-4 border-b border-gray-200 text-center">
                    <label className="inline-flex items-center justify-center cursor-pointer p-2">
                      <input type={multiple ? 'checkbox' : 'radio'} name={multiple ? `${row}-${col}` : row} checked={isSelected} onChange={() => handleChange(row, col)} className={`w-5 h-5 text-[#00a368] border-gray-300 focus:ring-[#00a368] ${multiple ? 'rounded' : 'rounded-full'}`} />
                      <span className="sr-only">
                        {row}, {col}
                      </span>
                    </label>
                  </td>;
          })}
            </tr>)}
        </tbody>
      </table>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>;
}
