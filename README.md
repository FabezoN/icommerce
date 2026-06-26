# Bazar — E-commerce Next.js 16

Application e-commerce construite en atelier Next.js 16 (App Router, PPR, cache, auth, A/B test).

## Stack

- **Next.js 16.2.9** — App Router, Partial Prerendering (`cacheComponents: true`), `use cache`, `unstable_cache`
- **React 19** — Server Components, `useActionState`, Server Actions
- **Prisma 7** + **better-sqlite3** — base de données locale SQLite
- **next-auth 5** — authentification JWT (Credentials provider)
- **Zod 4** — validation des formulaires
- **Tailwind CSS 4** — styles
- **pnpm** — gestionnaire de paquets

---

## Prérequis

- Node.js >= 20
- pnpm >= 9

```bash
npm install -g pnpm
```

---

## Installation

```bash
# 1. Cloner le projet
git clone <url-du-repo>
cd icommerce

# 2. Installer les dépendances
pnpm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env et renseigner AUTH_SECRET (voir ci-dessous)
```

### Variables d'environnement

Créer un fichier `.env` à la racine :

```env
DATABASE_URL="file:./prisma/dev.db"
AUTH_SECRET="une-chaine-aleatoire-longue"
```

Pour générer `AUTH_SECRET` :

```bash
openssl rand -base64 32
```

---

## Base de données

```bash
# Appliquer les migrations (crée le fichier dev.db)
pnpm prisma migrate dev

# Regénérer le client Prisma (après modification du schéma)
pnpm prisma generate

# Seeder les produits
pnpm prisma db seed

# Ouvrir Prisma Studio (interface visuelle)
pnpm prisma studio
```

> Pour créer un compte admin : s'inscrire sur `/register`, puis dans Prisma Studio passer le champ `role` de `"user"` à `"admin"`.

---

## Lancer le projet

### Développement

```bash
pnpm dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

> En développement, le prefetch Next.js est désactivé. Pour tester le comportement A/B sur le prefetch, utiliser le mode production.

### Production (build + start)

```bash
pnpm build
pnpm start
```

---

## Fonctionnalités

### Catalogue
- Liste des produits avec grille responsive
- Fiche produit avec produits similaires et produits sponsorisés (GraphQL)
- Ajout au panier (cookie de session, persisté en DB)

### Cache & Performance
- `unstable_cache` sur les requêtes Prisma (`tags: ["products"]`)
- `'use cache'` sur les composants RSC coûteux (ProductList, Footer, ProductDetails)
- Partial Prerendering : shell statique + trous dynamiques en streaming
- Revalidation ciblée avec `revalidateTag("products", "max")` après mutation

### Authentification
| Route | Accès |
|-------|-------|
| `/register` | Public — création de compte |
| `/login` | Public — connexion |
| `/admin/*` | Admin uniquement (middleware `proxy.ts`) |

### Admin
- `/admin/products` — liste des produits avec lien "Modifier"
- `/admin/products/[id]/edit` — formulaire d'édition (Zod + Server Action + gestion d'erreurs)

### A/B Test (prefetch)
Le proxy (`proxy.ts`) effectue un tirage 50/50 à l'arrivée et stocke le résultat dans le cookie `ab_variant` :

| Variante | Comportement |
|----------|-------------|
| `A` | Prefetch automatique au viewport (comportement Next.js par défaut) |
| `B` | Prefetch au survol uniquement (`router.prefetch()` sur `onMouseEnter`) |

**Forcer une variante :**
```
/?ab_prefetch=A
/?ab_prefetch=B
```

Observer le cookie dans DevTools > Application > Cookies, et le comportement réseau dans DevTools > Network (en mode `pnpm start`).

---

## Structure du projet

```
app/
├── (auth)/           # Pages login / register (layout minimal)
├── (admin)/          # Pages admin (protégées par proxy.ts)
├── (front)/          # Pages publiques
├── actions/          # Server Actions (auth, cart, updateProduct, revalidateSponsored)
├── api/              # Route handlers (cart, auth/[...nextauth])
└── components/       # Composants RSC et Client

domains/
├── catalog/          # Produits : entity, data (Prisma), repository, schema Zod
└── sponsored/        # Produits sponsorisés : entity, data (GraphQL), repository

lib/
├── prisma.ts         # Instance Prisma singleton
├── graphql.ts        # Client GraphQL (fetch natif + cache Next.js)
└── sleep.ts          # Délai artificiel pour les démos de streaming

prisma/
├── schema.prisma     # Modèles : Product, Cart, CartItem, User, SimilarProduct
├── migrations/       # Historique des migrations
└── seed.ts           # Seeder des produits

auth.ts               # Configuration next-auth (JWT, Credentials)
proxy.ts              # Middleware : admin guard + A/B test
next.config.ts        # cacheComponents: true (PPR + use cache)
```
