import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/sleep";
import type { Product } from "@/domains/catalog/entity/product";
import type { UpdateProductInput } from "@/domains/catalog/schema/productSchema";

function toProduct(p: {
  id: string; name: string; slug: string; description: string; price: number;
  currency: string; stock: number; sku: string; category: string; brand: string;
  images: unknown; specs: unknown;
}): Product {
  return {
    id: p.id, name: p.name, slug: p.slug, description: p.description,
    price: p.price, currency: p.currency, stock: p.stock, sku: p.sku,
    category: p.category, brand: p.brand,
    images: p.images as Product["images"],
    specs: p.specs as Product["specs"],
    similar: [],
  };
}

export const findAllProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const start = performance.now();
    await sleep(800); // simule une requête DB coûteuse — visible dans le terminal
    const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
    console.log(`[products] fetched ${products.length} products in ${Math.round(performance.now() - start)}ms`);
    return products.map(toProduct);
  },
  ["all-products"],
  { revalidate: 60, tags: ["products"] }
);

export const findProductBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<Product | null> => {
      const product = await prisma.product.findUnique({ where: { slug } });
      return product ? toProduct(product) : null;
    },
    [`product-${slug}`],
    { revalidate: 60, tags: ["products", `product-${slug}`] }
  )();

export const findSimilarProducts = (productId: string) =>
  unstable_cache(
    async (): Promise<Product[]> => {
      const similars = await prisma.similarProduct.findMany({
        where: { productId },
        orderBy: { score: "asc" },
        take: 4,
        include: { similarProduct: true },
      });
      return similars.map((s) => toProduct(s.similarProduct));
    },
    [`similar-${productId}`],
    { revalidate: 60, tags: ["products"] }
  )();

export async function updateProductById(
  id: string,
  data: UpdateProductInput
): Promise<Product> {
  const updated = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: data.category,
      brand: data.brand,
    },
  });
  return toProduct(updated);
}

export async function findProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({ where: { id } });
  return product ? toProduct(product) : null;
}

export const findSimilarProductsBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<Product[]> => {
      const similars = await prisma.similarProduct.findMany({
        where: { product: { slug } },
        orderBy: { score: "asc" },
        take: 4,
        include: { similarProduct: true },
      });
      return similars.map((s) => toProduct(s.similarProduct));
    },
    [`similar-slug-${slug}`],
    { revalidate: 60, tags: ["products"] }
  )();
