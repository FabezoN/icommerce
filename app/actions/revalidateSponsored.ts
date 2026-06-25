"use server";

import { revalidateTag, revalidatePath } from "next/cache";

export async function revalidateSponsoredAction() {
  // "max" = stale-while-revalidate : sert le contenu en cache
  // pendant que le refresh se fait en arrière-plan (Next.js 16)
  revalidateTag("sponsored", "max");

  // Invalide le rendu des pages qui affichent les sponsorisés
  revalidatePath("/");
  revalidatePath("/products/[slug]", "page");
}
