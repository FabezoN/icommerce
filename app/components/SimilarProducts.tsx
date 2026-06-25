import { getSimilarProductsBySlug } from "@/domains/catalog/repository/productRepository";
import { sleep } from "@/lib/sleep";
import ProductCard from "./ProductCard";

export async function SimilarProducts({ slug }: { slug: string }) {
  await sleep(2000); // délai simulé — retirer en production
  const products = await getSimilarProductsBySlug(slug);
  if (products.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Produits similaires</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function SimilarProductsSkeleton() {
  return (
    <section className="py-12 border-t border-gray-100 animate-pulse">
      <div className="h-7 bg-gray-100 rounded-full w-48 mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-square bg-gray-100 rounded-2xl" />
            <div className="h-4 bg-gray-100 rounded-full w-3/4" />
            <div className="h-4 bg-gray-100 rounded-full w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
}
