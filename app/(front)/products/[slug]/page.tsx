import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { getAllProducts } from "@/domains/catalog/repository/productRepository";
import { ProductDetails, ProductDetailsSkeleton } from "@/app/components/ProductDetails";
import { SimilarProducts, SimilarProductsSkeleton } from "@/app/components/SimilarProducts";
import SponsoredSection from "@/app/components/SponsoredSection";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Retour aux produits
      </Link>

      {/* Boundary 1 — produit : stream à ~1s */}
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails slug={slug} />
      </Suspense>

      {/* Boundary 2 — similaires : stream à ~2s, indépendant du boundary 1 */}
      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProducts slug={slug} />
      </Suspense>

      {/* Boundary 3 — sponsorisés : GraphQL, stream indépendant */}
      <Suspense fallback={null}>
        <SponsoredSection count={4} variant="light" />
      </Suspense>
    </div>
  );
}
