import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/sleep";

export type CatalogStats = {
  totalProducts: number;
  avgPrice: number;
  maxPrice: number;
  minPrice: number;
  totalInventoryValue: number;
  byCategory: Record<string, number>;
  computedAt: string;     // timestamp réel du calcul → prouve que le cache est utilisé
  computationMs: number;  // durée réelle du calcul (≈1500ms) vs cache (≈0ms)
};

// Fonction coûteuse — 1,5s de calcul simulé + agrégation Prisma
async function computeCatalogStats(): Promise<CatalogStats> {
  const start = performance.now();

  await sleep(1500); // simule un calcul intensif (ML, BI, agrégation lourde…)

  const products = await prisma.product.findMany({
    select: { price: true, stock: true, category: true },
  });

  const prices = products.map((p) => p.price);
  const byCategory: Record<string, number> = {};
  for (const p of products) {
    byCategory[p.category] = (byCategory[p.category] ?? 0) + 1;
  }

  const ms = Math.round(performance.now() - start);
  console.log(`[catalog-stats] computed in ${ms}ms`);

  return {
    totalProducts: products.length,
    avgPrice: prices.reduce((a, b) => a + b, 0) / prices.length,
    maxPrice: Math.max(...prices),
    minPrice: Math.min(...prices),
    totalInventoryValue: products.reduce((acc, p) => acc + p.price * p.stock, 0),
    byCategory,
    computedAt: new Date().toISOString(),
    computationMs: ms,
  };
}

// ── Avec cache ───────────────────────────────────────────────────────────────
// Premier appel : ~1500ms (calcul réel) → résultat mis en cache
// Appels suivants : ~0ms (depuis le cache Next.js)
// Invalidation : revalidateTag("catalog-stats") ou après 60s
export const getCatalogStats = unstable_cache(
  computeCatalogStats,
  ["catalog-stats"],
  { revalidate: 60, tags: ["products", "catalog-stats"] }
);

// ── Sans cache ───────────────────────────────────────────────────────────────
// Chaque appel relance le calcul complet → toujours ~1500ms
export const getCatalogStatsNoCache = computeCatalogStats;
