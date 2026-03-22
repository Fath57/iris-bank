import { ArrowDown, ArrowLeftRight, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TransactionFormValues } from "@/types/TransactionForm";
import { AccountDropdown } from "./AccountDropdown";
import { BeneficiaryPicker } from "./BeneficiaryPicker";
import { AmountInput } from "./AmountInput";

interface TransactionFormProps {
  values: TransactionFormValues;
  onChange: (values: TransactionFormValues) => void;
  accounts: any[];
}

export function TransactionForm({ values, onChange, accounts }: TransactionFormProps) {
  const update = (patch: Partial<TransactionFormValues>) => onChange({ ...values, ...patch });

  const fromAccount = accounts.find((a) => a.iban === values.fromAccountIban) ?? accounts[0];

  const handleModeSwitch = (mode: "externe" | "interne") => {
    const to = accounts.find((a) => a.iban !== values.fromAccountIban) || accounts[0];
    update({
      mode,
      toBeneficiaryName: mode === "interne" ? to.name : "",
      toBeneficiaryIban: mode === "interne" ? to.iban : "",
    });
  };

  const handleSwapInterne = () => {
    const to = accounts.find((a) => a.iban === values.toBeneficiaryIban);
    if (!to) return;
    update({
      fromAccountName: to.name,
      fromAccountIban: to.iban,
      fromAccountBalance: to.balance,
      toBeneficiaryName: fromAccount.name,
      toBeneficiaryIban: fromAccount.iban,
    });
  };

  return (
    <div className="space-y-4">
      {/* Mode tabs */}
      <div className="flex gap-1 p-1 bg-muted/50 rounded-lg border border-border/50">
        {(["externe", "interne"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => handleModeSwitch(mode)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all",
              values.mode === mode
                ? "bg-background shadow-sm border border-border/50 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {mode === "externe" ? <Users className="h-3.5 w-3.5" /> : <ArrowLeftRight className="h-3.5 w-3.5" />}
            {mode === "externe" ? "Vers un bénéficiaire" : "Entre mes comptes"}
          </button>
        ))}
      </div>

      {/* De → Vers */}
      <Card className="border">
        <CardHeader className="pb-2">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground/60 font-medium">De → Vers</p>
        </CardHeader>
        <CardContent className="space-y-1 pt-0">
          <AccountDropdown
            label="De"
            accounts={accounts}
            selectedIban={values.fromAccountIban}
            disabledIban={values.mode === "interne" ? values.toBeneficiaryIban : undefined}
            onSelect={(iban, name, balance) => update({ fromAccountIban: iban, fromAccountName: name, fromAccountBalance: balance })}
          />

          <div className="flex items-center justify-center py-0.5">
            {values.mode === "interne" ? (
              <button
                onClick={handleSwapInterne}
                className="flex items-center gap-1 text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors group"
              >
                <ArrowLeftRight className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                <span>inverser</span>
              </button>
            ) : (
              <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/30" />
            )}
          </div>

          {values.mode === "interne" ? (
            <AccountDropdown
              label="Vers"
              accounts={accounts}
              selectedIban={values.toBeneficiaryIban}
              disabledIban={values.fromAccountIban}
              onSelect={(iban, name) => update({ toBeneficiaryIban: iban, toBeneficiaryName: name })}
            />
          ) : (
            <BeneficiaryPicker
              selectedIban={values.toBeneficiaryIban}
              onSelect={(name, iban) => update({ toBeneficiaryName: name, toBeneficiaryIban: iban })}
            />
          )}
        </CardContent>
      </Card>

      {/* Montant & Détails */}
      <Card className="border">
        <CardHeader className="pb-2">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground/60 font-medium">Montant & détails</p>
        </CardHeader>
        <CardContent>
          <AmountInput
            amount={values.amount}
            motif={values.motif}
            maxAmount={fromAccount.balance}
            onAmountChange={(amount) => update({ amount })}
            onMotifChange={(motif) => update({ motif })}
          />
        </CardContent>
      </Card>
    </div>
  );
}