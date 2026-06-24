import products from "../data/products.json";
import type { Product } from "../entity/product";

export function getAllProducts(): Product[] {
  return products as unknown as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return (products as unknown as Product[]).find((p) => p.slug === slug);
}
