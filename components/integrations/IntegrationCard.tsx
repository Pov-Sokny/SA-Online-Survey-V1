import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';
interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  status: 'connected' | 'available' | 'beta';
}
interface IntegrationCardProps {
  integration: Integration;
}
export function IntegrationCard({
  integration
}: IntegrationCardProps) {
  return <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-400">
            {integration.logo ? <img src={integration.logo} alt={integration.name} className="h-8 w-8" /> : integration.name[0]}
          </div>
          {integration.status === 'connected' && <Badge className="bg-green-100 text-green-800 flex items-center">
              <Check className="h-3 w-3 mr-1" /> Connected
            </Badge>}
          {integration.status === 'beta' && <Badge className="bg-blue-100 text-blue-800">Beta</Badge>}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {integration.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3 mb-4">
          {integration.description}
        </p>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {integration.category}
        </span>
      </div>

      <div className="p-4 border-t bg-gray-50">
        <Link href={`/integrations/${integration.id}`}>
          <Button variant={integration.status === 'connected' ? 'outline' : 'primary'} className="w-full">
            {integration.status === 'connected' ? 'Configure' : 'Connect'}
          </Button>
        </Link>
      </div>
    </Card>;
}
