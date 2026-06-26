"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { updateProductSchema } from "@/domains/catalog/schema/productSchema";
import { updateProduct, getProductById } from "@/domains/catalog/repository/productRepository";

export type UpdateProductState = {
  errors?: Partial<Record<"name" | "description" | "price" | "stock" | "category" | "brand", string[]>>;
  error?: string;
} | null;

export async function updateProductAction(
  id: string,
  _prev: UpdateProductState,
  formData: FormData
): Promise<UpdateProductState> {
  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    category: formData.get("category"),
    brand: formData.get("brand"),
  };

  const result = updateProductSchema.safeParse(raw);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const product = await getProductById(id);
  if (!product) return { error: "Produit introuvable." };

  await updateProduct(id, result.data);

  // Invalide le cache pour ce produit et la liste
  revalidateTag("products", "max");
  revalidateTag(`product-${product.slug}`, "max");

  redirect("/admin/products");
}
