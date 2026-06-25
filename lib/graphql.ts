const GQL_ENDPOINT =
  process.env.GRAPHQL_STORE_URL ??
  "https://graphqlstore.julienfroidefond.com/api/2024-01/graphql.json";

export async function gqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { revalidate?: number; tags?: string[] }
): Promise<T> {
  const res = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: options?.revalidate ?? 3600,
      tags: options?.tags ?? ["sponsored"],
    },
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}
