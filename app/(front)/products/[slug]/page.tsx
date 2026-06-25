import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllProducts, getProductBySlug } from "@/domains/catalog/repository/productRepository";
import { ProductDetails, ProductDetailsSkeleton } from "@/app/components/ProductDetails";
import { SimilarProducts, SimilarProductsSkeleton } from "@/app/components/SimilarProducts";
import SponsoredSection from "@/app/components/SponsoredSection";


export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;

  // Vérification 404 côté page (ProductDetails retourne null avec 'use cache')
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Retour aux produits
      </Link>

      {/*
        SHELL STATIQUE — ProductDetails utilise 'use cache' :
        son HTML est prérendu (build ou premier accès) et servi depuis le cache.
        Aucune Suspense ici = fait partie du shell immédiat.
      */}
      <ProductDetails slug={slug} />

      {/*
        TROU DYNAMIQUE 1 — Prisma sans cache, connection() obligatoire.
        Next.js ne détecte pas automatiquement les appels Prisma comme dynamiques
        (contrairement à fetch()). connection() signale explicitement ce besoin.
      */}
      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProducts slug={slug} />
      </Suspense>

      {/*
        TROU DYNAMIQUE 2 — GraphQL via fetch() avec next.tags.
        fetch() est auto-détecté : revalidate + tags gèrent le cache.
      */}
      <Suspense fallback={null}>
        <SponsoredSection count={4} variant="light" />
      </Suspense>
    </div>
  );
}
