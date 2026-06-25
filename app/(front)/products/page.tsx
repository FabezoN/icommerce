export const dynamic = "force-dynamic";

import { getAllProducts } from "@/domains/catalog/repository/productRepository";
import ProductCard from "@/app/components/ProductCard";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-white mb-8">Tous les produits</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
