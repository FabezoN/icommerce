import Link from "next/link";
import { Search, User } from "lucide-react";
import { Suspense } from "react";
import CartSummary from "./CartSummary";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        <Link href="/" className="text-3xl font-bold tracking-tight text-gray-900 shrink-0 font-dancing">
          Bazar
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Accueil
          </Link>
          <Link href="/products" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Produits
          </Link>
        </nav>

        <div className="hidden md:flex items-center flex-1 max-w-xs bg-gray-100 rounded-full px-4 py-2 gap-2">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden md:flex p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
            <User size={20} />
          </button>

          {/* RSC lit le cookie → DB → passe les données à CartIcon (Client) */}
          <Suspense fallback={<div className="w-9 h-9" />}>
            <CartSummary />
          </Suspense>

          <NavbarMobile />
        </div>
      </div>
    </header>
  );
}
