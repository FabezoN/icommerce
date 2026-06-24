import { prisma } from "@/lib/prisma";
import type { Product } from "@/domains/catalog/entity/product";

function toProduct(p: {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  sku: string;
  category: string;
  brand: string;
  images: unknown;
  specs: unknown;
}): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    currency: p.currency,
    stock: p.stock,
    sku: p.sku,
    category: p.category,
    brand: p.brand,
    images: p.images as Product["images"],
    specs: p.specs as Product["specs"],
    similar: [],
  };
}

export async function findAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  return products.map(toProduct);
}

export async function findProductBySlug(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({ where: { slug } });
  return product ? toProduct(product) : null;
}
