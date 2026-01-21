import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
interface NavigationButtonsProps {
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
  canContinue: boolean;
}
export function NavigationButtons({
  onNext,
  onBack,
  isFirst,
  isLast,
  canContinue
}: NavigationButtonsProps) {
  return <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
      <div className="flex items-center">
        {!isFirst && <Button variant="secondary" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center text-sm text-gray-400 gap-1">
          <Check className="w-4 h-4" />
          <span>Auto-saved</span>
        </div>

        <Button onClick={onNext} disabled={!canContinue} className="min-w-[120px] flex items-center justify-center gap-2">
          {isLast ? 'Submit' : 'Next'}
          {!isLast && <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>;
}
