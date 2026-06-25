const GQL_ENDPOINT =
  process.env.GRAPHQL_STORE_URL ??
  "https://graphqlstore.julienfroidefond.com/api/2024-01/graphql.json";

export async function gqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { revalidate?: number; tags?: string[] }
): Promise<T> {
  const start = performance.now();

  const res = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),

    // --- Modes de cache à comparer ---
    // "force-cache"  → toujours depuis le cache, jamais réseau (0ms si déjà mis en cache)
    // "no-store"     → toujours réseau, jamais mis en cache
    // next: { revalidate: N } → cache pendant N secondes, puis revalide en arrière-plan (SWR)
    next: {
      revalidate: options?.revalidate ?? 3600,
      tags: options?.tags ?? ["sponsored"],
    },
  });

  const ms = (performance.now() - start).toFixed(0);
  console.log(`[graphqlstore] fetch products ${ms}ms`);

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}
