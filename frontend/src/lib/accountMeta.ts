export const ACCOUNT_META: Record<string, { name: string; label: string; badgeClass: string }> = {
  CHECKING: { name: "Compte Courant",   label: "Courant", badgeClass: "bg-blue-50 text-blue-700 border-blue-200" },
  SAVINGS:  { name: "Livret d'Épargne", label: "Épargne", badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  BUSINESS: { name: "Compte Pro",       label: "Pro",     badgeClass: "bg-violet-50 text-violet-700 border-violet-200" },
};