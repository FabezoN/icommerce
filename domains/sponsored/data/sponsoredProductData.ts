import { gqlFetch } from "@/lib/graphql";
import type { SponsoredProduct } from "@/domains/sponsored/entity/sponsoredProduct";

const PRODUCTS_QUERY = `
  query GetSponsoredProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
        featuredImage { url }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetSponsoredProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      featuredImage { url }
      priceRange { minVariantPrice { amount currencyCode } }
    }
  }
`;

type GqlProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: { url: string } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

function toSponsoredProduct(p: GqlProduct): SponsoredProduct {
  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    description: p.description,
    imageUrl: p.featuredImage?.url ?? "",
    price: parseFloat(p.priceRange.minVariantPrice.amount),
    currency: p.priceRange.minVariantPrice.currencyCode,
  };
}

export async function fetchSponsoredProducts(count = 4): Promise<SponsoredProduct[]> {
  const data = await gqlFetch<{ products: { nodes: GqlProduct[] } }>(
    PRODUCTS_QUERY,
    { first: count },
    { revalidate: 3600, tags: ["sponsored"] }
  );
  return data.products.nodes.map(toSponsoredProduct);
}

export async function fetchSponsoredProductByHandle(
  handle: string
): Promise<SponsoredProduct | null> {
  const data = await gqlFetch<{ productByHandle: GqlProduct | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
    { revalidate: 3600, tags: ["sponsored", `sponsored-${handle}`] }
  );
  return data.productByHandle ? toSponsoredProduct(data.productByHandle) : null;
}
