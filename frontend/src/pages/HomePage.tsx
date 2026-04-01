import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Shield,
  TrendingUp,
  Smartphone,
  Lock,
  Zap,
  ArrowRight,
  CheckCircle2,
  Users,
  Globe,
  BadgeCheck,
  ShieldCheck,
  Landmark,
  ChevronRight,
} from "lucide-react";

/* ─── tiny helper ─── */
const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ════════════════════════  HEADER  ════════════════════════ */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-lg leading-none">
                I
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Iris<span className="text-primary">Bank</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Connexion
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="gap-1.5 shadow-sm">
                Ouvrir un compte
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* ════════════════════════  HERO  ════════════════════════ */}
      <section className="relative grain isolate overflow-hidden">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-primary/10 blur-[120px] animate-pulse-soft" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-primary/8 blur-[100px] animate-pulse-soft delay-200" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8">
              <BadgeCheck className="h-4 w-4" />
              Agréée par l'ACPR — Banque de France
            </div>

            <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
              Votre argent mérite{" "}
              <span className="text-primary">
                une banque à la hauteur
              </span>
            </h1>

            <p className="animate-fade-up delay-200 mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comptes courants, épargne, virements instantanés — gérez vos
              finances avec simplicité, transparence et sécurité.
            </p>

            <div className="animate-fade-up delay-300 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="gap-2 shadow-lg text-base px-8">
                  Ouvrir un compte gratuitement
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Se connecter
                </Button>
              </Link>
            </div>

            {/* Quick trust line */}
            <div className="animate-fade-up delay-400 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Sans frais cachés
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Ouverture en 5 min
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                100 % en ligne
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════  STATS BAR  ═════════════════════ */}
      <div className="border-y border-border/60 bg-muted/30">
        <Section className="py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "120 000+", label: "Clients actifs", icon: Users },
              { value: "€2,4 Mds", label: "Dépôts sécurisés", icon: Landmark },
              { value: "15+", label: "Pays couverts", icon: Globe },
              { value: "4.8/5", label: "Satisfaction client", icon: BadgeCheck },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`animate-count-up delay-${(i + 1) * 100} flex flex-col items-center gap-2`}
              >
                <stat.icon className="h-5 w-5 text-primary mb-1" />
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ═════════════════════  FEATURES  ═════════════════════ */}
      <Section className="py-20 md:py-28">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="animate-fade-up text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">
            Tout ce dont vous avez besoin,{" "}
            <span className="text-primary">rien de superflu</span>
          </h2>
          <p className="animate-fade-up delay-100 text-muted-foreground text-lg">
            Une expérience bancaire pensée pour le quotidien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {[
            {
              icon: CreditCard,
              title: "Comptes multiples",
              desc: "Courant, épargne, professionnel, Livret A et PEL — tous vos comptes au même endroit.",
              delay: "delay-100",
            },
            {
              icon: Shield,
              title: "Sécurité maximale",
              desc: "Chiffrement de niveau bancaire, authentification 2FA et surveillance continue.",
              delay: "delay-200",
            },
            {
              icon: TrendingUp,
              title: "Taux compétitifs",
              desc: "Des taux d'intérêt attractifs sur l'épargne et les produits d'investissement.",
              delay: "delay-300",
            },
            {
              icon: Smartphone,
              title: "Application mobile",
              desc: "Gérez vos comptes où que vous soyez, à tout moment, en toute simplicité.",
              delay: "delay-400",
            },
            {
              icon: Zap,
              title: "Virements instantanés",
              desc: "Transférez en quelques secondes vers n'importe quel compte en zone SEPA.",
              delay: "delay-500",
            },
            {
              icon: Lock,
              title: "Confidentialité",
              desc: "Vos données personnelles restent les vôtres. Conformité RGPD garantie.",
              delay: "delay-600",
            },
          ].map((feature) => (
            <Card
              key={feature.title}
              className={`animate-fade-up ${feature.delay} group relative border border-border/60 bg-card shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/15">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* ══════════════════  TRUST / SECURITY  ══════════════════ */}
      <div className="bg-muted/30 border-y border-border/60">
        <Section className="py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            {/* Left – text */}
            <div className="animate-slide-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6">
                <ShieldCheck className="h-3.5 w-3.5" />
                Sécurité & conformité
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-foreground">
                Votre confiance,{" "}
                <span className="text-primary">notre priorité</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                IrisBank est un établissement agréé, soumis aux contrôles de
                l'Autorité de Contrôle Prudentiel et de Résolution (ACPR). Vos
                dépôts sont garantis à hauteur de 100 000 € par le Fonds de
                Garantie des Dépôts et de Résolution (FGDR).
              </p>
              <ul className="space-y-4">
                {[
                  "Agrément ACPR — Banque de France",
                  "Garantie des dépôts FGDR jusqu'à 100 000 €",
                  "Conformité RGPD & DSP2",
                  "Authentification forte & chiffrement AES-256",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right – visual card stack */}
            <div className="animate-slide-right relative flex items-center justify-center">
              <div className="relative w-full max-w-sm mx-auto">
                {/* Background cards */}
                <div className="absolute -top-3 -right-3 w-full h-full rounded-2xl bg-primary/5 border border-primary/10 rotate-3" />
                <div className="absolute -top-1.5 -right-1.5 w-full h-full rounded-2xl bg-primary/8 border border-primary/10 rotate-1.5" />

                {/* Main card */}
                <Card className="relative bg-card border border-border shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-lg">I</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">IrisBank</p>
                        <p className="text-xs text-muted-foreground">
                          Établissement agréé
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-border/60">
                        <span className="text-sm text-muted-foreground">
                          Garantie FGDR
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          100 000 €
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border/60">
                        <span className="text-sm text-muted-foreground">
                          Chiffrement
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          AES-256
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border/60">
                        <span className="text-sm text-muted-foreground">
                          Authentification
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          2FA / TOTP
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-sm text-muted-foreground">
                          Conformité
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          RGPD · DSP2
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ═══════════════════  CTA SECTION  ═══════════════════ */}
      <Section className="py-20 md:py-28">
        <div className="animate-fade-up relative max-w-4xl mx-auto rounded-3xl bg-primary overflow-hidden shadow-2xl">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative px-8 py-14 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary-foreground">
              Prêt à rejoindre IrisBank ?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
              Ouvrez votre compte en quelques minutes. Sans paperasse,
              sans frais cachés, sans engagement.
            </p>
            <Link to="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 bg-white text-primary hover:bg-white/90 shadow-lg text-base px-8 font-semibold"
              >
                Créer mon compte
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* ════════════════════════  FOOTER  ════════════════════════ */}
      <footer className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-base">I</span>
                </div>
                <span className="text-lg font-bold text-foreground">
                  Iris<span className="text-primary">Bank</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                La banque qui vous comprend.
                <br />
                Établissement de crédit agréé par l'ACPR.
              </p>
            </div>

            {/* Produits */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-foreground">Produits</h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {["Compte courant", "Compte épargne", "Livret A", "Compte professionnel"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="/signup"
                        className="hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Entreprise */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-foreground">Entreprise</h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {["À propos", "Carrières", "Presse", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Légal */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-foreground">Légal</h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Politique de confidentialité
                  </Link>
                </li>
                {["Conditions générales", "Mentions légales", "Tarifs"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border/60 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} IrisBank S.A. — Établissement de
              crédit agréé par l'ACPR (CIB 99999). Siège social : Paris, France.
            </p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Dépôts garantis par le FGDR jusqu'à 100 000 €
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
