import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLogin } from "@/hooks/useAuth"
import { useVerify2FALogin } from "@/hooks/use2FA"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [twoFARequired, setTwoFARequired] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [totpCode, setTotpCode] = useState("")

  const navigate = useNavigate()
  const loginMutation = useLogin()
  const verify2FAMutation = useVerify2FALogin()

  const redirectByRole = (role: string) => {
    if (role === "ADMIN" || role === "SUPPORT") {
      navigate("/admin/dashboard")
    } else {
      navigate("/dashboard")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data?.requiresTwoFactor) {
            setUserId(data.data.userId)
            setTwoFARequired(true)
            return
          }
          redirectByRole(data?.data?.user?.role)
        },
      }
    )
  }

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId || totpCode.length !== 6) return
    verify2FAMutation.mutate(
      { userId, code: totpCode },
      {
        onSuccess: (data) => {
          redirectByRole(data?.data?.user?.role)
        },
      }
    )
  }

  // --- Écran 2FA ---
  if (twoFARequired) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Vérification 2FA</CardTitle>
            <CardDescription>
              Entrez le code à 6 chiffres généré par votre application authenticator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify2FA}>
              <FieldGroup>
                {verify2FAMutation.isError && (
                  <div className="text-sm font-medium text-destructive text-center">
                    {(verify2FAMutation.error as any).response?.data?.message || "Code invalide"}
                  </div>
                )}
                <Field>
                  <FieldLabel htmlFor="totp">Code d'authentification</FieldLabel>
                  <Input
                    id="totp"
                    type="text"
                    inputMode="numeric"
                    placeholder="123456"
                    maxLength={6}
                    required
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                    className="text-center tracking-widest text-lg font-mono"
                    autoComplete="one-time-code"
                    autoFocus
                  />
                </Field>
                <Field>
                  <Button
                    type="submit"
                    size="lg"
                    className="mb-2"
                    disabled={verify2FAMutation.isPending || totpCode.length !== 6}
                  >
                    {verify2FAMutation.isPending ? "Vérification..." : "Confirmer"}
                  </Button>
                  <FieldDescription className="text-center">
                    <button
                      type="button"
                      className="text-primary hover:underline text-sm"
                      onClick={() => { setTwoFARequired(false); setTotpCode(""); }}
                    >
                      ← Retour à la connexion
                    </button>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // --- Écran connexion normal ---
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenue</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à votre plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Connexion
              </FieldSeparator>

              {loginMutation.isError && (
                <div className="text-sm font-medium text-destructive text-center">
                  {(loginMutation.error as any).response?.data?.error || "Identifiants incorrects"}
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                  <a href="#" className="ml-auto text-sm text-primary hover:underline">
                    Mot de passe oublié?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  size={"lg"}
                  className="mb-2"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Connexion en cours..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Pas encore de compte ?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:underline font-medium"
                  >
                    Créer un compte
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        En cliquant sur se connecter, vous acceptez nos{" "}
        <a href="#" className="text-primary hover:underline font-medium">
          Conditions d'utilisation
        </a>{" "}
        et notre{" "}
        <Link to="/privacy-policy" className="text-primary hover:underline font-medium">
          Politique de confidentialité
        </Link>
        .
      </FieldDescription>
    </div>
  )
}