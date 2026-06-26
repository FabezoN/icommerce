"use client";

import { useActionState } from "react";
import Link from "next/link";
import { updateProductAction } from "@/app/actions/updateProduct";
import type { Product } from "@/domains/catalog/entity/product";

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="text-red-500 text-xs mt-1">{messages[0]}</p>;
}

type Props = { product: Product };

export default function EditProductForm({ product }: Props) {
  // bind id pour que l'action reçoive toujours le bon produit
  const action = updateProductAction.bind(null, product.id);
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {state.error}
        </div>
      )}

      {/* Nom */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700" htmlFor="name">Nom</label>
        <input
          id="name"
          name="name"
          defaultValue={product.name}
          className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition"
        />
        <FieldError messages={state?.errors?.name} />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product.description}
          className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition resize-none"
        />
        <FieldError messages={state?.errors?.description} />
      </div>

      {/* Prix + Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="price">Prix (€)</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product.price}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition"
          />
          <FieldError messages={state?.errors?.price} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            defaultValue={product.stock}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition"
          />
          <FieldError messages={state?.errors?.stock} />
        </div>
      </div>

      {/* Catégorie + Marque */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="category">Catégorie</label>
          <input
            id="category"
            name="category"
            defaultValue={product.category}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition"
          />
          <FieldError messages={state?.errors?.category} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="brand">Marque</label>
          <input
            id="brand"
            name="brand"
            defaultValue={product.brand}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition"
          />
          <FieldError messages={state?.errors?.brand} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button
          type="submit"
          disabled={pending}
          className="bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-xl px-6 py-2.5 text-sm transition disabled:opacity-60"
        >
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        <Link
          href="/admin/products"
          className="text-sm text-gray-400 hover:text-gray-700 transition"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
