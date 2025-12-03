# Servido Landing

Projet Next.js avec TypeScript et Tailwind CSS, optimisé pour le SEO.

## 🚀 Fonctionnalités SEO

- ✅ Métadonnées complètes (Open Graph, Twitter Cards)
- ✅ Sitemap.xml automatique
- ✅ Robots.txt configuré
- ✅ Structure sémantique HTML5
- ✅ Images optimisées avec Next.js Image
- ✅ Support multilingue (français)
- ✅ Métadonnées dynamiques par page

## 📦 Installation

```bash
npm install
```

## 🏃 Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Production

```bash
npm run build
npm start
```

## 🔧 Configuration SEO

1. Créez un fichier `.env.local` basé sur `.env.example`
2. Configurez `NEXT_PUBLIC_SITE_URL` avec votre domaine de production
3. Ajoutez vos codes de vérification si nécessaire

## 📝 Utilisation des métadonnées SEO

Pour ajouter des métadonnées SEO à une nouvelle page :

```typescript
import { generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Titre de la page",
  description: "Description de la page",
  keywords: ["mot-clé1", "mot-clé2"],
  url: "/ma-page",
});
```

## 📁 Structure du projet

```
├── app/
│   ├── layout.tsx      # Layout principal avec métadonnées globales
│   ├── page.tsx        # Page d'accueil
│   ├── sitemap.ts      # Génération automatique du sitemap
│   └── robots.ts       # Configuration robots.txt
├── lib/
│   └── seo.ts          # Utilitaires pour générer les métadonnées SEO
└── public/
    └── robots.txt      # Robots.txt statique (backup)
```

## 🎨 Technologies

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **ESLint** - Linter

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Open Graph Protocol](https://ogp.me/)
