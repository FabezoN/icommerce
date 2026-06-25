import Image from "next/image";
import Link from "next/link";
import type { SponsoredProduct } from "@/domains/sponsored/entity/sponsoredProduct";

type Props = {
  product: SponsoredProduct;
  variant?: "dark" | "light";
};

export default function SponsoredProductCard({ product, variant = "dark" }: Props) {
  const isDark = variant === "dark";

  return (
    <Link href={`/sponsored/${product.handle}`} className="group block">
      <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-3">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        <span className="absolute top-2 left-2 bg-amber-400 text-amber-900 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
          Sponsorisé
        </span>
      </div>
      <h3
        className={`text-sm font-semibold transition-colors leading-snug ${
          isDark
            ? "text-white group-hover:text-gray-300"
            : "text-gray-900 group-hover:text-gray-600"
        }`}
      >
        {product.title}
      </h3>
      <p className={`text-sm font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>
        {product.price.toFixed(2)} {product.currency}
      </p>
    </Link>
  );
}
