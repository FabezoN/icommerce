import { cookies } from "next/headers";
import { cacheTag } from "next/cache";
import { getAllProducts } from "@/domains/catalog/repository/productRepository";
import ProductCard from "@/app/components/ProductCard";

type Variant = "A" | "B";

// RSC qui lit le cookie — dynamique, doit être dans <Suspense>
export async function ProductListAB() {
  const cookieStore = await cookies();
  const variant = (cookieStore.get("ab_variant")?.value as Variant | undefined) ?? "A";
  return <ProductList variant={variant} />;
}

// RSC mis en cache — deux entrées cache : variant A et variant B
// revalidateTag("products") invalide les deux
export async function ProductList({ variant = "A" }: { variant?: Variant }) {
  "use cache";
  cacheTag("products");

  const start = performance.now();
  const products = await getAllProducts();
  const ms = Math.round(performance.now() - start);

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Nos produits</h2>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            variant === "B" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
          }`}>
            Variante {variant}
          </span>
          <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {ms < 50 ? `cache hit — ${ms}ms` : `calculé — ${ms}ms`}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant={variant} />
        ))}
      </div>
    </section>
  );
}

export function ProductListSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="h-8 bg-gray-200 rounded-full w-40 mb-8 animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-2xl" />
            <div className="h-4 bg-gray-200 rounded-full w-3/4" />
            <div className="h-4 bg-gray-200 rounded-full w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
}
