"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Props = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

export default function CartIcon({ items, totalItems, totalPrice }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  async function removeItem(itemId: string) {
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    router.refresh();
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
      >
        <ShoppingCart size={20} />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-50">
          <div className="p-4 border-b border-gray-100">
            <p className="font-semibold text-gray-900 text-sm">Panier ({totalItems})</p>
          </div>

          {items.length === 0 ? (
            <p className="p-4 text-sm text-gray-400 text-center">Votre panier est vide</p>
          ) : (
            <>
              <ul className="max-h-60 overflow-y-auto divide-y divide-gray-50">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.quantity} × {item.price.toFixed(2)} €</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 shrink-0">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="p-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-gray-900">Total</span>
                  <span className="text-sm font-bold text-gray-900">{totalPrice.toFixed(2)} €</span>
                </div>
                <button className="w-full bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-full hover:bg-gray-700 transition-colors">
                  Commander
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
