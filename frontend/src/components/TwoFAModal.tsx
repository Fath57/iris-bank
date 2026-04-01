import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSetup2FA, useConfirm2FA, useDisable2FA } from "@/hooks/use2FA";

interface TwoFAModalProps {
  isEnabled: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type Step = "confirm_disable" | "setup_qr" | "confirm_enable";

export function TwoFAModal({ isEnabled, onClose, onSuccess }: TwoFAModalProps) {
  const [step, setStep] = useState<Step>(isEnabled ? "confirm_disable" : "setup_qr");
  const [code, setCode] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);

  const setupMutation = useSetup2FA();
  const confirmMutation = useConfirm2FA();
  const disableMutation = useDisable2FA();

  const isPending = setupMutation.isPending || confirmMutation.isPending || disableMutation.isPending;

  // Lance le setup 2FA lors du clic sur "Générer le QR Code"
  const handleStartSetup = () => {
    setupMutation.mutate(undefined, {
      onSuccess: (data) => {
        setQrCode(data.qrCode);
        setStep("confirm_enable");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Erreur lors de la génération du QR code");
        onClose();
      },
    });
  };

  const handleConfirmEnable = () => {
    if (code.length !== 6) return;
    confirmMutation.mutate(code, {
      onSuccess: () => {
        toast.success("Authentification à deux facteurs activée !");
        onSuccess();
        onClose();
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Code invalide");
        setCode("");
      },
    });
  };

  const handleDisable = () => {
    if (code.length !== 6) return;
    disableMutation.mutate(code, {
      onSuccess: () => {
        toast.success("Authentification à deux facteurs désactivée");
        onSuccess();
        onClose();
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Code invalide");
        setCode("");
      },
    });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        {/* Étape : activation — afficher bouton pour générer le QR */}
        {step === "setup_qr" && (
          <>
            <DialogHeader>
              <DialogTitle>Activer l'authentification 2FA</DialogTitle>
              <DialogDescription>
                Scannez le QR code avec Google Authenticator, Authy ou une application compatible TOTP.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 text-sm text-muted-foreground">
              Cliquez sur "Générer le QR Code" pour démarrer la configuration.
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Annuler</Button>
              <Button onClick={handleStartSetup} disabled={isPending}>
                {isPending ? "Génération..." : "Générer le QR Code"}
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Étape : scanner le QR code et entrer le premier code */}
        {step === "confirm_enable" && qrCode && (
          <>
            <DialogHeader>
              <DialogTitle>Scanner le QR Code</DialogTitle>
              <DialogDescription>
                Scannez ce code avec votre application authenticator, puis entrez le code à 6 chiffres généré.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-2">
              <img src={qrCode} alt="QR Code 2FA" className="w-48 h-48 rounded-lg border" />
              <div className="w-full space-y-2">
                <Label htmlFor="totp-code">Code de vérification</Label>
                <Input
                  id="totp-code"
                  placeholder="123456"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  className="text-center tracking-widest text-lg font-mono"
                  autoComplete="one-time-code"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Annuler</Button>
              <Button
                onClick={handleConfirmEnable}
                disabled={isPending || code.length !== 6}
              >
                {isPending ? "Vérification..." : "Confirmer et activer"}
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Étape : désactivation — exige un code valide */}
        {step === "confirm_disable" && (
          <>
            <DialogHeader>
              <DialogTitle>Désactiver le 2FA</DialogTitle>
              <DialogDescription>
                Entrez le code à 6 chiffres généré par votre application authenticator pour confirmer la désactivation.
              </DialogDescription>
            </DialogHeader>
            <div className="py-2 space-y-2">
              <Label htmlFor="totp-disable-code">Code de vérification</Label>
              <Input
                id="totp-disable-code"
                placeholder="123456"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="text-center tracking-widest text-lg font-mono"
                autoComplete="one-time-code"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Annuler</Button>
              <Button
                variant="destructive"
                onClick={handleDisable}
                disabled={isPending || code.length !== 6}
              >
                {isPending ? "Désactivation..." : "Désactiver le 2FA"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
