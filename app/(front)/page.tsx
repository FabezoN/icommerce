import Link from "next/link";
import { getAllProducts } from "@/domains/catalog/repository/productRepository";
import ProductCard from "@/app/components/ProductCard";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center text-center gap-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Nouvelle collection
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight max-w-2xl font-dancing">
            Tout ce dont vous avez besoin.
          </h1>
          <p className="text-lg text-gray-400 max-w-md">
            Des milliers de produits sélectionnés, livrés rapidement chez vous.
          </p>
          <Link
            href="#products"
            className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors mt-2"
          >
            Voir les produits
          </Link>
        </div>
      </section>

      {/* Liste produits */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-white mb-8">Nos produits</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
