import type { Transaction } from "@/data/accountDetails";
import { formatMonthYear } from "./format";

export function groupByMonth(transactions: Transaction[]): [string, Transaction[]][] {
  const map = new Map<string, Transaction[]>();

  for (const tx of transactions) {
    const key = formatMonthYear(tx.date);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(tx);
  }

  return Array.from(map.entries());
}