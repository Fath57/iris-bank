import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useAuthStore from '@/store/authStore';
import type { CreateAccountForm } from '@/types/CreateAccount';
import { useCreateAccount } from '@/hooks/useCreateAccount';
import { AccountForm } from '@/components/createAccount/AccountForm';
import { AccountSummary } from '@/components/createAccount/AccountSummary';


const DEFAULT_FORM: CreateAccountForm = { type: 'CHECKING', balance: '0' };

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { mutate: createAccount, isPending } = useCreateAccount();
  const [form, setForm] = useState<CreateAccountForm>(DEFAULT_FORM);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAccount(
      { type: form.type, userId: user.id, balance: parseFloat(form.balance) || 0 },
      { onSuccess: () => navigate('/accounts') }
    );
  };

  return (
    <div className="p-6 ">
      <div className="mx-auto">

        <div className="mb-8">
          <h1 className="text-xl font-semibold text-foreground">Créer un compte bancaire</h1>
          <p className="text-sm text-muted-foreground">Configurez les paramètres du nouveau compte</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">

            <AccountForm user={user} form={form} onChange={setForm} />

            <Card className="sticky top-6 h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Récapitulatif
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <AccountSummary user={user} form={form} />
                <div className="pt-2">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? 'Création en cours...' : 'Créer le compte'}
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </form>

      </div>
    </div>
  );
}