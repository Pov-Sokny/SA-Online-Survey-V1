import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Search, Calendar, Filter, Download } from 'lucide-react';
interface ResponseFiltersProps {
  onSearch: (query: string) => void;
  onStatusChange: (status: string) => void;
  onExport: () => void;
}
export function ResponseFilters({
  onSearch,
  onStatusChange,
  onExport
}: ResponseFiltersProps) {
  return <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-1 gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search by ID or respondent..." className="pl-9" onChange={e => onSearch(e.target.value)} />
        </div>

        <div className="w-40">
          <Select options={[{
          label: 'All Statuses',
          value: 'all'
        }, {
          label: 'Completed',
          value: 'completed'
        }, {
          label: 'Partial',
          value: 'partial'
        }]} onChange={e => onStatusChange(e.target.value)} />
        </div>

        <Button variant="outline" className="hidden md:flex">
          <Calendar className="h-4 w-4 mr-2" />
          Date Range
        </Button>
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        <Button variant="outline" className="md:hidden">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={onExport} className="ml-auto">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>
    </div>;
}
