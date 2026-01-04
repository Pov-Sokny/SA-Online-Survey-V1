import React, { useEffect, useState, useRef } from 'react';
import { Search, X, FileText, MessageSquare, Hash } from 'lucide-react';
import Link from 'next/link';
interface SearchResult {
  id: string;
  type: 'survey' | 'response' | 'question';
  title: string;
  subtitle: string;
  url: string;
}
export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // Mock search logic
  useEffect(() => {
    if (query.length > 1) {
      setResults([{
        id: '1',
        type: 'survey',
        title: 'Customer Feedback 2023',
        subtitle: 'Active • 124 responses',
        url: '/surveys/1/edit'
      }, {
        id: '2',
        type: 'question',
        title: 'How likely are you to recommend us?',
        subtitle: 'In: Customer Feedback 2023',
        url: '/surveys/1/edit'
      }, {
        id: '3',
        type: 'response',
        title: 'Response #1023',
        subtitle: 'Submitted 2 hours ago',
        url: '/surveys/1/responses/1023'
      }]);
      setIsOpen(true);
    } else {
      setResults([]);
    }
  }, [query]);
  const icons = {
    survey: <FileText className="h-4 w-4 text-blue-500" />,
    response: <MessageSquare className="h-4 w-4 text-green-500" />,
    question: <Hash className="h-4 w-4 text-orange-500" />
  };
  return <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input type="text" placeholder="Search surveys, responses..." className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-[#00a368] focus:ring-0 rounded-md text-sm transition-colors" value={query} onChange={e => setQuery(e.target.value)} onFocus={() => query.length > 1 && setIsOpen(true)} />
        {query && <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => {
        setQuery('');
        setIsOpen(false);
      }}>
            <X className="h-4 w-4" />
          </button>}
      </div>

      {isOpen && results.length > 0 && <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Best Matches
            </div>
            {results.map(result => <Link key={result.id} href={result.url} className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group" onClick={() => setIsOpen(false)}>
                <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                  {icons[result.type]}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {result.title}
                  </div>
                  <div className="text-xs text-gray-500">{result.subtitle}</div>
                </div>
              </Link>)}
          </div>
          <div className="bg-gray-50 px-4 py-2 border-t text-xs text-center text-gray-500">
            Press Enter to see all results
          </div>
        </div>}
    </div>;
}
