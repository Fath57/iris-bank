export function formatAmount(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatAmountSigned(amount: number): string {
  const sign = amount >= 0 ? "+" : "−";
  return `${sign}${formatAmount(Math.abs(amount))}`;
}


export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function parseAmount(value: string): number | null {
  const parsed = parseFloat(value.replace(",", "."));
  return isNaN(parsed) || parsed <= 0 ? null : parsed;
}