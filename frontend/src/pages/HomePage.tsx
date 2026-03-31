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
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IrisBank
              </span>
            </div>
            <nav className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Connexion</Button>
              </Link>
              <Link to="/signup">
                <Button>Ouvrir un compte</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            La banque{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              nouvelle génération
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gérez vos finances en toute simplicité avec IrisBank. Comptes courants,
            épargne, virements instantanés et bien plus encore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                Ouvrir un compte gratuitement
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Pourquoi choisir IrisBank ?</h2>
          <p className="text-muted-foreground">
            Une expérience bancaire moderne et sécurisée
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Comptes multiples</h3>
              <p className="text-sm text-muted-foreground">
                Compte courant, épargne, professionnel, Livret A et PEL. Tout ce dont
                vous avez besoin.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Sécurité maximale</h3>
              <p className="text-sm text-muted-foreground">
                Vos données sont protégées avec un chiffrement de niveau bancaire et
                l'authentification 2FA.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Taux compétitifs</h3>
              <p className="text-sm text-muted-foreground">
                Profitez de taux d'intérêt attractifs sur vos comptes épargne et
                produits d'investissement.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Application mobile</h3>
              <p className="text-sm text-muted-foreground">
                Gérez vos comptes où que vous soyez avec notre application intuitive
                et rapide.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Virements instantanés</h3>
              <p className="text-sm text-muted-foreground">
                Transférez de l'argent en quelques secondes vers n'importe quel compte
                SEPA.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Confidentialité</h3>
              <p className="text-sm text-muted-foreground">
                Vos informations personnelles sont protégées. Consultez notre politique
                de confidentialité.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à rejoindre IrisBank ?
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Ouvrez votre compte en quelques minutes et profitez d'une offre de
              bienvenue de 100€ offerts.
            </p>
            <Link to="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 bg-white text-blue-600 hover:bg-white/90"
              >
                Créer mon compte gratuitement
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">I</span>
                </div>
                <span className="font-bold">IrisBank</span>
              </div>
              <p className="text-sm text-muted-foreground">
                La banque qui vous comprend.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Produits</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/signup" className="hover:text-foreground">
                    Compte courant
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-foreground">
                    Compte épargne
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-foreground">
                    Compte professionnel
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Entreprise</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Carrières
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Presse
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Légal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/privacy-policy" className="hover:text-foreground">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Conditions d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Mentions légales
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 IrisBank. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
