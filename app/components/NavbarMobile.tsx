"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";

export default function NavbarMobile() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 md:hidden border-t border-gray-100 bg-white px-4 pb-4 flex flex-col gap-4 pt-4 z-40">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </div>
          <nav className="flex flex-col gap-3">
            {[{ label: "Accueil", href: "/" }, { label: "Produits", href: "/products" }].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
