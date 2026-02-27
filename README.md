# Fish Academy - Landing Page

Site marketing pour Fish Academy, l'application de gestion de parties de poker privées entre amis.

## Stack technique

- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **Icons** : Lucide React
- **Forms** : React Hook Form + Zod
- **Email** : Mailgun
- **Blog** : Ghost Content API

## Prérequis

- Node.js 18+
- npm ou yarn ou pnpm

## Installation

```bash
# Cloner le repository
git clone <repo-url>
cd landingpage

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Configurer les variables d'environnement (voir ci-dessous)

# Lancer en développement
npm run dev
```

## Variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# Ghost Content API (obligatoire pour le blog)
GHOST_CONTENT_API_URL=https://blog.fishacademy.fr
GHOST_CONTENT_API_KEY=votre_cle_api_ghost

# Email (Mailgun) - optionnel, les contacts seront loggués si non configuré
MAILGUN_API_KEY=votre_cle_api_mailgun
MAILGUN_DOMAIN=fishacademy.fr
MAILGUN_FROM_EMAIL=postmaster@fishacademy.fr
CONTACT_EMAIL=contact@fishacademy.fr

# Site URL (pour SEO et sitemap)
NEXT_PUBLIC_SITE_URL=https://fishacademy.fr

# URL de redirection vers le SaaS (quand disponible)
COMMUNITY_URL=https://app.fishacademy.fr

# Rate limiting (optionnel)
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MS=60000
```

### Obtenir une clé API Ghost

1. Connectez-vous à l'admin Ghost : https://blog.fishacademy.fr/ghost/
2. Allez dans Settings > Integrations
3. Créez une nouvelle intégration (ou utilisez une existante)
4. Copiez la "Content API Key"

### Configurer Mailgun

1. Créez un compte sur [mailgun.com](https://www.mailgun.com)
2. Ajoutez et vérifiez votre domaine (région EU)
3. Générez une clé API
4. Configurez l'adresse d'envoi (`MAILGUN_FROM_EMAIL`)

## Scripts

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start

# Linting
npm run lint

# Formatage
npm run format
```

## Structure du projet

```
src/
├── app/                    # Pages (App Router)
│   ├── api/               # API Routes
│   │   └── contact/       # Endpoint formulaire de contact
│   ├── blog/              # Page listing blog
│   ├── communaute/        # Page espace communautaire
│   ├── confidentialite/   # Politique de confidentialité
│   ├── contact/           # Page de contact
│   ├── mentions-legales/  # Mentions légales
│   ├── partenaires/       # Page partenaires
│   ├── solution/          # Page solution détaillée
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   ├── robots.ts          # robots.txt dynamique
│   └── sitemap.ts         # sitemap.xml dynamique
├── components/            # Composants React
│   ├── BlogSection.tsx
│   ├── ContactForm.tsx
│   ├── CtaSection.tsx
│   ├── FaqAccordion.tsx
│   ├── FeaturePostCard.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── HowItWorksSteps.tsx
│   ├── PartnersGrid.tsx
│   ├── PostCard.tsx
│   ├── SolutionPreview.tsx
│   └── StatsStrip.tsx
├── lib/                   # Utilitaires
│   ├── ghost.ts           # Client Ghost API
│   └── rate-limit.ts      # Rate limiting
├── types/                 # Types TypeScript
│   ├── contact.ts         # Types formulaire contact
│   └── ghost.ts           # Types Ghost API
public/
└── images/               # Images statiques
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil avec hero, fonctionnalités et articles récents |
| `/solution` | Présentation détaillée de la solution SaaS |
| `/blog` | Listing des articles du blog Ghost |
| `/partenaires` | Présentation des partenaires |
| `/contact` | Formulaire de demande de création de communauté |
| `/communaute` | Page "Bientôt disponible" (future redirection vers SaaS) |
| `/mentions-legales` | Mentions légales |
| `/confidentialite` | Politique de confidentialité |

## Intégration Ghost

Le blog est alimenté par l'API Ghost Content. Les fonctions disponibles :

```typescript
import { getFeaturedPosts, getLatestPosts, getPosts } from '@/lib/ghost'

// Récupérer les articles featured
const featured = await getFeaturedPosts(3)

// Récupérer les derniers articles
const latest = await getLatestPosts(10)

// Requête personnalisée
const { posts, pagination } = await getPosts({
  limit: 10,
  page: 1,
  filter: 'tag:poker'
})
```

## Déploiement

### Vercel (recommandé)

1. Connectez votre repository à Vercel
2. Configurez les variables d'environnement
3. Déployez

### Autre hébergeur

```bash
# Build
npm run build

# Démarrer (nécessite Node.js)
npm start
```

## SEO

- Metadata configurée par page
- OpenGraph et Twitter Cards
- JSON-LD (Organization, WebSite, ItemList)
- Sitemap dynamique
- robots.txt dynamique

## Performances

- Images optimisées avec `next/image`
- ISR (Incremental Static Regeneration) pour les pages blog
- Revalidation toutes les 5 minutes (configurable)
- Lazy loading des images

## Formulaire de contact

Le formulaire de contact inclut :
- Validation côté client (Zod + React Hook Form)
- Validation côté serveur
- Honeypot anti-spam
- Rate limiting par IP
- Envoi d'email via Mailgun EU (ou log si non configuré)

## Contribution

1. Créez une branche feature
2. Committez vos changements
3. Ouvrez une Pull Request

## License

Propriétaire - Fish Academy
