# 🏦 IRIS Bank - Plateforme Bancaire Moderne

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
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
- ✅ Inscription avec informations complètes (nom, email, téléphone, adresse)
- ✅ Connexion sécurisée avec JWT (cookies httpOnly)
- ✅ Session persistante (7 jours)
- ✅ Déconnexion avec suppression du token
- ✅ Mots de passe hashés avec bcrypt
- ✅ Protection des routes (authentification requise)

### 💳 Gestion des Comptes Bancaires
- ✅ Création de comptes multiples
  - Compte courant (CHECKING)
  - Compte épargne (SAVINGS)
  - Compte professionnel (BUSINESS)
- ✅ IBAN auto-généré (format FR76)
- ✅ Bonus de bienvenue de 100€ à la création
- ✅ Visualisation de tous les comptes
- ✅ Détails de compte avec historique complet
- ✅ Statut de compte (ACTIF, BLOQUÉ, FERMÉ)

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

### 📊 Tableau de Bord
- ✅ Vue d'ensemble des finances
- ✅ Solde total tous comptes confondus
- ✅ Répartition par type de compte (Courant, Épargne, Pro)
- ✅ Dernières transactions (10 récentes)
- ✅ Statistiques de compte
- ✅ Navigation rapide vers les comptes

### 📈 Historique & Suivi
- ✅ Historique complet des transactions
- ✅ Filtrage par compte
- ✅ Détails de chaque transaction
  - Type (Dépôt, Retrait, Virement, Paiement)
  - Montant
  - Description
  - Date et heure
  - Bénéficiaire (pour virements)

### 👥 Gestion des Bénéficiaires
- ✅ Sauvegarde automatique lors des virements
- ✅ Liste des bénéficiaires enregistrés
- ✅ Ajout manuel de bénéficiaires
- ✅ Réutilisation pour virements futurs

## 🚀 Stack Technique

### Backend
| Technologie | Version | Usage |
|-------------|---------|-------|
| **Node.js** | 22.x | Runtime JavaScript |
| **TypeScript** | 5.9.3 | Typage statique |
| **Express.js** | 5.2.1 | Framework web |
| **Prisma** | 6.16.2 | ORM pour PostgreSQL |
| **PostgreSQL** | 17.6 | Base de données |
| **JWT** | 9.0.3 | Authentification |
| **Bcrypt** | 3.0.3 | Hashage des mots de passe |
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

2. **Démarrer les services Docker**
```bash
docker-compose up -d
```

3. **Attendre que les services démarrent** (~30 secondes)
```bash
docker-compose logs -f
```

4. **Seeder la base de données**
```bash
docker-compose exec backend npm run seed
```

5. **Accéder à l'application**
- Frontend : http://localhost:5173
- Backend API : http://localhost:5001
- Base de données : localhost:5435

### Sans Docker (Développement Local)

#### Backend

```bash
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env
cat > .env << EOF
DATABASE_URL=postgresql://postgres:123@localhost:5435/bank-platform?schema=public
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
NODE_ENV=development
PORT=5001
EOF

# Générer le client Prisma
npx prisma generate

# Lancer les migrations
npx prisma migrate deploy

# Seeder la base de données
npm run seed

# Démarrer le serveur
npm run dev
```

#### Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## ⚙️ Configuration

### Variables d'Environnement

#### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:123@dev-db:5432/bank-platform?schema=public
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345678
JWT_EXPIRES_IN=7d
NODE_ENV=development
PORT=5001
```

#### Frontend (Vite Proxy)
Le proxy Vite est configuré dans `frontend/vite.config.ts` :
```typescript
proxy: {
  '/api': {
    target: 'http://backend:5001',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  },
}
```

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
2. Cliquer sur "Se connecter"
3. Utiliser un compte de test (voir section ci-dessous)

### Créer un Compte Bancaire

1. Accéder au Dashboard
2. Cliquer sur "Mes Comptes" dans le menu
3. Cliquer sur "Créer un nouveau compte"
4. Sélectionner le type de compte
5. Valider - vous recevrez 100€ de bonus !

### Effectuer un Virement

1. Menu > "Nouveau Virement"
2. Sélectionner le compte source
3. Entrer l'IBAN du bénéficiaire
4. Entrer le nom et le montant
5. Ajouter une description (optionnel)
6. Vérifier les détails
7. Confirmer l'opération

### Effectuer un Dépôt/Retrait

1. Menu > "Dépôt/Retrait"
2. Choisir l'opération (Dépôt ou Retrait)
3. Sélectionner le compte
4. Entrer le montant
5. Ajouter une description
6. Valider

## 🔑 Comptes de Test

Tous les comptes utilisent le mot de passe : **`password`**

| Email | Nom | Ville | Comptes | Solde Total |
|-------|-----|-------|---------|-------------|
| jean.dupont@email.fr | Jean Dupont | Paris | 2 (Courant + Épargne) | 16 450,50 € |
| marie.martin@email.fr | Marie Martin | Lyon | 2 (Courant + Business) | 6 290,20 € |
| luc.bernard@email.fr | Luc Bernard | Toulouse | 1 (Courant) | 210,50 € |
| sophie.petit@email.fr | Sophie Petit | Bordeaux | 1 (Courant) | 3 200,00 € |
| thomas.robert@email.fr | Thomas Robert | Marseille | 1 (Courant) | 50,10 € |

### Comptes Recommandés pour Tests

- **Jean Dupont** : Compte riche avec historique complet
- **Thomas Robert** : Compte avec faible solde (tester limites)
- **Marie Martin** : Compte professionnel

## 📁 Structure du Projet

```
iris-bank/
├── backend/                    # API Express.js
│   ├── prisma/
│   │   ├── schema.prisma      # Modèles de données
│   │   ├── migrations/        # Migrations SQL
│   │   └── seed.ts            # Données de test
│   ├── src/
│   │   ├── config/            # Configuration (DB, etc.)
│   │   ├── controller/        # Logique métier
│   │   ├── middleware/        # Auth, validation
│   │   ├── routes/            # Endpoints API
│   │   ├── utils/             # Utilitaires (JWT, etc.)
│   │   ├── validators/        # Schémas Zod
│   │   └── server.ts          # Point d'entrée
│   ├── dockerfile             # Image Docker backend
│   └── package.json
│
├── frontend/                   # Application React
│   ├── src/
│   │   ├── api/               # Configuration Axios
│   │   ├── components/        # Composants React
│   │   │   ├── ui/            # Composants Shadcn/ui
│   │   │   ├── layouts/       # Layout principal
│   │   │   └── [features]/    # Composants par feature
│   │   ├── hooks/             # Custom hooks (React Query)
│   │   ├── pages/             # Pages de l'application
│   │   ├── store/             # État global (Zustand)
│   │   ├── types/             # Types TypeScript
│   │   ├── App.tsx            # Composant racine
│   │   └── main.tsx           # Point d'entrée
│   ├── dockerfile             # Image Docker frontend
│   ├── vite.config.ts         # Configuration Vite
│   └── package.json
│
├── docker-compose.yml          # Orchestration services
├── README.md                   # Ce fichier
└── CHANGELOG.md               # Historique des versions
```

## 🔌 API Endpoints

### Authentification

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/auth/register` | Inscription | ❌ |
| POST | `/auth/login` | Connexion | ❌ |
| POST | `/auth/logout` | Déconnexion | ✅ |
| GET | `/auth/me` | Utilisateur actuel | ✅ |

### Comptes Bancaires

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/accounts/create` | Créer un compte | ✅ |
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

### Bénéficiaires

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/beneficiaries` | Liste des bénéficiaires | ✅ |
| POST | `/beneficiaries/add` | Ajouter un bénéficiaire | ✅ |

## 🛠️ Développement

### Commandes Docker

```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs en temps réel
docker-compose logs -f

# Voir les logs d'un service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend

# Redémarrer un service
docker-compose restart backend

# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes (⚠️ perte de données)
docker-compose down -v

# Reconstruire les images
docker-compose build

# Reconstruire et redémarrer
docker-compose up -d --build
```

### Commandes Backend

```bash
# Accéder au conteneur backend
docker-compose exec backend sh

# Re-seeder la base de données
docker-compose exec backend npm run seed

# Lancer Prisma Studio (interface graphique DB)
docker-compose exec backend npm run studio
# Puis ouvrir http://localhost:5555

# Créer une nouvelle migration
docker-compose exec backend npx prisma migrate dev --name nom_migration

# Générer le client Prisma
docker-compose exec backend npx prisma generate

# Voir les logs SQL
docker-compose exec backend npx prisma studio
```

### Commandes Frontend

```bash
# Accéder au conteneur frontend
docker-compose exec frontend sh

# Linter le code
docker-compose exec frontend npm run lint

# Formatter le code
docker-compose exec frontend npm run format

# Build de production
docker-compose exec frontend npm run build
```

### Base de Données

```bash
# Accéder à PostgreSQL
docker-compose exec dev-db psql -U postgres -d bank-platform

# Voir toutes les tables
\dt

# Voir les utilisateurs
SELECT * FROM "User";

# Voir les comptes
SELECT * FROM "BankAccount";

# Backup de la base
docker-compose exec dev-db pg_dump -U postgres bank-platform > backup.sql

# Restore de la base
docker-compose exec -T dev-db psql -U postgres bank-platform < backup.sql
```

## 🚢 Déploiement

### Docker Compose (Production)

1. **Créer un fichier `.env.production`**
```env
DATABASE_URL=postgresql://user:password@db-host:5432/iris_bank
JWT_SECRET=your-secure-random-secret-key-256-bits
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

2. **Modifier `docker-compose.yml` pour la production**
```yaml
environment:
  - NODE_ENV=production
  - DATABASE_URL=${DATABASE_URL}
  - JWT_SECRET=${JWT_SECRET}
```

3. **Déployer**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Recommandations Production

- ✅ Utiliser un service PostgreSQL managé (AWS RDS, DigitalOcean, etc.)
- ✅ Configurer HTTPS avec Let's Encrypt
- ✅ Mettre en place un reverse proxy (Nginx, Traefik)
- ✅ Activer les logs centralisés
- ✅ Configurer des backups automatiques
- ✅ Utiliser des secrets pour les variables sensibles
- ✅ Mettre en place un monitoring (Sentry, Datadog, etc.)
- ✅ Activer rate limiting sur l'API

## 🐛 Dépannage

### Le backend ne démarre pas
```bash
# Vérifier les logs
docker-compose logs backend

# Vérifier que la DB est accessible
docker-compose exec backend npx prisma db push
```

### Le frontend affiche des erreurs 504
```bash
# Nettoyer le cache Vite
docker-compose exec frontend rm -rf node_modules/.vite
docker-compose restart frontend
```

### Erreur "JWT_SECRET manquant"
```bash
# Vérifier les variables d'environnement
docker-compose exec backend printenv | grep JWT_SECRET

# Si vide, ajouter dans docker-compose.yml et redémarrer
docker-compose up -d --force-recreate backend
```

### La base de données est vide après redémarrage
```bash
# Re-seeder la base
docker-compose exec backend npm run seed
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

---

**Développé avec ❤️ par l'équipe IRIS Bank**
