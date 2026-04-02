# 🏦 IRIS Bank - Plateforme Bancaire Moderne

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-22.x-green.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-17.6-blue.svg)

IRIS Bank est une plateforme bancaire moderne full-stack développée avec les dernières technologies web. Elle offre une expérience utilisateur fluide pour la gestion de comptes bancaires, les transactions et le suivi des finances personnelles.

## 📋 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Stack Technique](#-stack-technique)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Comptes de Test](#-comptes-de-test)
- [Structure du Projet](#-structure-du-projet)
- [API Endpoints](#-api-endpoints)
- [Développement](#-développement)
- [Déploiement](#-déploiement)

## ✨ Fonctionnalités

### 🔐 Authentification & Sécurité
- ✅ Inscription multi-étapes (3 étapes)
  - Étape 1 : Informations personnelles
  - Étape 2 : Adresse complète
  - Étape 3 : Vérification email (code 6 chiffres)
- ✅ Vérification email avec Mailtrap
- ✅ Code de vérification avec expiration (15 min)
- ✅ Renvoi de code possible
- ✅ Connexion sécurisée avec JWT (cookies httpOnly)
- ✅ Session persistante (7 jours)
- ✅ Mots de passe hashés avec bcrypt
- ✅ Changement de mot de passe sécurisé
- ✅ Authentification 2FA (préparé)
- ✅ Protection des routes (authentification requise)
- ✅ Redirection automatique selon le rôle (USER/ADMIN)

### 💳 Gestion des Comptes Bancaires
- ✅ Création de comptes multiples (5 types)
  - Compte courant (CHECKING)
  - Compte épargne (SAVINGS)
  - Compte professionnel (BUSINESS)
  - Livret A (LIVRET_A) - Taux 3%, plafond 22 950€
  - PEL (PEL) - Plan Épargne Logement
- ✅ IBAN auto-généré (format FR76)
- ✅ Bonus de bienvenue de 100€ à la création
- ✅ Visualisation de tous les comptes avec détails
- ✅ Détails de compte avec historique complet
- ✅ Statut de compte (ACTIF, BLOQUÉ, FERMÉ)
- ✅ Badges visuels par type de compte
- ✅ Affichage des caractéristiques par type

### 💰 Opérations Bancaires

#### Virements SEPA
- ✅ Virement avec vérification en 2 étapes
- ✅ Validation IBAN du bénéficiaire
- ✅ Gestion automatique des bénéficiaires
- ✅ Support virements internes et externes
- ✅ Description personnalisée
- ✅ Transactions atomiques (ACID)

#### Dépôts et Retraits
- ✅ Dépôt d'argent avec description
- ✅ Retrait avec vérification de solde
- ✅ Mise à jour instantanée du solde
- ✅ Historique détaillé
- ✅ Sélection visuelle du compte

### 📊 Tableau de Bord
- ✅ Vue d'ensemble des finances
- ✅ Solde total tous comptes confondus
- ✅ Répartition par type de compte
- ✅ Dernières transactions avec indicateurs visuels
- ✅ Statistiques de compte
- ✅ Navigation rapide vers les comptes
- ✅ Cartes de compte interactives

### 📈 Historique & Suivi
- ✅ Historique complet des transactions
- ✅ Filtrage par compte avec sélecteur
- ✅ Détails de chaque transaction
  - Type (Dépôt, Retrait, Virement, Paiement)
  - Montant avec formatage français
  - Description
  - Date et heure
  - Bénéficiaire (pour virements)
- ✅ Indicateurs visuels (TrendingUp/Down)
- ✅ Affichage des détails de compte

### 👥 Gestion des Bénéficiaires
- ✅ Sauvegarde automatique lors des virements
- ✅ Liste des bénéficiaires enregistrés
- ✅ Ajout manuel de bénéficiaires
- ✅ Réutilisation pour virements futurs

### 👤 Espace Utilisateur
- ✅ Page Paramètres complète
  - Informations personnelles
  - Coordonnées (email, téléphone)
  - Adresse complète
  - Informations du compte (rôle, statut)
- ✅ Section Sécurité
  - Changement de mot de passe avec validation
  - Toggle 2FA
  - Toasts de confirmation
- ✅ Profil utilisateur détaillé

### 👨‍💼 Panneau d'Administration
- ✅ Dashboard admin avec statistiques
- ✅ Gestion des clients
  - Liste complète des clients
  - Détails client avec comptes
  - Modification des informations client
  - Recherche et filtrage
- ✅ Gestion des comptes
  - Liste de tous les comptes bancaires
  - Filtrage par type et statut
  - Historique des transactions par compte
  - Blocage/Déblocage de comptes avec raison
- ✅ Protection des routes admin (ADMIN/SUPPORT uniquement)

### 🎨 Design & UI/UX
- ✅ Landing page moderne avec sections
  - Hero section avec CTAs
  - Features (6 cartes)
  - Témoignages clients
  - Footer complet
- ✅ Pages d'authentification avec illustrations SVG
  - Design split-screen (43%/57%)
  - Illustrations personnalisées (carte bancaire, mobile)
  - Fond avec gradient primary
  - Responsive mobile
- ✅ Politique de confidentialité complète
- ✅ Utilisation cohérente des couleurs `--primary`
- ✅ Composants Shadcn/ui personnalisés
- ✅ Animations et transitions fluides
- ✅ Toasts de notification (Sonner)
- ✅ Dark mode supporté

## 🚀 Stack Technique

### Backend
| Technologie | Version | Usage |
|-------------|---------|-------|
| **Node.js** | 22.x | Runtime JavaScript |
| **TypeScript** | 5.9.3 | Typage statique |
| **Express.js** | 5.2.1 | Framework web |
| **Prisma** | 6.19.2 | ORM pour PostgreSQL |
| **PostgreSQL** | 17.6 | Base de données |
| **JWT** | 9.0.3 | Authentification |
| **Bcrypt** | 3.0.3 | Hashage des mots de passe |
| **Nodemailer** | 6.9.x | Envoi d'emails |
| **Zod** | 3.23.8 | Validation des données |
| **CORS** | 2.8.6 | Gestion des requêtes cross-origin |

### Frontend
| Technologie | Version | Usage |
|-------------|---------|-------|
| **React** | 19.2.0 | Bibliothèque UI |
| **TypeScript** | 5.9.3 | Typage statique |
| **Vite** | 7.2.4 | Build tool & dev server |
| **TanStack Query** | 5.90.21 | Gestion des données serveur |
| **Zustand** | 5.0.12 | État global |
| **React Router** | 7.13.1 | Routing |
| **Axios** | 1.13.6 | Client HTTP |
| **Tailwind CSS** | 4.1.17 | Framework CSS |
| **Shadcn/ui** | Latest | Composants UI (Radix UI) |
| **Lucide React** | 0.577.0 | Icônes |
| **Sonner** | 2.0.7 | Notifications toast |

### DevOps
| Technologie | Version | Usage |
|-------------|---------|-------|
| **Docker** | Latest | Conteneurisation |
| **Docker Compose** | Latest | Orchestration multi-conteneurs |

## 📦 Prérequis

- **Docker Desktop** >= 20.x
- **Docker Compose** >= 2.x
- **Node.js** >= 22.x (pour développement local hors Docker)
- **Git** >= 2.x

## 🔧 Installation

### Avec Docker (Recommandé)

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/iris-bank.git
cd iris-bank
```

2. **Configurer les variables d'environnement**
```bash
# Backend (obligatoire)
cp backend/.env.example backend/.env
nano backend/.env   # Renseigner les credentials SMTP, JWT_SECRET, etc.

# Frontend (optionnel en dev, requis en prod)
cp frontend/.env.example frontend/.env
```

> **Important** : Le `docker-compose.yml` charge les variables depuis `backend/.env` via `env_file`. Sans ce fichier, les services ne démarreront pas correctement.

3. **Démarrer les services Docker**
```bash
docker-compose up -d
```

4. **Attendre que les services démarrent** (~30 secondes)
```bash
docker-compose logs -f
```

5. **Appliquer les migrations et seeder la base**
```bash
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend npm run seed
```

6. **Accéder à l'application**
- Frontend : http://localhost:5173
- Backend API : http://localhost:5001
- Base de données : localhost:5435
- Prisma Studio : http://localhost:5555

## ⚙️ Configuration

### Variables d'Environnement

Les variables sont centralisées dans des fichiers `.env` (non versionnés). Copier les `.env.example` fournis :

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env       # optionnel en dev
```

#### Backend (`backend/.env`)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL de connexion PostgreSQL | `postgresql://postgres:123@dev-db:5432/bank-platform?schema=public` |
| `DB_PASSWORD` | Mot de passe PostgreSQL (utilisé par docker-compose) | `123` |
| `JWT_SECRET` | Clé secrète pour signer les tokens JWT | `change-this-in-production` |
| `JWT_EXPIRES_IN` | Durée de validité des tokens | `7d` |
| `NODE_ENV` | Environnement d'exécution | `development` / `production` |
| `PORT` | Port de l'API | `5001` |
| `CORS_ORIGIN` | URL du frontend autorisée | `http://localhost:5173` |
| `MAILTRAP_HOST` | Serveur SMTP | `sandbox.smtp.mailtrap.io` |
| `MAILTRAP_PORT` | Port SMTP | `2525` |
| `MAILTRAP_USER` | Identifiant SMTP | |
| `MAILTRAP_PASS` | Mot de passe SMTP | |

#### Frontend (`frontend/.env`)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `VITE_API_URL` | URL de l'API backend (production uniquement) | `https://api.votre-domaine.com` |

> En développement, l'API est proxifiée via Vite (`/api` -> `http://backend:5001`), donc `VITE_API_URL` n'est pas nécessaire.

### Ports

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 5173 | Application React |
| Backend | 5001 | API Express |
| PostgreSQL | 5435 | Base de données |
| Prisma Studio | 5555 | Interface DB (optionnel) |

## 📘 Utilisation

### Première Connexion

1. Accéder à http://localhost:5173
2. Cliquer sur "Créer un compte" ou "Ouvrir un compte"
3. Remplir le formulaire en 3 étapes
4. Vérifier votre email (code à 6 chiffres)
5. Vous serez redirigé vers le dashboard

### Créer un Compte Bancaire

1. Accéder au Dashboard
2. Menu > "Créer un compte"
3. Sélectionner le type de compte (Courant, Épargne, Pro, Livret A, PEL)
4. Voir le résumé avec les caractéristiques
5. Valider - vous recevrez 100€ de bonus !

### Effectuer un Virement

1. Menu > "Nouveau Virement"
2. Sélectionner le compte source
3. Entrer l'IBAN du bénéficiaire
4. Entrer le nom et le montant
5. Ajouter une description (optionnel)
6. Vérifier les détails
7. Confirmer l'opération

## 🔑 Comptes de Test

Tous les comptes utilisent le mot de passe : **`password`**

| Email | Nom | Ville | Comptes | Solde Total |
|-------|-----|-------|---------|-------------|
| jean.dupont@email.fr | Jean Dupont | Paris | 2 (Courant + Épargne) | 16 450,50 € |
| marie.martin@email.fr | Marie Martin | Lyon | 2 (Courant + Business) | 6 290,20 € |
| luc.bernard@email.fr | Luc Bernard | Toulouse | 1 (Courant) | 210,50 € |
| admin@irisbank.fr | Admin IRIS | Paris | - | - |

### Comptes Recommandés pour Tests

- **Jean Dupont** : Compte riche avec historique complet
- **Thomas Robert** : Compte avec faible solde (tester limites)
- **Marie Martin** : Compte professionnel
- **admin@irisbank.fr** : Accès panneau d'administration

## 📁 Structure du Projet

```
iris-bank/
├── backend/                    # API Express.js
│   ├── prisma/
│   │   ├── schema.prisma      # Modèles de données (5 types de comptes)
│   │   ├── migrations/        # Migrations SQL
│   │   └── seed.ts            # Données de test
│   ├── src/
│   │   ├── config/            # Configuration (DB, etc.)
│   │   ├── controller/        # Logique métier
│   │   │   ├── auth.controller.ts    # Register, login, verify email
│   │   │   ├── user.controller.ts    # Profile, change password, 2FA
│   │   │   ├── bankAccount.controller.ts
│   │   │   ├── admin.controller.ts   # Gestion clients/comptes
│   │   │   └── ...
│   │   ├── middleware/        # Auth, validation
│   │   ├── routes/            # Endpoints API
│   │   ├── services/          # Email service (Nodemailer)
│   │   ├── utils/             # Utilitaires (JWT, etc.)
│   │   ├── validators/        # Schémas Zod (5 types de comptes)
│   │   └── server.ts          # Point d'entrée
│   ├── Dockerfile              # Dockerfile production (Dokku)
│   ├── entrypoint.sh           # Migrations Prisma au démarrage
│   ├── .env.example            # Variables d'environnement
│   └── package.json
│
├── frontend/                   # Application React
│   ├── src/
│   │   ├── api/               # Configuration Axios
│   │   ├── components/        # Composants React
│   │   │   ├── ui/            # Shadcn/ui (dialog, switch, etc.)
│   │   │   ├── layouts/       # Dashboard & Admin layouts
│   │   │   ├── signup-form.tsx      # Formulaire 3 étapes
│   │   │   ├── login-form.tsx
│   │   │   └── [features]/    # Composants par feature
│   │   ├── hooks/             # React Query hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useAdmin.ts
│   │   │   └── ...
│   │   ├── pages/             # Pages
│   │   │   ├── HomePage.tsx         # Landing page
│   │   │   ├── SignupPage.tsx       # Inscription avec SVG
│   │   │   ├── LoginPage.tsx        # Connexion avec SVG
│   │   │   ├── SettingsPage.tsx     # Paramètres utilisateur
│   │   │   ├── PrivacyPolicyPage.tsx
│   │   │   ├── admin/               # Pages admin
│   │   │   │   ├── AdminDashboardPage.tsx
│   │   │   │   ├── AdminClientsPage.tsx
│   │   │   │   ├── AdminClientDetailPage.tsx
│   │   │   │   ├── AdminAccountsPage.tsx
│   │   │   │   └── AdminAccountTransactionsPage.tsx
│   │   │   └── ...
│   │   ├── store/             # État global (Zustand)
│   │   ├── types/             # Types TypeScript
│   │   ├── App.tsx            # Routes
│   │   └── main.tsx           # Point d'entrée
│   ├── Dockerfile              # Dockerfile production (multi-stage nginx)
│   ├── nginx.conf.template     # Config nginx pour SPA
│   ├── entrypoint.sh           # Entrypoint nginx
│   ├── .env.example            # Variables d'environnement
│   ├── vite.config.ts
│   └── package.json
│
├── Dockerfile                  # Dockerfile racine (utilisé par Dokku)
├── docker-compose.yml          # Orchestration services (dev local)
├── README.md                   # Ce fichier
└── CHANGELOG.md               # Historique des versions
```

## 🔌 API Endpoints

### Authentification

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/auth/register` | Inscription (3 étapes) | ❌ |
| POST | `/auth/verify-email` | Vérifier email (code 6 chiffres) | ❌ |
| POST | `/auth/resend-code` | Renvoyer code de vérification | ❌ |
| POST | `/auth/login` | Connexion | ❌ |
| POST | `/auth/logout` | Déconnexion | ✅ |
| GET | `/auth/me` | Utilisateur actuel | ✅ |

### Utilisateurs

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/users/profile` | Profil utilisateur | ✅ |
| PUT | `/users/change-password` | Changer mot de passe | ✅ |
| POST | `/users/toggle-2fa` | Activer/Désactiver 2FA | ✅ |

### Comptes Bancaires

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/accounts/create` | Créer un compte (5 types) | ✅ |
| GET | `/accounts/getByUser` | Tous les comptes de l'utilisateur | ✅ |
| GET | `/accounts/stats` | Statistiques des comptes | ✅ |
| GET | `/accounts/:id` | Détails d'un compte | ✅ |

### Transactions

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/transactions/verify` | Vérifier un virement | ✅ |
| POST | `/transactions/execute` | Exécuter un virement | ✅ |
| POST | `/transactions/deposit` | Dépôt d'argent | ✅ |
| POST | `/transactions/withdrawal` | Retrait d'argent | ✅ |
| GET | `/transactions/recent` | Transactions récentes | ✅ |

### Administration (ADMIN/SUPPORT uniquement)

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/admin/stats` | Statistiques globales | ✅ ADMIN |
| GET | `/admin/clients` | Liste des clients | ✅ ADMIN |
| GET | `/admin/clients/:id` | Détail client | ✅ ADMIN |
| PUT | `/admin/clients/:id` | Modifier client | ✅ ADMIN |
| GET | `/admin/accounts` | Tous les comptes | ✅ ADMIN |
| GET | `/admin/accounts/:id/transactions` | Transactions d'un compte | ✅ ADMIN |
| POST | `/admin/accounts/:id/block` | Bloquer un compte | ✅ ADMIN |
| POST | `/admin/accounts/:id/unblock` | Débloquer un compte | ✅ ADMIN |

## 🛠️ Développement

### Commandes Docker

```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs en temps réel
docker-compose logs -f

# Voir les logs d'un service spécifique
docker-compose logs -f backend

# Redémarrer un service
docker-compose restart backend

# Arrêter tous les services
docker-compose down

# Reconstruire et redémarrer
docker-compose up -d --build
```

### Commandes Backend

```bash
# Accéder au conteneur backend
docker-compose exec backend sh

# Re-seeder la base de données
docker-compose exec backend npm run seed

# Lancer Prisma Studio
docker-compose exec backend npx prisma studio
# Puis ouvrir http://localhost:5555

# Créer une migration
docker-compose exec backend npx prisma migrate dev --name migration_name

# Générer le client Prisma
docker-compose exec backend npx prisma generate
```

## 🚢 Déploiement (Dokku)

Le projet se déploie sur un serveur Dokku avec deux apps distinctes (backend + frontend).

### Architecture

```
Client --> Dokku Nginx --> iris-bank-front (nginx:alpine, fichiers statiques)
Client --> Dokku Nginx --> iris-bank-back  (node:22-slim, Express API)
                              |
                              v
                         dokku-postgres (PostgreSQL)
```

### Prérequis Serveur

- Dokku installé sur le serveur
- Plugin postgres : `sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres`
- Plugin letsencrypt : `sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git letsencrypt`

### 1. Créer les apps et la base de données

```bash
# Créer les apps
dokku apps:create iris-bank-back
dokku apps:create iris-bank-front

# Forcer le builder Dockerfile
dokku builder:set iris-bank-back selected dockerfile
dokku builder:set iris-bank-front selected dockerfile

# Créer et lier la DB
dokku postgres:create iris-bank-db
dokku postgres:link iris-bank-db iris-bank-back
```

### 2. Configurer les variables d'environnement

```bash
# Backend
dokku config:set iris-bank-back \
  DATABASE_URL="postgresql://..." \
  JWT_SECRET="votre-secret-jwt-production" \
  JWT_EXPIRES_IN=7d \
  NODE_ENV=production \
  CORS_ORIGIN=https://iris-bank-front.votre-domaine.com \
  MAILTRAP_HOST=smtp.gmail.com \
  MAILTRAP_PORT=587 \
  MAILTRAP_USER=votre-email \
  MAILTRAP_PASS=votre-app-password

# Frontend (BACKEND_URL pour le proxy nginx interne)
dokku config:set iris-bank-front \
  BACKEND_URL=https://iris-bank-back.votre-domaine.com
```

> **Note** : `DATABASE_URL` est automatiquement injectée par `dokku postgres:link`, mais doit utiliser le préfixe `postgresql://` (pas `postgres://`) pour Prisma. Ajustez si nécessaire.

### 3. Configurer les domaines et SSL

```bash
# Domaines
dokku domains:enable iris-bank-back
dokku domains:set iris-bank-back iris-bank-back.votre-domaine.com
dokku domains:enable iris-bank-front
dokku domains:set iris-bank-front iris-bank-front.votre-domaine.com

# Ports
dokku ports:set iris-bank-back http:80:5001 https:443:5001
dokku ports:set iris-bank-front http:80:5000 https:443:5000

# SSL avec Let's Encrypt
dokku letsencrypt:set iris-bank-back email votre-email@exemple.com
dokku letsencrypt:enable iris-bank-back
dokku letsencrypt:set iris-bank-front email votre-email@exemple.com
dokku letsencrypt:enable iris-bank-front
```

### 4. Déployer

Le monorepo utilise un `Dockerfile` à la racine. Chaque app a sa propre branche de déploiement :

- **`main` ou `feat/*`** : contient le `Dockerfile` backend
- **`deploy`** : contient le `Dockerfile` frontend (remplacé à la racine)

```bash
# Backend (depuis main)
git remote add dokku dokku@votre-serveur:iris-bank-back
git push dokku main

# Frontend (depuis la branche deploy)
git remote add dokku-front dokku@votre-serveur:iris-bank-front
git push dokku-front deploy:main
```

### 5. Seeder la base de données

```bash
dokku run iris-bank-back npx tsx prisma/seed.ts
```

### 6. Frontend - Variable d'API

En production, le frontend appelle directement l'API backend. Créer un fichier `frontend/.env.production` :

```env
VITE_API_URL=https://iris-bank-back.votre-domaine.com
```

Ce fichier n'est **pas versionné** (`.gitignore`). Il doit être présent avant le build Docker du frontend.

### Commandes utiles

```bash
# Voir les logs
dokku logs iris-bank-back --tail
dokku logs iris-bank-front --tail

# Redéployer
dokku ps:rebuild iris-bank-back
dokku ps:rebuild iris-bank-front

# Voir la config
dokku config:show iris-bank-back
dokku config:show iris-bank-front

# Accéder à la DB
dokku postgres:connect iris-bank-db
```

## 📝 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Contributeurs

- **Équipe IRIS Bank** - Développement initial

## 🙏 Remerciements

- [Shadcn/ui](https://ui.shadcn.com/) pour les composants UI
- [Prisma](https://www.prisma.io/) pour l'ORM
- [TanStack Query](https://tanstack.com/query) pour la gestion des données
- [Radix UI](https://www.radix-ui.com/) pour les primitives UI accessibles
- [Mailtrap](https://mailtrap.io/) pour les tests d'emails

---

**Développé avec ❤️ par l'équipe IRIS Bank**
