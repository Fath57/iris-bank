import { useMemo } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

interface Criterion {
  label: string;
  test: (pw: string) => boolean;
}

const CRITERIA: Criterion[] = [
  { label: "8 caractères minimum", test: (pw) => pw.length >= 8 },
  { label: "Une lettre majuscule", test: (pw) => /[A-Z]/.test(pw) },
  { label: "Une lettre minuscule", test: (pw) => /[a-z]/.test(pw) },
  { label: "Un chiffre", test: (pw) => /[0-9]/.test(pw) },
  { label: "Un caractère spécial (!@#$…)", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

const STRENGTH_CONFIG = [
  { label: "Très faible", color: "bg-red-500", textColor: "text-red-600 dark:text-red-400" },
  { label: "Faible", color: "bg-orange-500", textColor: "text-orange-600 dark:text-orange-400" },
  { label: "Moyen", color: "bg-amber-500", textColor: "text-amber-600 dark:text-amber-400" },
  { label: "Fort", color: "bg-emerald-500", textColor: "text-emerald-600 dark:text-emerald-400" },
  { label: "Excellent", color: "bg-emerald-600", textColor: "text-emerald-700 dark:text-emerald-300" },
];

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const results = useMemo(
    () => CRITERIA.map((c) => ({ ...c, passed: c.test(password) })),
    [password]
  );

  const score = results.filter((r) => r.passed).length;
  const config = STRENGTH_CONFIG[Math.max(score - 1, 0)];

  if (!password) return null;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Strength bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-muted-foreground tracking-wide uppercase">
            Sécurité
          </span>
          <span className={cn("text-[11px] font-semibold tracking-wide", config.textColor)}>
            {config.label}
          </span>
        </div>
        <div className="flex gap-1">
          {STRENGTH_CONFIG.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                i < score ? config.color : "bg-border"
              )}
            />
          ))}
        </div>
      </div>

      {/* Criteria checklist */}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
        {results.map((r) => (
          <li
            key={r.label}
            className={cn(
              "flex items-center gap-1.5 text-[11px] transition-colors duration-300",
              r.passed ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/60"
            )}
          >
            {r.passed ? (
              <Check className="h-3 w-3 shrink-0" strokeWidth={3} />
            ) : (
              <X className="h-3 w-3 shrink-0" strokeWidth={2} />
            )}
            <span>{r.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
