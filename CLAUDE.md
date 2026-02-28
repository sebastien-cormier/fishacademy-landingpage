# Fish Academy Landing Page - Documentation Technique

## Vue d'ensemble

Landing page marketing pour Fish Academy (fishacademy.fr), une plateforme SaaS de gestion de parties de poker entre amis. Le site présente la solution, affiche les articles du blog Ghost, et permet aux utilisateurs de demander la création de leur communauté via un formulaire de contact.

## Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 15.x | Framework React (App Router) |
| React | 19.x | UI Library |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 3.x | Styling |
| Zod | 3.x | Validation des schémas |
| React Hook Form | 7.x | Gestion des formulaires |
| Mailgun.js | 10.x | Envoi d'emails |
| Ghost Content API | 1.x | Récupération des articles blog |
| @tailwindcss/typography | 0.x | Rendu du contenu HTML Ghost (prose) |

## Structure du Projet

```
src/
├── app/                    # App Router (pages et routes)
│   ├── api/
│   │   └── contact/        # API Route pour le formulaire
│   ├── blog/               # Page listing blog
│   │   ├── [slug]/         # Page de détail d'un article
│   │   ├── tag/[slug]/     # Listing par tag
│   │   └── author/[slug]/  # Listing par auteur
│   ├── communaute/         # Page communauté (coming soon)
│   ├── confidentialite/    # Politique de confidentialité
│   ├── contact/            # Formulaire de contact
│   ├── mentions-legales/   # Mentions légales
│   ├── partenaires/        # Page partenaires
│   ├── solution/           # Présentation de la solution
│   ├── globals.css         # Styles globaux + utilitaires
│   ├── layout.tsx          # Layout racine (Header, Footer, GA)
│   ├── page.tsx            # Homepage
│   ├── robots.ts           # Génération robots.txt
│   └── sitemap.ts          # Génération sitemap.xml
├── components/             # Composants React réutilisables
│   ├── Header.tsx          # Navigation principale
│   ├── Footer.tsx          # Pied de page
│   ├── Hero.tsx            # Section hero homepage
│   ├── StatsStrip.tsx      # Bandeau de statistiques
│   ├── HowItWorksSteps.tsx # Étapes "Comment ça marche"
│   ├── SolutionPreview.tsx # Aperçu de la solution
│   ├── BlogSection.tsx     # Section articles blog
│   ├── FeaturePostCard.tsx # Carte article mis en avant
│   ├── PostCard.tsx        # Carte article standard
│   ├── TagBadge.tsx        # Badge tag (lien interne /blog/tag/)
│   ├── CtaSection.tsx      # Section call-to-action
│   ├── FaqAccordion.tsx    # FAQ accordéon
│   ├── PartnersGrid.tsx    # Grille partenaires
│   └── ContactForm.tsx     # Formulaire de contact
├── lib/                    # Utilitaires et services
│   ├── ghost.ts            # Client Ghost Content API
│   └── rate-limit.ts       # Rate limiting en mémoire
└── types/                  # Types TypeScript
    ├── contact.ts          # Schéma Zod formulaire contact
    └── ghost.ts            # Types Ghost API
```

## Configuration

### Variables d'environnement

Créer un fichier `.env.local` basé sur `.env.example` :

```bash
# Ghost Content API
GHOST_CONTENT_API_URL=https://blog.fishacademy.fr
GHOST_CONTENT_API_KEY=your_ghost_content_api_key

# Mailgun (EU region)
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=fishacademy.fr
MAILGUN_FROM_EMAIL=postmaster@fishacademy.fr
CONTACT_EMAIL=contact@fishacademy.fr

# Site URL
NEXT_PUBLIC_SITE_URL=https://fishacademy.fr

# SaaS URL (futur)
COMMUNITY_URL=https://app.fishacademy.fr

# Rate limiting (optionnel)
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MS=60000
```

### Next.js Config (`next.config.js`)

- `output: 'standalone'` - Requis pour le build Docker
- `images.remotePatterns` - Domaines autorisés pour next/image :
  - `blog.fishacademy.fr` (images Ghost)
  - `img.artisandev.fr` (images statiques)
  - `images.unsplash.com`
  - `files.cdn.printful.com` (produits CustomFlow)

### Tailwind Config (`tailwind.config.ts`)

Palette de couleurs personnalisée :

| Palette | Usage |
|---------|-------|
| `primary` | Bleu ciel - couleur principale (liens, boutons) |
| `accent` | Violet/Fuchsia - accents |
| `dark` | Slate - thème sombre (backgrounds, textes) |
| `poker` | Vert feutrine, or, rouge - thème poker |

Plugin `@tailwindcss/typography` activé pour le rendu du contenu Ghost via `prose prose-invert` dans les pages d'articles.

Classes utilitaires définies dans `globals.css` :
- `.container-custom` - Container responsive
- `.section-padding` - Padding sections
- `.section-title` / `.section-subtitle` - Typographie titres
- `.btn-primary` / `.btn-secondary` - Boutons
- `.card` - Cartes
- `.input-field` - Champs de formulaire
- `.glass-effect` - Effet glassmorphism

## Commandes

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

## Docker

L'image est publiée sur **GitHub Container Registry** (`ghcr.io`).

### Authentification GHCR

```bash
echo $GITHUB_TOKEN | docker login ghcr.io -u sebastien-cormier --password-stdin
```

Le token GitHub doit avoir le scope `write:packages`.

### Build et Push

```bash
# Script automatisé (build AMD64 + push vers ghcr.io)
./build-and-push.sh

# Ou manuellement
docker build --platform linux/amd64 \
  -t ghcr.io/sebastien-cormier/fishacademy-landingpage:latest .

docker push ghcr.io/sebastien-cormier/fishacademy-landingpage:latest
```

### Exécution

```bash
docker run -p 3000:3000 \
  -e GHOST_CONTENT_API_URL=https://blog.fishacademy.fr \
  -e GHOST_CONTENT_API_KEY=xxx \
  -e MAILGUN_API_KEY=xxx \
  -e MAILGUN_DOMAIN=fishacademy.fr \
  -e MAILGUN_FROM_EMAIL=postmaster@fishacademy.fr \
  -e CONTACT_EMAIL=contact@fishacademy.fr \
  ghcr.io/sebastien-cormier/fishacademy-landingpage:latest
```

## API Routes

### POST `/api/contact`

Endpoint pour le formulaire de contact.

**Fonctionnalités :**
- Validation Zod des données
- Rate limiting (5 req/min par IP)
- Honeypot anti-spam
- Envoi email via Mailgun (EU)

**Body (JSON) :**
```typescript
{
  firstName: string      // Prénom (requis)
  email: string          // Email valide (requis)
  groupName?: string     // Nom du groupe
  city?: string          // Ville
  playerCount: string    // "5-8" | "9-15" | "16+"
  gameType: string       // "cashgame" | "tournoi" | "mixte"
  frequency: string      // "1x-mois" | "2-3x-mois" | "hebdo"
  message: string        // Message (10-2000 chars)
  honeypot?: string      // Champ caché anti-spam
}
```

**Réponses :**
- `200` - Succès
- `400` - Données invalides
- `429` - Rate limit dépassé
- `500` - Erreur serveur/Mailgun

## Intégration Ghost

Ghost est utilisé en mode **headless** : il sert uniquement d'outil d'édition, Next.js gère tout le frontend. Les URLs Ghost (`blog.fishacademy.fr`) ne sont jamais exposées aux visiteurs.

Le client Ghost (`src/lib/ghost.ts`) expose :

```typescript
// Listing
getFeaturedPosts(limit?: number): Promise<GhostPost[]>
getLatestPosts(limit?: number): Promise<GhostPost[]>
getPosts(options: { page?: number; limit?: number }): Promise<{ posts; pagination }>
getPostsByTag(tagSlug, options?): Promise<{ posts; pagination }>
getPostsByAuthor(authorSlug, options?): Promise<{ posts; pagination }>

// Détail (avec HTML complet)
getPostBySlug(slug: string): Promise<GhostPost | null>
getTag(slug: string): Promise<GhostTag | null>
getAuthor(slug: string): Promise<GhostAuthor | null>

// generateStaticParams
getAllPostSlugs(): Promise<{ slug: string }[]>
getAllTagSlugs(): Promise<{ slug: string }[]>
getAllAuthorSlugs(): Promise<{ slug: string }[]>
```

**Rendu du contenu :** `dangerouslySetInnerHTML` + classes `prose prose-invert` (plugin Tailwind Typography).

**Cache :** ISR avec `revalidate: 300` (5 minutes)

## Analytics

Google Analytics 4 intégré via `next/script` :
- Measurement ID : `G-3S3LR8C19D`
- Stratégie : `afterInteractive`

## Partenaires

Liens vers CustomFlow avec tracking UTM :
```
?utm_source=fishacademy&utm_medium=partner&utm_campaign=landing
```

## SEO

- Metadata API Next.js pour chaque page
- OpenGraph et Twitter Cards
- `generateMetadata` dynamique sur `/blog/[slug]`, `/blog/tag/[slug]`, `/blog/author/[slug]`
- JSON-LD sur la homepage et la page blog
- Sitemap dynamique (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)

## Conventions de Code

- **Composants** : PascalCase, un fichier par composant
- **Utilitaires** : camelCase
- **Types** : PascalCase, suffixe explicite (ex: `GhostPost`)
- **CSS** : Classes Tailwind, utilitaires dans `globals.css`
- **Imports** : Alias `@/` pour `src/`

## Thème Dark

Le site utilise un thème sombre par défaut :
- Background principal : `dark-950` (#020617)
- Cards/éléments : `dark-800` (#1e293b)
- Sections alternées : `dark-900` (#0f172a)
- Texte principal : `dark-100` (#f1f5f9)
- Texte secondaire : `dark-400` (#94a3b8)
