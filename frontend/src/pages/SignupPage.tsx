import { SignupForm } from "@/components/signup-form";
import { Link } from "react-router-dom";
import { Shield, CreditCard, TrendingUp, CheckCircle2, Star } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-7">
      {/* Left Side - Visual Section (3 cols) */}
      <div className="hidden lg:flex lg:col-span-3 flex-col justify-between bg-primary p-10 text-primary-foreground relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
              <span className="text-primary font-bold text-xl">I</span>
            </div>
            <span className="text-2xl font-bold text-white">IrisBank</span>
          </Link>

          {/* Main illustration */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Rejoignez plus de 100 000 clients satisfaits
            </h1>
            <p className="text-primary-foreground/80 mb-8">
              Ouvrez votre compte en quelques minutes et profitez de tous nos avantages
            </p>

            {/* Illustration SVG - Banking concept */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <svg
                viewBox="0 0 400 300"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Credit Card */}
                <rect x="50" y="80" width="300" height="180" rx="15" fill="white" opacity="0.9"/>
                <rect x="50" y="80" width="300" height="50" fill="#3B82F6" opacity="0.8"/>
                <circle cx="90" cy="105" r="15" fill="white" opacity="0.5"/>
                <circle cx="120" cy="105" r="15" fill="white" opacity="0.3"/>

                {/* Chip */}
                <rect x="70" y="150" width="50" height="40" rx="5" fill="#FFD700" opacity="0.8"/>
                <line x1="75" y1="160" x2="115" y2="160" stroke="#000" strokeWidth="1" opacity="0.3"/>
                <line x1="75" y1="170" x2="115" y2="170" stroke="#000" strokeWidth="1" opacity="0.3"/>
                <line x1="75" y1="180" x2="115" y2="180" stroke="#000" strokeWidth="1" opacity="0.3"/>

                {/* Card number */}
                <text x="70" y="220" fontSize="16" fill="#1F2937" fontFamily="monospace">**** **** ****</text>
                <text x="70" y="245" fontSize="12" fill="#6B7280">IRIS BANK</text>

                {/* Floating coins */}
                <circle cx="330" cy="60" r="20" fill="#FFD700" opacity="0.6"/>
                <text x="320" y="68" fontSize="20">€</text>
                <circle cx="360" cy="100" r="15" fill="#FFD700" opacity="0.5"/>
                <text x="353" y="106" fontSize="16">€</text>

                {/* Shield icon */}
                <path d="M 30 120 L 30 170 Q 30 200 50 210 L 50 210 Q 30 200 30 170 Z" fill="#10B981" opacity="0.6"/>
                <path d="M 35 135 L 42 142 L 50 130" stroke="white" strokeWidth="3" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">100€ offerts</p>
                <p className="text-sm text-primary-foreground/70">À l'ouverture de votre compte</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Sécurité maximale</p>
                <p className="text-sm text-primary-foreground/70">Protection 2FA de vos données</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Sans frais cachés</p>
                <p className="text-sm text-primary-foreground/70">Transparence totale garantie</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
          <div className="text-center">
            <p className="text-2xl font-bold">100K+</p>
            <p className="text-xs text-primary-foreground/70">Clients</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">4.9/5</p>
            <p className="text-xs text-primary-foreground/70">Note</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-xs text-primary-foreground/70">Support</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form (4 cols) */}
      <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 md:p-16 lg:p-34 bg-background">
        <div className="w-full max-w-5xl">
          {/* Logo for mobile */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">I</span>
            </div>
            <span className="text-2xl font-bold text-foreground">IrisBank</span>
          </Link>

          {/* Form */}
          <SignupForm />

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
