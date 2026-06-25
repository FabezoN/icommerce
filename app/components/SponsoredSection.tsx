import { getSponsoredProducts } from "@/domains/sponsored/repository/sponsoredProductRepository";
import SponsoredProductCard from "./SponsoredProductCard";
import RefreshSponsoredButton from "./RefreshSponsoredButton";

type Props = {
  count?: number;
  variant?: "dark" | "light";
};

export default async function SponsoredSection({ count = 4, variant = "dark" }: Props) {
  const products = await getSponsoredProducts(count);
  if (products.length === 0) return null;

  const isDark = variant === "dark";

  return (
    <section
      className={`max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t ${
        isDark ? "border-gray-800" : "border-gray-100"
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          {isDark ? "Produits sponsorisés" : "Découvrez aussi"}
        </h2>
        <span
          className={`text-xs border px-2 py-0.5 rounded-full ${
            isDark
              ? "text-amber-400 border-amber-400/40"
              : "text-amber-600 border-amber-300"
          }`}
        >
          Partenaires
        </span>
        <RefreshSponsoredButton />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {products.map((product) => (
          <SponsoredProductCard key={product.id} product={product} variant={variant} />
        ))}
      </div>
    </section>
  );
}
