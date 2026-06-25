import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/domains/catalog/repository/productRepository";
import { sleep } from "@/lib/sleep";
import AddToCartButton from "./AddToCartButton";
import ProductTabs from "./ProductTabs";

export async function ProductDetails({ slug }: { slug: string }) {
  await sleep(1000); // délai simulé — retirer en production
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const outOfStock = product.stock === 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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

        <Suspense fallback={<div className="h-32 bg-gray-50 rounded-2xl animate-pulse" />}>
          <ProductTabs product={product} slug={slug} />
        </Suspense>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
      <div className="aspect-square bg-gray-100 rounded-3xl" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="h-4 bg-gray-100 rounded-full w-1/3" />
          <div className="h-9 bg-gray-100 rounded-full w-3/4" />
        </div>
        <div className="h-12 bg-gray-100 rounded-full w-1/4" />
        <div className="h-4 bg-gray-100 rounded-full w-1/4" />
        <div className="h-32 bg-gray-100 rounded-2xl" />
        <div className="h-14 bg-gray-100 rounded-full" />
      </div>
    </div>
  );
}
