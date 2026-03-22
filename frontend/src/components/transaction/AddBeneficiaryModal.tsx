import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface NewBeneficiary {
  id: string;
  name: string;
  iban: string;
}

interface AddBeneficiaryModalProps {
  onAdd: (b: NewBeneficiary) => void;
  onClose: () => void;
}

export function AddBeneficiaryModal({ onAdd, onClose }: AddBeneficiaryModalProps) {
  const [name, setName] = useState("");
  const [iban, setIban] = useState("");

  const isValid = name.trim().length > 0 && iban.replace(/\s/g, "").length >= 14;

  const handleAdd = () => {
    if (!isValid) return;
    onAdd({ id: Date.now().toString(), name: name.trim(), iban });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm bg-background rounded-xl border border-border shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
          <p className="text-sm font-medium">Nouveau bénéficiaire</p>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Nom</label>
            <Input
              placeholder="Marie Dupont"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">IBAN</label>
            <Input
              placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              className="h-9 text-sm font-mono"
            />
          </div>
        </div>

        <div className="flex gap-2 px-5 pb-4">
          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={onClose}>
            Annuler
          </Button>
          <Button size="sm" className="flex-1 text-xs" disabled={!isValid} onClick={handleAdd}>
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
}