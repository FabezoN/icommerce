import { connection } from "next/server";
import {
  getCatalogStats,
  getCatalogStatsNoCache,
  type CatalogStats,
} from "@/domains/catalog/data/catalogStats";

// ── Affichage ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function StatsDisplay({
  stats,
  fetchMs,
  mode,
}: {
  stats: CatalogStats;
  fetchMs: number;
  mode: "cached" | "no-cache";
}) {
  const isCached = mode === "cached";
  const cacheHit = fetchMs < 100; // si < 100ms → résultat depuis le cache

  return (
    <div
      className={`rounded-3xl border p-6 flex flex-col gap-4 ${
        isCached ? "border-green-200 bg-green-50/30" : "border-red-200 bg-red-50/30"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-sm">
          {isCached ? "Avec unstable_cache" : "Sans cache"}
        </h3>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              cacheHit
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {fetchMs}ms {cacheHit ? "— cache hit ✓" : "— calcul réel"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Produits"
          value={`${stats.totalProducts}`}
        />
        <StatCard
          label="Prix moyen"
          value={`${stats.avgPrice.toFixed(2)} €`}
        />
        <StatCard
          label="Valeur stock total"
          value={`${stats.totalInventoryValue.toFixed(0)} €`}
        />
        <StatCard
          label="Fourchette"
          value={`${stats.minPrice} – ${stats.maxPrice} €`}
        />
      </div>

      <div className="text-xs text-gray-400 border-t border-gray-200 pt-3 flex justify-between">
        <span>
          Calculé le{" "}
          <strong className="text-gray-600">
            {new Date(stats.computedAt).toLocaleTimeString("fr-FR")}
          </strong>
          {" "}(durée réelle : {stats.computationMs}ms)
        </span>
        {isCached && (
          <span className="text-green-600 font-medium">
            {cacheHit ? "Servi depuis le cache" : "Premier appel — mis en cache"}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Composants RSC ────────────────────────────────────────────────────────────

export async function StatsSectionCached() {
  await connection(); // Prisma dans unstable_cache → signal PPR requis
  const t = performance.now();
  const stats = await getCatalogStats();
  const fetchMs = Math.round(performance.now() - t);
  return <StatsDisplay stats={stats} fetchMs={fetchMs} mode="cached" />;
}

export async function StatsSectionNoCache() {
  await connection();
  const t = performance.now();
  const stats = await getCatalogStatsNoCache();
  const fetchMs = Math.round(performance.now() - t);
  return <StatsDisplay stats={stats} fetchMs={fetchMs} mode="no-cache" />;
}
