import { findAllProducts, findProductBySlug as findBySlug } from "@/domains/catalog/data/productData";
import type { Product } from "@/domains/catalog/entity/product";

export async function getAllProducts(): Promise<Product[]> {
  return findAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return findBySlug(slug);
}
