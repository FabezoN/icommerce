import { findAllProducts, findProductBySlug as findBySlug, findSimilarProducts as findSimilar, findSimilarProductsBySlug as findSimilarBySlug, updateProductById, findProductById } from "@/domains/catalog/data/productData";
import type { Product } from "@/domains/catalog/entity/product";
import type { UpdateProductInput } from "@/domains/catalog/schema/productSchema";

export async function getAllProducts(): Promise<Product[]> {
  return findAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return findBySlug(slug);
}

export async function getSimilarProducts(productId: string): Promise<Product[]> {
  return findSimilar(productId);
}

export async function getSimilarProductsBySlug(slug: string): Promise<Product[]> {
  return findSimilarBySlug(slug);
}

export async function getProductById(id: string): Promise<Product | null> {
  return findProductById(id);
}

export async function updateProduct(
  id: string,
  data: UpdateProductInput
): Promise<Product> {
  return updateProductById(id, data);
}
