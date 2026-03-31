import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { AccountType } from '@/data/accountDetails';
import type { User } from '@/store/authStore';
import type { CreateAccountForm } from '@/types/CreateAccount';

const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  CHECKING: 'Courant',
  SAVINGS: 'Épargne',
  BUSINESS: 'Professionnel',
  LIVRET_A: 'Livret A',
  PEL: 'PEL',
};

const ACCOUNT_FEATURES: Record<AccountType, string[]> = {
  CHECKING: ['Carte bancaire incluse', 'Virements SEPA illimités', 'Accès espace client'],
  SAVINGS: ['Taux d\'intérêt compétitif', 'Pas de frais de tenue', 'Accès espace client'],
  BUSINESS: ['Carte bancaire pro incluse', 'Virements SEPA illimités', 'Relevés comptables'],
  LIVRET_A: ['Taux réglementé 3%', 'Exonération fiscale', 'Plafond 22 950€'],
  PEL: ['Taux d\'intérêt garanti', 'Prime d\'État possible', 'Épargne logement'],
};

interface Props {
  user: User;
  form: CreateAccountForm;
}

export function AccountSummary({ user, form }: Props) {
  const balanceNum = parseFloat(form.balance.replace(',', '.')) || 0;
  const today = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Owner */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-sm font-medium text-blue-700">
          {user.firstName?.[0]}{user.lastName?.[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-muted-foreground">Titulaire du compte</p>
        </div>
      </div>

      {/* Balance */}
      <div className="rounded-lg bg-muted px-4 py-3 text-center">
        <p className="font-mono text-2xl font-medium text-foreground">
          {balanceNum.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">Solde d'ouverture</p>
      </div>

      {/* Details */}
      <div className="space-y-0">
        <SummaryRow label="Type">
          <Badge variant="secondary">{ACCOUNT_TYPE_LABELS[form.type]}</Badge>
        </SummaryRow>
        <SummaryRow label="Statut">
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Actif</Badge>
        </SummaryRow>
        <SummaryRow label="IBAN">
          <span className="text-xs italic text-muted-foreground">Assigné à la création</span>
        </SummaryRow>
        <SummaryRow label="Devise">
          <span className="text-sm font-medium">EUR €</span>
        </SummaryRow>
        <SummaryRow label="Date" last>
          <span className="text-sm font-medium">{today}</span>
        </SummaryRow>
      </div>

      <Separator />

      {/* Features */}
      <ul className="space-y-1.5">
        {ACCOUNT_FEATURES[form.type].map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SummaryRow({
  label,
  children,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={cn('flex items-center justify-between py-2.5', !last && 'border-b border-border')}>
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}