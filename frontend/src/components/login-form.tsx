import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLogin } from "@/hooks/useAuth" 
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
  // 1. États pour le formulaire
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  // 2. Hooks de navigation et de requête
  const navigate = useNavigate()
  const loginMutation = useLogin()

  // 3. Fonction de soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // On lance la mutation React-Query
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          // Redirection vers le dashboard si la connexion réussit
          navigate("/dashboard")
        },
      }
    )
  }

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
              
              {/* Affichage d'une erreur si la connexion échoue */}
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
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
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
                {/* On désactive le bouton pendant le chargement */}
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
                    className="underline underline-offset-4 hover:text-primary transition-colors"
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
        En cliquant sur se connecter, vous acceptez nos <a href="#">Conditions d'utilisation</a>.
      </FieldDescription>
    </div>
  )
}