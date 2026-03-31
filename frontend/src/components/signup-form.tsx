// src/components/signup-form.tsx
import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRegister } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "./ui/separator"
import api from "@/api/axios"
import { toast } from "sonner"
import useAuthStore from "@/store/authStore"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const registerMutation = useRegister()
  const formRef = useRef<HTMLFormElement>(null)
  const setUser = useAuthStore((state) => state.setUser)

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [localError, setLocalError] = useState("")
  const [userId, setUserId] = useState<number | null>(null)
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    password: "",
    "confirm-password": "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "France",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (e.target.id === "phoneNumber") {
      value = value.replace(/[^0-9+\s\-()+]/g, "")
    }

    setFormData({ ...formData, [e.target.id]: value })
    if (localError) setLocalError("")
  }

  const handleNext = () => {
    if (formRef.current && !formRef.current.reportValidity()) return

    if (formData.password !== formData["confirm-password"]) {
      setLocalError("Les mots de passe ne correspondent pas.")
      return
    }

    setLocalError("")
    setStep(2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const {
      "confirm-password": _,
      street,
      city,
      state,
      zipCode,
      country,
      ...userRest
    } = formData

    const dataToSend = {
      ...userRest,
      address: { street, city, state, zipCode, country },
    }

    registerMutation.mutate(dataToSend, {
      onSuccess: (data) => {
        if (data?.data?.requiresVerification) {
          setUserId(data.data.userId)
          toast.success("Code de vérification envoyé à votre email")
          setStep(3)
        } else {
          navigate("/dashboard")
        }
      },
    })
  }

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast.error("Le code doit contenir 6 chiffres")
      return
    }

    setIsVerifying(true)
    setLocalError("")

    try {
      const response = await api.post("/auth/verify-email", {
        userId,
        code: verificationCode,
      })

      if (response.data.status === "success") {
        toast.success("Email vérifié avec succès!")
        setUser(response.data.data.user)

        const userRole = response.data.data.user.role
        if (userRole === "ADMIN" || userRole === "SUPPORT") {
          navigate("/admin/dashboard")
        } else {
          navigate("/dashboard")
        }
      }
    } catch (error: any) {
      setLocalError(error.response?.data?.error || "Code incorrect")
      toast.error(error.response?.data?.error || "Code incorrect")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    try {
      await api.post("/auth/resend-code", { userId })
      toast.success("Un nouveau code a été envoyé")
      setVerificationCode("")
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erreur lors de l'envoi du code")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col p-6 md:p-8"
          >
            <FieldGroup className="flex flex-col flex-1">
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <h1 className="text-2xl font-bold">
                  {step === 1 && "Créer un compte"}
                  {step === 2 && "Votre adresse"}
                  {step === 3 && "Vérification"}
                </h1>
                <p className="text-sm text-balance text-muted-foreground">
                  {step === 1 && "Renseignez vos informations personnelles"}
                  {step === 2 && "Où pouvons-nous vous joindre ?"}
                  {step === 3 && "Entrez le code reçu par email"}
                </p>
              </div>

              {(localError || registerMutation.isError) && (
                <div className="text-sm font-medium text-destructive text-center p-3 bg-destructive/10 rounded-md mb-2">
                  {localError ||
                    (registerMutation.error as any).response?.data?.error ||
                    "Une erreur est survenue lors de l'inscription."}
                </div>
              )}

              {/* ── ÉTAPE 1 ── */}
              {step === 1 && (
                <div className="flex flex-col flex-1 gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="lastName">Nom</FieldLabel>
                      <Input
                        id="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="firstName">Prénom</FieldLabel>
                      <Input
                        id="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@exemple.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="phoneNumber">Numéro de téléphone</FieldLabel>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      pattern="[0-9+\s\-()]*"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        required
                        minLength={8}
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirm-password">Confirmer</FieldLabel>
                      <Input
                        id="confirm-password"
                        type="password"
                        required
                        minLength={8}
                        value={formData["confirm-password"]}
                        onChange={handleChange}
                      />
                    </Field>
                  </div>

                  <div className="flex-1" />

                  <Button type="button" className="w-full" size={"lg"} onClick={handleNext}>
                    Suivant
                  </Button>

                  <FieldDescription className="text-center">
                    Déjà un compte ?{" "}
                    <Link
                      to="/login"
                      className="text-primary hover:underline font-medium"
                    >
                      Se connecter
                    </Link>
                  </FieldDescription>
                </div>
              )}

              {/* ── ÉTAPE 2 ── */}
              {step === 2 && (
                <div className="flex flex-col flex-1 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <Field>
                    <FieldLabel htmlFor="street">Adresse (N° et rue)</FieldLabel>
                    <Input
                      id="street"
                      type="text"
                      required
                      value={formData.street}
                      onChange={handleChange}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="zipCode">Code postal</FieldLabel>
                      <Input
                        id="zipCode"
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={handleChange}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="city">Ville</FieldLabel>
                      <Input
                        id="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="state">Région / État</FieldLabel>
                      <Input
                        id="state"
                        type="text"
                        required
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="country">Pays</FieldLabel>
                      <Input
                        id="country"
                        type="text"
                        required
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </Field>
                  </div>


                  <Separator/>

                  <div className="flex flex-col gap-4 w-full min-w-0">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      size={"lg"}
                      onClick={() => setStep(1)}
                      disabled={registerMutation.isPending}
                    >
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      size={"lg"}
                      className="w-full"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Création..." : "Créer le compte"}
                    </Button>
                    
                    <FieldDescription className="text-center">
                      Déjà un compte ?{" "}
                      <Link
                        to="/login"
                        className="text-primary hover:underline font-medium"
                      >
                        Se connecter
                      </Link>
                    </FieldDescription>
                  </div>
                </div>
              )}

              {/* ── ÉTAPE 3 - VÉRIFICATION ── */}
              {step === 3 && (
                <div className="flex flex-col flex-1 gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Un code de vérification à 6 chiffres a été envoyé à :
                    </p>
                    <p className="font-semibold">{formData.email}</p>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="verificationCode">Code de vérification</FieldLabel>
                    <Input
                      id="verificationCode"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      placeholder="000000"
                      className="text-center text-2xl tracking-widest"
                      value={verificationCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "")
                        setVerificationCode(value)
                        if (localError) setLocalError("")
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && verificationCode.length === 6) {
                          handleVerifyCode()
                        }
                      }}
                    />
                    <FieldDescription>
                      Le code expire dans 15 minutes
                    </FieldDescription>
                  </Field>

                  <div className="flex-1" />

                  <Button
                    type="button"
                    className="w-full"
                    size={"lg"}
                    onClick={handleVerifyCode}
                    disabled={verificationCode.length !== 6 || isVerifying}
                  >
                    {isVerifying ? "Vérification..." : "Vérifier"}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    size={"lg"}
                    onClick={handleResendCode}
                    disabled={isResending}
                  >
                    {isResending ? "Envoi..." : "Renvoyer le code"}
                  </Button>
                </div>
              )}

            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        En cliquant sur continuer, vous acceptez nos{" "}
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