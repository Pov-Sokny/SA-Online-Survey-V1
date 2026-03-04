import React from 'react';
import { Card } from '@/components/ui/card';
interface ResponseChartProps {
  title: string;
  type: 'bar' | 'pie' | 'line';
  data: any[];
  height?: number;
}
export function ResponseChart({
  title,
  type,
  data,
  height = 300
}: ResponseChartProps) {
  // Placeholder for chart visualization
  // In a real app, use Recharts or Chart.js
  return <Card className="p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300" style={{
      minHeight: height
    }}>
        <div className="text-center text-gray-500">
          <p className="font-medium mb-2">
            {type.charAt(0).toUpperCase() + type.slice(1)} Chart Visualization
          </p>
          <p className="text-sm">Chart library integration required</p>
        </div>
      </div>
    </Card>;
}
