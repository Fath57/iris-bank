import type { Account } from "@/types/Account";

export const mockAccounts: Account[] = [
  {
    id: "1",
    name: "Compte courant",
    type: "courant",
    subtype: "Compte principal",
    iban: "FR76 •••• •••• 4821",
    balance: 1243.22,
    recentTransactions: [
      { id: "t1", label: "Virement reçu — Salaire", date: "18 mars", amount: 2400.0 },
      { id: "t2", label: "Retrait DAB", date: "17 mars", amount: -80.0 },
      { id: "t3", label: "Paiement CB — Carrefour", date: "15 mars", amount: -62.4 },
    ],
  },
  {
    id: "2",
    name: "Livret A",
    type: "epargne",
    subtype: "Épargne réglementée",
    iban: "FR76 •••• •••• 9034",
    balance: 3600.0,
    recentTransactions: [
      { id: "t4", label: "Dépôt", date: "1 mars", amount: 200.0 },
      { id: "t5", label: "Intérêts annuels", date: "1 janv.", amount: 72.0 },
    ],
  },
  {
    id: "3",
    name: "Compte joint",
    type: "joint",
    subtype: "Compte partagé",
    iban: "FR76 •••• •••• 2210",
    balance: -16.68,
    recentTransactions: [
      { id: "t6", label: "Prélèvement EDF", date: "19 mars", amount: -134.0 },
      { id: "t7", label: "Virement reçu", date: "18 mars", amount: 120.0 },
    ],
  },
];