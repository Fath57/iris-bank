import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Bénéficiaire", "Montant & détails", "Vérification", "Confirmation"];

interface TransactionStepperProps {
  currentStep: number;
}

export function TransactionStepper({ currentStep }: TransactionStepperProps) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const isDone = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                  isDone && "bg-emerald-50 text-emerald-700 border border-emerald-200",
                  isActive && "bg-blue-50 text-blue-700 border border-blue-200",
                  !isDone && !isActive && "bg-muted text-muted-foreground border border-border"
                )}
              >
                {isDone ? <Check className="h-3 w-3" /> : step}
              </div>
              <span
                className={cn(
                  "text-xs whitespace-nowrap",
                  isActive && "font-medium text-foreground",
                  !isActive && "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-px bg-border mx-3" />
            )}
          </div>
        );
      })}
    </div>
  );
}