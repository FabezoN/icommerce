import { Suspense } from "react";
import { StatsSectionCached, StatsSectionNoCache } from "@/app/components/StatsSection";

function StatsSkeleton() {
  return (
    <div className="rounded-3xl border border-gray-200 p-6 animate-pulse flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded-full w-40" />
        <div className="h-6 bg-gray-200 rounded-full w-28" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-2xl p-4 h-16" />
        ))}
      </div>
      <div className="h-3 bg-gray-100 rounded-full w-3/4" />
    </div>
  );
}

export default function StatsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-3">
          Démo — <code className="text-2xl font-mono bg-gray-100 px-2 py-0.5 rounded-lg">unstable_cache</code>
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Les deux blocs exécutent la même fonction coûteuse (~1,5s).
          Rechargez plusieurs fois et observez le terminal serveur et les badges de timing.
        </p>
        <ul className="mt-4 text-sm text-gray-500 list-disc list-inside space-y-1">
          <li><strong>1er chargement</strong> — les deux calculent (~1500ms)</li>
          <li><strong>Rechargements suivants</strong> — le bloc caché répond en {"<"}10ms, l&apos;autre toujours ~1500ms</li>
          <li><strong>Timestamp «&nbsp;Calculé le&nbsp;»</strong> — reste figé côté cache, change côté sans cache</li>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        {/* Avec unstable_cache — streame en premier si déjà en cache */}
        <Suspense fallback={<StatsSkeleton />}>
          <StatsSectionCached />
        </Suspense>

        {/* Sans cache — toujours ~1500ms */}
        <Suspense fallback={<StatsSkeleton />}>
          <StatsSectionNoCache />
        </Suspense>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-2xl text-xs text-gray-500 font-mono leading-relaxed">
        <p className="font-semibold text-gray-700 mb-2 font-sans text-sm">Terminal serveur :</p>
        <p>[catalog-stats] computed in 1512ms  ← calcul réel</p>
        <p>[catalog-stats] computed in 1508ms  ← calcul réel (sans cache)</p>
        <p className="text-green-700 mt-1">→ rechargement :</p>
        <p className="text-green-700">[catalog-stats] computed in 1511ms  ← sans cache recalcule</p>
        <p className="text-green-700">← avec cache : rien (0ms, servi depuis le cache Next.js)</p>
      </div>
    </div>
  );
}
