import { CreditCard, PiggyBank, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AccountType } from '@/types/CreateAccount';

const ACCOUNT_TYPES: {
  value: AccountType;
  label: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}[] = [
  {
    value: 'CHECKING',
    label: 'Courant',
    description: 'Opérations quotidiennes',
    icon: <CreditCard size={16} className="text-blue-700" />,
    iconBg: 'bg-blue-100',
  },
  {
    value: 'SAVINGS',
    label: 'Épargne',
    description: 'Intérêts & économies',
    icon: <PiggyBank size={16} className="text-green-700" />,
    iconBg: 'bg-green-100',
  },
  {
    value: 'BUSINESS',
    label: 'Professionnel',
    description: 'Usage entreprise',
    icon: <Briefcase size={16} className="text-amber-700" />,
    iconBg: 'bg-amber-100',
  },
];

interface Props {
  value: AccountType;
  onChange: (type: AccountType) => void;
}

export function AccountTypeSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {ACCOUNT_TYPES.map((type) => (
        <button
          key={type.value}
          type="button"
          onClick={() => onChange(type.value)}
          className={cn(
            'flex flex-col items-start rounded-lg border p-3 text-left transition-all',
            value === type.value
              ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
              : 'border-border bg-background hover:bg-muted'
          )}
        >
          <div className={cn('mb-2.5 rounded-md p-1.5', type.iconBg)}>
            {type.icon}
          </div>
          <span className="text-sm font-medium text-foreground">{type.label}</span>
          <span className="mt-0.5 text-xs text-muted-foreground">{type.description}</span>
        </button>
      ))}
    </div>
  );
}