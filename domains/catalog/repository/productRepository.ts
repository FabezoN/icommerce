import { findAllProducts, findProductBySlug as findBySlug, findSimilarProducts as findSimilar } from "@/domains/catalog/data/productData";
import type { Product } from "@/domains/catalog/entity/product";

export async function getAllProducts(): Promise<Product[]> {
  return findAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return findBySlug(slug);
}

export async function getSimilarProducts(productId: string): Promise<Product[]> {
  return findSimilar(productId);
}
