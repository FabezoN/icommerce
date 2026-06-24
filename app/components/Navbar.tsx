"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, totalItems, totalPrice } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="text-3xl font-bold tracking-tight text-gray-900 shrink-0 font-dancing">
          Bazar
        </Link>

        {/* Nav liens — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Accueil
          </Link>
          <Link href="/products" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Produits
          </Link>
        </nav>

        {/* Barre de recherche — desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-xs bg-gray-100 rounded-full px-4 py-2 gap-2">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
            <User size={20} />
          </button>

          {/* Panier */}
          <div className="relative" ref={cartRef}>
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Dropdown résumé panier */}
            {cartOpen && (
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
                            <p className="text-xs text-gray-400">
                              {item.quantity} × {item.price.toFixed(2)} €
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 shrink-0">
                            {(item.price * item.quantity).toFixed(2)} €
                          </p>
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

          {/* Burger mobile */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 flex flex-col gap-4 pt-4">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </div>
          <nav className="flex flex-col gap-3">
            {[
              { label: "Accueil", href: "/" },
              { label: "Produits", href: "/products" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
