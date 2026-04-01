export const ACCOUNT_META: Record<string, { name: string; label: string; badgeClass: string }> = {
  CHECKING: { name: "Compte Courant",   label: "Courant",  badgeClass: "bg-primary/10 text-primary border-primary/20" },
  SAVINGS:  { name: "Livret d'Épargne", label: "Épargne",  badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/25" },
  BUSINESS: { name: "Compte Pro",       label: "Pro",      badgeClass: "bg-violet-500/10 text-violet-700 border-violet-500/20 dark:text-violet-400 dark:border-violet-500/25" },
  LIVRET_A: { name: "Livret A",         label: "Livret A", badgeClass: "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400 dark:border-amber-500/25" },
  PEL:      { name: "PEL",              label: "PEL",      badgeClass: "bg-sky-500/10 text-sky-700 border-sky-500/20 dark:text-sky-400 dark:border-sky-500/25" },
};
