import {
  fetchSponsoredProducts,
  fetchSponsoredProductByHandle,
} from "@/domains/sponsored/data/sponsoredProductData";
import type { SponsoredProduct } from "@/domains/sponsored/entity/sponsoredProduct";

export async function getSponsoredProducts(count = 4): Promise<SponsoredProduct[]> {
  return fetchSponsoredProducts(count);
}

export async function getSponsoredProductByHandle(
  handle: string
): Promise<SponsoredProduct | null> {
  return fetchSponsoredProductByHandle(handle);
}
