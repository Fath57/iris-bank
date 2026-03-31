import { LoginForm } from "@/components/login-form";
import { Link } from "react-router-dom";
import { Shield, Smartphone, Zap, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-5">
      {/* Left Side - Visual Section (2 cols) */}
      <div className="hidden lg:flex lg:col-span-2 flex-col justify-between bg-primary p-10 text-primary-foreground relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
              <span className="text-primary font-bold text-xl">I</span>
            </div>
            <span className="text-2xl font-bold text-white">IrisBank</span>
          </Link>

          {/* Main content */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Votre banque, toujours à portée de main
            </h1>
            <p className="text-primary-foreground/80 mb-8">
              Accédez à vos comptes en toute sécurité depuis n'importe où
            </p>

            {/* Illustration SVG - Security & Mobile Banking */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <svg
                viewBox="0 0 400 300"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Mobile phone */}
                <rect x="120" y="40" width="160" height="240" rx="20" fill="white" opacity="0.95"/>
                <rect x="120" y="40" width="160" height="240" rx="20" stroke="#3B82F6" strokeWidth="3" opacity="0.5"/>
                <rect x="135" y="60" width="130" height="200" rx="5" fill="#F3F4F6"/>

                {/* Screen content - Dashboard */}
                <circle cx="200" cy="90" r="8" fill="#3B82F6"/>
                <rect x="155" y="110" width="90" height="6" rx="3" fill="#D1D5DB"/>
                <rect x="155" y="125" width="60" height="6" rx="3" fill="#D1D5DB"/>

                {/* Balance card */}
                <rect x="145" y="145" width="110" height="50" rx="8" fill="#3B82F6" opacity="0.2"/>
                <text x="155" y="165" fontSize="10" fill="#1F2937">Solde</text>
                <text x="155" y="182" fontSize="16" fontWeight="bold" fill="#1F2937">12 450€</text>

                {/* Transactions */}
                <rect x="145" y="210" width="110" height="8" rx="4" fill="#10B981" opacity="0.3"/>
                <rect x="145" y="225" width="110" height="8" rx="4" fill="#EF4444" opacity="0.3"/>
                <rect x="145" y="240" width="110" height="8" rx="4" fill="#10B981" opacity="0.3"/>

                {/* Shield with lock */}
                <g transform="translate(310, 80)">
                  <path d="M 0 0 L 15 -10 L 30 0 L 30 25 Q 30 40 15 45 Q 0 40 0 25 Z" fill="#10B981" opacity="0.7"/>
                  <rect x="10" y="15" width="10" height="10" rx="2" fill="white"/>
                  <circle cx="15" cy="12" r="4" stroke="white" strokeWidth="2" fill="none"/>
                </g>

                {/* Checkmarks for security */}
                <circle cx="50" cy="100" r="15" fill="#10B981" opacity="0.6"/>
                <path d="M 45 100 L 48 103 L 55 96" stroke="white" strokeWidth="2" fill="none"/>

                <circle cx="350" cy="220" r="15" fill="#10B981" opacity="0.6"/>
                <path d="M 345 220 L 348 223 L 355 216" stroke="white" strokeWidth="2" fill="none"/>

                {/* Wifi/Signal indicator */}
                <path d="M 60 200 Q 70 190 80 200" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.6"/>
                <path d="M 65 205 Q 70 200 75 205" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.8"/>
              </svg>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Accès instantané</p>
                <p className="text-sm text-primary-foreground/70">Consultez vos comptes en temps réel</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Protection renforcée</p>
                <p className="text-sm text-primary-foreground/70">Authentification 2FA sécurisée</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Multi-plateformes</p>
                <p className="text-sm text-primary-foreground/70">Web, mobile, tablette</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer security badge */}
        <div className="relative z-10 flex items-center gap-3 p-4 rounded-lg bg-white/10 border border-white/20">
          <Lock className="w-8 h-8" />
          <div>
            <p className="font-semibold text-sm">Connexion sécurisée SSL</p>
            <p className="text-xs text-primary-foreground/70">Vos données sont chiffrées</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form (3 cols) */}
      <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 md:p-10 bg-background">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">I</span>
            </div>
            <span className="text-2xl font-bold text-foreground">IrisBank</span>
          </Link>

          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Bon retour !</h1>
            <p className="text-muted-foreground">
              Connectez-vous pour accéder à votre espace client
            </p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Pas encore de compte ?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
