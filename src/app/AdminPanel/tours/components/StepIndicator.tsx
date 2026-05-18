import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

// --- Step Indicator ---
type StepIndicatorProps = {
  steps: { label: string }[];
  currentStep: number;
};

const StepIndicator = ({
  steps,
  currentStep,
}: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6" dir="rtl">
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                // onClick={() => setCurrentStep(i)}
                className={cn(
                  "w-15 h-15 rounded-full flex items-center justify-center text-xs xl:text-sm font-medium transition-all duration-250",
                  "border-2 cursor-pointer hover:scale-110",
                  isCompleted &&
                    "bg-primary border-primary text-primary-foreground",
                  isActive && "border-primary text-primary bg-primary/10",
                  !isCompleted &&
                    !isActive &&
                    "border-muted-foreground/30 text-muted-foreground",
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-xs whitespace-nowrap",
                  isActive && "text-primary font-medium",
                  isCompleted && "text-primary",
                  !isCompleted && !isActive && "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line — don't show after last step */}
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "h-px w-10 mx-1 mb-5 transition-colors duration-200",
                  i < currentStep ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
