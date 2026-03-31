import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IrisBank
              </span>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Politique de confidentialité</h1>
        <p className="text-muted-foreground mb-8">
          Dernière mise à jour : 31 mars 2026
        </p>

        <Card className="mb-8">
          <CardContent className="pt-6 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                IrisBank s'engage à protéger la confidentialité et la sécurité de vos
                données personnelles. Cette politique de confidentialité explique comment
                nous collectons, utilisons, partageons et protégeons vos informations
                lorsque vous utilisez nos services bancaires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. Données que nous collectons
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Nous collectons les types de données suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong>Informations d'identification :</strong> Nom, prénom, date de
                  naissance, adresse email, numéro de téléphone
                </li>
                <li>
                  <strong>Informations financières :</strong> Numéros de compte (IBAN),
                  historique des transactions, soldes de compte
                </li>
                <li>
                  <strong>Informations de localisation :</strong> Adresse postale,
                  code postal, ville, pays
                </li>
                <li>
                  <strong>Données techniques :</strong> Adresse IP, type de
                  navigateur, système d'exploitation
                </li>
                <li>
                  <strong>Données d'utilisation :</strong> Pages consultées,
                  fonctionnalités utilisées, date et heure des accès
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                3. Comment nous utilisons vos données
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Nous utilisons vos données pour :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Fournir et gérer vos comptes bancaires</li>
                <li>Traiter vos transactions et virements</li>
                <li>Vous authentifier et sécuriser votre compte</li>
                <li>Prévenir la fraude et garantir la sécurité</li>
                <li>Respecter nos obligations légales et réglementaires</li>
                <li>Améliorer nos services et votre expérience utilisateur</li>
                <li>
                  Vous envoyer des communications importantes concernant votre compte
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Partage des données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager
                vos informations uniquement dans les cas suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-3">
                <li>Avec votre consentement explicite</li>
                <li>
                  Avec des prestataires de services qui nous aident à fournir nos
                  services (ex: processeurs de paiement)
                </li>
                <li>Pour se conformer à des obligations légales ou réglementaires</li>
                <li>Pour protéger nos droits, notre propriété ou notre sécurité</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Sécurité des données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité techniques et
                organisationnelles appropriées pour protéger vos données personnelles
                contre tout accès non autorisé, modification, divulgation ou destruction.
                Ces mesures incluent :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-3">
                <li>Chiffrement SSL/TLS pour toutes les communications</li>
                <li>Authentification à deux facteurs (2FA)</li>
                <li>Surveillance continue de la sécurité</li>
                <li>Accès limité aux données par le personnel autorisé uniquement</li>
                <li>Audits de sécurité réguliers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Vos droits</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong>Droit d'accès :</strong> Obtenir une copie de vos données
                  personnelles
                </li>
                <li>
                  <strong>Droit de rectification :</strong> Corriger vos données
                  inexactes ou incomplètes
                </li>
                <li>
                  <strong>Droit à l'effacement :</strong> Demander la suppression de
                  vos données
                </li>
                <li>
                  <strong>Droit à la limitation :</strong> Limiter le traitement de
                  vos données
                </li>
                <li>
                  <strong>Droit à la portabilité :</strong> Recevoir vos données dans
                  un format structuré
                </li>
                <li>
                  <strong>Droit d'opposition :</strong> Vous opposer au traitement de
                  vos données
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à l'adresse :{" "}
                <a
                  href="mailto:privacy@irisbank.fr"
                  className="text-primary hover:underline"
                >
                  privacy@irisbank.fr
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                7. Conservation des données
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous conservons vos données personnelles aussi longtemps que nécessaire
                pour fournir nos services et respecter nos obligations légales. Les
                données financières sont généralement conservées pendant 10 ans
                conformément aux exigences réglementaires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Notre site web utilise des cookies pour améliorer votre expérience.
                Vous pouvez contrôler l'utilisation des cookies via les paramètres de
                votre navigateur. Pour plus d'informations, consultez notre politique
                relative aux cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                9. Modifications de cette politique
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous pouvons mettre à jour cette politique de confidentialité
                périodiquement. Nous vous informerons de tout changement important en
                publiant la nouvelle politique sur cette page et en mettant à jour la
                date de "Dernière mise à jour" en haut de cette page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Nous contacter</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pour toute question concernant cette politique de confidentialité ou vos
                données personnelles, vous pouvez nous contacter :
              </p>
              <div className="bg-muted p-4 rounded-lg mt-4 space-y-2 text-sm">
                <p>
                  <strong>Email :</strong>{" "}
                  <a
                    href="mailto:privacy@irisbank.fr"
                    className="text-primary hover:underline"
                  >
                    privacy@irisbank.fr
                  </a>
                </p>
                <p>
                  <strong>Adresse :</strong> IrisBank, 123 Avenue des Champs-Élysées,
                  75008 Paris, France
                </p>
                <p>
                  <strong>Téléphone :</strong> +33 1 23 45 67 89
                </p>
              </div>
            </section>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 IrisBank. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
