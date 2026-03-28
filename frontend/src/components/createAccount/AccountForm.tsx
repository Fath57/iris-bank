import { Clock } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { AccountTypeSelector } from './AccountTypeSelector';
import type { User } from '@/store/authStore';
import type { CreateAccountForm } from '@/types/CreateAccount';
import type { AccountType } from '@/data/accountDetails';

interface Props {
  user: User;
  form: CreateAccountForm;
  onChange: (form: CreateAccountForm) => void;
}

export function AccountForm({ user, form, onChange }: Props) {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Type de compte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AccountTypeSelector
            value={form.type}
            onChange={(type: AccountType) => onChange({ ...form, type })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Informations du compte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Titulaire du compte</Label>
            <div className="flex h-9 items-center gap-2.5 rounded-md border border-border bg-muted/50 px-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-medium text-blue-700">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <span className="text-sm text-foreground">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Le compte sera rattaché à votre profil</p>
          </div>

          <Separator />

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">IBAN</Label>
            <div className="flex h-9 items-center gap-2 rounded-md border border-dashed border-border bg-muted/30 px-3">
              <Clock size={13} className="text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground">
                Généré automatiquement à la création
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              L'IBAN sera assigné par le serveur lors de la validation
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}