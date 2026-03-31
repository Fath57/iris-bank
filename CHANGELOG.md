# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2026-03-30

### ✨ Ajouté

#### Authentification & Sécurité
- Système d'inscription complet avec validation des données
  - Nom, prénom, email, téléphone
  - Adresse complète (rue, ville, région, code postal, pays)
- Système de connexion sécurisé avec JWT
  - Tokens stockés dans cookies httpOnly
  - Durée de session : 7 jours
  - Protection CSRF avec sameSite: strict
- Déconnexion avec suppression du token
- Endpoint `/auth/me` pour récupérer l'utilisateur connecté
- Hashage des mots de passe avec bcrypt (10 rounds)
- Middleware d'authentification pour protéger les routes
- Validation des données avec Zod

#### Gestion des Comptes Bancaires
- Création de comptes bancaires avec 3 types :
  - Compte courant (CHECKING)
  - Compte épargne (SAVINGS)
  - Compte professionnel (BUSINESS)
- Génération automatique d'IBAN au format FR76 (23 chiffres aléatoires)
- Bonus de bienvenue de 100€ à la création d'un compte
- Endpoint pour lister tous les comptes d'un utilisateur
- Endpoint pour obtenir les détails d'un compte spécifique
- Endpoint pour obtenir les statistiques des comptes
  - Solde total
  - Solde par type de compte
  - Dernière transaction
- Statut de compte (ACTIVE, BLOCKED, CLOSED)

#### Opérations Bancaires

**Virements SEPA**
- Endpoint de vérification avant exécution (`/transactions/verify`)
  - Validation IBAN (regex pattern)
  - Vérification du compte source
  - Calcul du nouveau solde
- Endpoint d'exécution de virement (`/transactions/execute`)
  - Transactions atomiques avec Prisma
  - Débit du compte source
  - Crédit automatique si le destinataire est dans le système
  - Création/mise à jour automatique du bénéficiaire
  - Description personnalisée optionnelle
- Support virements internes (entre comptes IRIS Bank)
- Support virements externes (vers IBAN externe)

**Dépôts et Retraits**
- Endpoint de dépôt (`/transactions/deposit`)
  - Ajout instantané au solde
  - Description optionnelle
  - Création de transaction DEPOSIT
- Endpoint de retrait (`/transactions/withdrawal`)
  - Vérification du solde disponible
  - Débit instantané
  - Description optionnelle
  - Création de transaction WITHDRAWAL

**Historique**
- Endpoint pour récupérer les transactions récentes
  - Limite configurable (défaut: 10 transactions)
  - Tri par date décroissante
  - Informations complètes sur chaque transaction

#### Gestion des Bénéficiaires
- Endpoint pour lister tous les bénéficiaires d'un utilisateur
- Endpoint pour ajouter un bénéficiaire manuellement
- Sauvegarde automatique lors des virements
- Stockage de l'IBAN et du nom du bénéficiaire

#### Base de Données
- Schéma Prisma complet avec 8 modèles :
  - User (utilisateurs)
  - Address (adresses)
  - BankAccount (comptes bancaires)
  - Transaction (transactions)
  - Beneficiary (bénéficiaires)
  - Notification (notifications - préparé pour future implémentation)
  - AuditLog (logs d'audit - préparé pour future implémentation)
  - Session (sessions - préparé pour future implémentation)
- Migrations Prisma pour versioning du schéma
- Script de seed avec 5 utilisateurs de test
  - 70 transactions réalistes
  - 7 comptes bancaires de types variés
  - Données françaises (villes, adresses, IBANs)

#### Interface Utilisateur (Frontend)

**Pages**
- Page d'accueil (HomePage)
- Page de connexion (LoginPage)
- Page d'inscription (SignupPage)
- Tableau de bord (DashboardHomePage)
  - Vue d'ensemble des finances
  - Statistiques par type de compte
  - Dernières transactions
- Mes comptes (MyAccountsPage)
  - Liste de tous les comptes
  - Soldes et types
  - Accès rapide aux détails
- Création de compte (CreateAccountPage)
  - Sélection du type
  - Confirmation
- Détails de compte (AccountDetailPage)
  - Informations du compte
  - Historique complet des transactions
  - Solde actuel
- Nouveau virement (NewTransactionPage)
  - Formulaire en 2 étapes (vérification + confirmation)
  - Sélection compte source
  - Saisie IBAN bénéficiaire
  - Validation en temps réel
- Dépôt/Retrait (DepositWithdrawalPage)
  - Toggle entre dépôt et retrait
  - Sélection de compte
  - Saisie du montant
- Historique des transactions (TransactionsPage)
  - Liste complète
  - Filtrage par compte

**Composants**
- Layout Dashboard avec sidebar
  - Navigation principale
  - Breadcrumbs
  - Indicateur d'authentification
- Formulaires de connexion/inscription
  - Validation côté client
  - Messages d'erreur clairs
  - Loading states
- Cards de statistiques
  - Solde total
  - Solde par type de compte
  - Dernière transaction
- Liste de transactions
  - Badge de type coloré
  - Formatage des montants
  - Affichage des dates
- Composants UI Shadcn/ui
  - Button, Card, Input, Select, Table, Badge, etc.
  - Theme support (préparé)

**State Management**
- Store Zustand pour l'authentification
  - État de l'utilisateur
  - État d'initialisation
  - Actions login/logout
- React Query pour les données serveur
  - Cache intelligent
  - Invalidation automatique
  - Loading et error states
  - Hooks personnalisés par feature

#### DevOps & Infrastructure
- Configuration Docker complète
  - Dockerfile pour backend (Node 22)
  - Dockerfile pour frontend (Node 22)
  - Docker Compose avec 3 services
- Fichiers `.dockerignore` pour optimiser les builds
- Configuration Vite avec proxy API
  - Redirection `/api` vers le backend
  - Hot Module Replacement (HMR)
  - Support du mode polling pour Docker
- Variables d'environnement
  - `DATABASE_URL` pour Prisma
  - `JWT_SECRET` pour l'authentification
  - `JWT_EXPIRES_IN` pour la durée du token
  - `NODE_ENV` pour l'environnement
- Script de démarrage avec rebuild automatique
  - Backend : rebuild esbuild + Prisma generate + migrations
  - Frontend : rebuild rollup/vite/esbuild

### 🔧 Configuration

#### Backend
- Express.js 5.2.1 avec TypeScript
- CORS configuré pour `http://localhost:5173`
- Cookie parser pour les JWT
- Body parser (JSON et URL-encoded)
- Gestion gracieuse des shutdowns
- Handlers pour erreurs non catchées

#### Frontend
- React 19 avec TypeScript strict
- Vite 7 comme build tool
- Tailwind CSS 4 pour le styling
- ESLint et Prettier configurés
- Alias `@` pour imports absolus
- Support du hot reload dans Docker

#### Base de Données
- PostgreSQL 17.6
- Port 5435 (pour éviter conflits)
- Utilisateur : `postgres`
- Base : `bank-platform`
- Encoding UTF-8
- Timezone UTC

### 🐛 Corrections

- Fix : Problème de certificat SSL npm dans Docker (ajout `npm config set strict-ssl false`)
- Fix : Incompatibilité binaires esbuild/rollup macOS/Linux (ajout `npm rebuild` dans entrypoint)
- Fix : Variable `JWT_SECRET` manquante causant erreur 500 au login
- Fix : Cache Vite obsolète causant erreurs 504
- Fix : Prisma client non généré dans conteneur Docker
- Fix : CORS bloquant les requêtes du frontend
- Fix : Hot reload ne fonctionnant pas dans Docker (ajout polling)

### 📝 Documentation

- README complet avec :
  - Description du projet
  - Liste exhaustive des fonctionnalités
  - Stack technique détaillée
  - Guide d'installation (Docker et local)
  - Configuration des variables d'environnement
  - Guide d'utilisation
  - Comptes de test
  - Structure du projet
  - Documentation API endpoints
  - Commandes de développement
  - Guide de déploiement
  - Section dépannage
- CHANGELOG suivant Keep a Changelog
- Commentaires dans le code pour les parties complexes
- Types TypeScript pour toutes les entités

### 🔒 Sécurité

- Mots de passe jamais stockés en clair (bcrypt)
- Tokens JWT dans cookies httpOnly (protection XSS)
- Cookies avec sameSite: strict (protection CSRF)
- Cookies secure en production (HTTPS only)
- Validation stricte des entrées utilisateur (Zod)
- Validation IBAN avec regex
- Protection des routes API par authentification
- Transactions SQL atomiques (protection contre race conditions)
- Pas de secrets dans le code (variables d'environnement)

### 📊 Performance

- React Query avec cache intelligent
  - Réduction des appels API
  - Invalidation automatique
  - Background refetch
- Index PostgreSQL sur les colonnes fréquemment requêtées
- Transactions Prisma optimisées
- Images Docker optimisées avec cache de layers
- Vite pour des builds ultra-rapides
- Code splitting avec React Router

### 🎨 UX/UI

- Interface moderne et épurée (Tailwind CSS)
- Composants accessibles (Radix UI)
- Feedback visuel sur toutes les actions
  - Loading spinners
  - Toast notifications (Sonner)
  - Messages d'erreur clairs
- Navigation intuitive avec breadcrumbs
- Sidebar responsive (préparé pour mobile)
- Formatage des montants en euros
- Formatage des dates en français
- Icônes Lucide cohérentes
- États vides avec messages explicatifs

### 🧪 Testing

- 5 comptes utilisateurs de test
- 7 comptes bancaires pré-créés
- 70 transactions réalistes
- Scénarios de test variés :
  - Compte riche (16K€)
  - Compte pauvre (50€)
  - Compte business
  - Compte épargne
- Script de seed reproductible

### 📦 Dépendances Principales

**Backend**
- express@5.2.1
- @prisma/client@6.16.2
- jsonwebtoken@9.0.3
- bcryptjs@3.0.3
- zod@3.23.8
- cors@2.8.6
- cookie-parser@1.4.7
- dotenv@17.3.1

**Frontend**
- react@19.2.0
- react-dom@19.2.0
- react-router-dom@7.13.1
- @tanstack/react-query@5.90.21
- zustand@5.0.12
- axios@1.13.6
- tailwindcss@4.1.17
- vite@7.2.4
- typescript@5.9.3

**DevDependencies**
- Backend : nodemon, tsx, prisma, @types/*
- Frontend : @vitejs/plugin-react, eslint, prettier

## [Unreleased]

### 🚧 En Préparation

#### Fonctionnalités
- [ ] Notifications en temps réel (WebSocket)
- [ ] Système de notifications push
- [ ] Historique paginé avec filtres avancés
  - Par type de transaction
  - Par plage de dates
  - Par montant
- [ ] Export PDF des relevés bancaires
- [ ] Virements programmés / récurrents
- [ ] Support multi-devises
- [ ] Graphiques de dépenses
- [ ] Catégorisation des transactions
- [ ] Objectifs d'épargne
- [ ] Cartes bancaires virtuelles

#### Sécurité
- [ ] Authentification à deux facteurs (2FA)
- [ ] Rate limiting sur les endpoints sensibles
- [ ] Chiffrement des données sensibles en base
- [ ] Logs d'audit complets
- [ ] Détection d'activité suspecte
- [ ] Alertes de sécurité

#### UX/UI
- [ ] Version mobile responsive
- [ ] Application mobile native (React Native)
- [ ] Mode sombre/clair
- [ ] Personnalisation de l'interface
- [ ] Accessibilité WCAG 2.1 AA
- [ ] Support multilingue (i18n)

#### DevOps
- [ ] Tests unitaires (Jest/Vitest)
- [ ] Tests d'intégration
- [ ] Tests E2E (Playwright)
- [ ] CI/CD avec GitHub Actions
- [ ] Environnement de staging
- [ ] Monitoring avec Sentry
- [ ] Logs centralisés
- [ ] Métriques et analytics

#### Performance
- [ ] Server-Side Rendering (SSR)
- [ ] Optimisation des requêtes SQL
- [ ] CDN pour les assets statiques
- [ ] Service Worker pour mode offline
- [ ] Lazy loading des composants
- [ ] Compression des images

---

## Format des Versions

### Types de Changements

- **✨ Ajouté** : Nouvelles fonctionnalités
- **🔧 Configuration** : Changements de configuration
- **🐛 Corrections** : Corrections de bugs
- **📝 Documentation** : Changements dans la documentation
- **🔒 Sécurité** : Corrections de vulnérabilités
- **📊 Performance** : Améliorations de performance
- **🎨 UX/UI** : Améliorations de l'interface utilisateur
- **🧪 Testing** : Ajout ou modification de tests
- **♻️ Refactoring** : Refactorisation du code
- **🗑️ Supprimé** : Fonctionnalités ou fichiers supprimés
- **⚠️ Déprécié** : Fonctionnalités bientôt supprimées

### Semantic Versioning

- **MAJOR** (x.0.0) : Changements incompatibles avec les versions précédentes
- **MINOR** (0.x.0) : Ajout de fonctionnalités rétrocompatibles
- **PATCH** (0.0.x) : Corrections de bugs rétrocompatibles

---

**Note** : Les dates suivent le format ISO 8601 (AAAA-MM-JJ)
