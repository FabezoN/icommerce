import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { getAllProducts, getProductBySlug } from "@/domains/catalog/repository/productRepository";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/components/AddToCartButton";
import ProductTabs from "@/app/components/ProductTabs";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const outOfStock = product.stock === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Retour aux produits
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image principale */}
        <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden">
          <Image
            src={product.images.main}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Infos produit */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {product.brand} · {product.category}
            </p>
            <h1 className="text-3xl font-black text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>

          <p className="text-4xl font-black text-gray-900">
            {product.price.toFixed(2)} €
          </p>

          <p className={`text-sm font-semibold ${outOfStock ? "text-red-500" : "text-green-600"}`}>
            {outOfStock ? "Rupture de stock" : `En stock (${product.stock} disponibles)`}
          </p>

          {/* Onglets — Client Component, wrappé dans Suspense (requis avec useSearchParams + page statique) */}
          <Suspense fallback={<div className="h-32 bg-gray-50 rounded-2xl animate-pulse" />}>
            <ProductTabs product={product} slug={slug} />
          </Suspense>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
