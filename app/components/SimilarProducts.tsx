import { getSimilarProducts } from "@/domains/catalog/repository/productRepository";
import ProductCard from "./ProductCard";

export default async function SimilarProducts({ productId }: { productId: string }) {
  const products = await getSimilarProducts(productId);
  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Produits similaires</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
