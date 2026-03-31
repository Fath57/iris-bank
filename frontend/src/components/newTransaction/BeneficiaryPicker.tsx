import { useState } from "react";
import { Plus, CheckCircle2, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AddBeneficiaryModal, type NewBeneficiary } from "./AddBeneficiaryModal";
import { useBeneficiaries, useAddBeneficiary } from "@/hooks/useBeneficiaries";
import { toast } from "sonner";

interface BeneficiaryPickerProps {
  selectedIban: string;
  onSelect: (name: string, iban: string) => void;
}

function maskIban(iban: string) {
  const clean = iban.replace(/\s/g, "");
  return `${clean.slice(0, 4)} ···· ${clean.slice(-7)}`;
}

export function BeneficiaryPicker({ selectedIban, onSelect }: BeneficiaryPickerProps) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { data: beneficiaries = [], isLoading, isError } = useBeneficiaries();
  const addMutation = useAddBeneficiary();

  const filtered = beneficiaries.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.iban.replace(/\s/g, "").includes(search.replace(/\s/g, ""))
  );

  const handleAdd = (b: NewBeneficiary) => {
    addMutation.mutate(
      { name: b.name, iban: b.iban },
      {
        onSuccess: (created) => {
          onSelect(created.name, created.iban);
          setShowModal(false);
        },
        onError: () => {
          toast.error("Erreur lors de l'ajout du bénéficiaire");
        },
      }
    );
  };

  return (
    <>
      {showModal && (
        <AddBeneficiaryModal
          onAdd={handleAdd}
          onClose={() => setShowModal(false)}
          isPending={addMutation.isPending}
        />
      )}
      <div className="flex flex-col gap-1.5 pt-1" style={{ height: 152 }}>
        <div className="relative shrink-0">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 pointer-events-none" />
          <Input
            placeholder="Nom ou IBAN…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>
        <div className="flex-1 overflow-y-auto space-y-1 min-h-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : isError ? (
            <p className="text-xs text-destructive text-center py-3">Erreur de chargement</p>
          ) : filtered.length === 0 ? (
            <p className="text-xs text-muted-foreground/50 text-center py-3">Aucun bénéficiaire</p>
          ) : (
            filtered.map((b) => {
              const selected = b.iban === selectedIban;
              return (
                <button
                  key={b.id}
                  onClick={() => onSelect(b.name, b.iban)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all text-left",
                    selected
                      ? "border-border bg-muted/40"
                      : "border-border/40 hover:border-border/70 hover:bg-muted/20"
                  )}
                >
                  <div>
                    <p className="text-xs font-medium">{b.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground/50 mt-0.5">{maskIban(b.iban)}</p>
                  </div>
                  {selected && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                </button>
              );
            })
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="shrink-0 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-dashed border-border/50 text-xs text-muted-foreground/50 hover:text-muted-foreground hover:border-border/70 transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          Ajouter un bénéficiaire
        </button>
      </div>
    </>
  );
}