import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/domains/catalog/entity/product";

export default function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.stock === 0;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-3">
        <Image
          src={product.images.main}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {outOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1 rounded-full">
              Rupture de stock
            </span>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400 mb-0.5">{product.brand} · {product.category}</p>
      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-500 transition-colors leading-snug">
        {product.name}
      </h3>
      <p className="text-sm font-bold text-gray-900 mt-1">
        {product.price.toFixed(2)} €
      </p>
    </Link>
  );
}
