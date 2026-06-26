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
  // Bouton de test d'erreur — renvoie une erreur simulée sans toucher à la DB
  if (formData.get("intent") === "test-error") {
    return {
      error: "Erreur simulée : impossible de contacter la base de données. Réessayez plus tard.",
    };
  }

  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    category: formData.get("category"),
    brand: formData.get("brand"),
  };

  // Validation Zod — erreurs par champ
  const result = updateProductSchema.safeParse(raw);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const product = await getProductById(id);
  if (!product) return { error: "Produit introuvable." };

  // Update DB — encapsulé dans un try/catch pour gérer les erreurs inattendues
  try {
    await updateProduct(id, result.data);
  } catch (err) {
    console.error("[updateProductAction] DB error:", err);
    return { error: "Une erreur est survenue lors de la mise à jour. Réessayez." };
  }

  revalidateTag("products", "max");
  revalidateTag(`product-${product.slug}`, "max");

  redirect("/admin/products");
}
