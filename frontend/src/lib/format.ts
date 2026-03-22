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