import { z } from "zod";

export const updateProductSchema = z.object({
  name: z.string().min(2, "Nom trop court (2 caractères min)"),
  description: z.string().min(10, "Description trop courte (10 caractères min)"),
  price: z.coerce.number().positive("Le prix doit être positif"),
  stock: z.coerce.number().int().min(0, "Le stock ne peut pas être négatif"),
  category: z.string().min(1, "Catégorie requise"),
  brand: z.string().min(1, "Marque requise"),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
