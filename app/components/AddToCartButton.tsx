"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/domains/catalog/entity/product";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock === 0;

  function handleClick() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      disabled={outOfStock}
      className="flex items-center justify-center gap-3 bg-gray-900 text-white font-semibold py-4 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {added ? <Check size={20} /> : <ShoppingCart size={20} />}
      {outOfStock ? "Indisponible" : added ? "Ajouté !" : "Ajouter au panier"}
    </button>
  );
}
