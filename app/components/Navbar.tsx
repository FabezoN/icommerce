"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tight text-gray-900 shrink-0">
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
          <Link href="/products" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Nouveautés
          </Link>
          <Link href="/products" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Promotions
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
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
            <ShoppingCart size={20} />
            <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
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
              { label: "Nouveautés", href: "/products" },
              { label: "Promotions", href: "/products" },
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
