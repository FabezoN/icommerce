import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { getProductBySlug } from "@/domains/catalog/repository/productRepository";
import { notFound } from "next/navigation";

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

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <p className={`text-sm font-semibold ${outOfStock ? "text-red-500" : "text-green-600"}`}>
            {outOfStock ? "Rupture de stock" : `En stock (${product.stock} disponibles)`}
          </p>

          {/* Specs */}
          <div className="bg-gray-50 rounded-2xl p-4 grid grid-cols-2 gap-3">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key}>
                <p className="text-xs text-gray-400 capitalize">{key}</p>
                <p className="text-sm font-semibold text-gray-800">
                  {typeof value === "boolean" ? (value ? "Oui" : "Non") : String(value)}
                </p>
              </div>
            ))}
          </div>

          <button
            disabled={outOfStock}
            className="flex items-center justify-center gap-3 bg-gray-900 text-white font-semibold py-4 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={20} />
            {outOfStock ? "Indisponible" : "Ajouter au panier"}
          </button>
        </div>
      </div>
    </div>
  );
}
