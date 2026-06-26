import Image from "next/image";
import Link from "next/link";
import PrefetchLink from "./PrefetchLink";
import type { Product } from "@/domains/catalog/entity/product";

type Props = { product: Product; variant?: "A" | "B" };

export default function ProductCard({ product, variant = "A" }: Props) {
  const outOfStock = product.stock === 0;
  const href = `/products/${product.slug}`;

  // A : prefetch par défaut (Next.js prefetch au viewport)
  // B : PrefetchLink — prefetch={false} + router.prefetch() au hover
  const CardLink = variant === "B" ? PrefetchLink : Link;

  return (
    <CardLink href={href} className="group block">
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
      <h3 className="text-sm font-semibold text-white group-hover:text-gray-300 transition-colors leading-snug">
        {product.name}
      </h3>
      <p className="text-sm font-bold text-white mt-1">
        {product.price.toFixed(2)} €
      </p>
    </CardLink>
  );
}
