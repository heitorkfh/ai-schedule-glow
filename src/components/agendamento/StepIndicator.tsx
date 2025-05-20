
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const StepIndicator = ({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="text-center flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === index + 1 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm mt-1">{stepLabels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
