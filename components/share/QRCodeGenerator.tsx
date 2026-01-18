import React from 'react';
import { Button } from '../ui/button';
import { Download, RefreshCw } from 'lucide-react';
interface QRCodeGeneratorProps {
  url: string;
}
export function QRCodeGenerator({
  url
}: QRCodeGeneratorProps) {
  return <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-gray-200">
      {/* Placeholder for actual QR Code generation library */}
      <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-gray-300">
        <div className="text-center p-4">
          <div className="w-32 h-32 bg-black mx-auto opacity-10 mb-2"></div>
          <p className="text-xs text-gray-500">QR Code Preview</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-6 text-center max-w-xs break-all">
        {url}
      </p>

      <div className="flex gap-3">
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
        <Button className="bg-[#00a368] hover:bg-[#008f5b]">
          <Download className="h-4 w-4 mr-2" />
          Download PNG
        </Button>
      </div>
    </div>;
}
