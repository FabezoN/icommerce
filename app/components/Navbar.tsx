import Link from "next/link";
import { Search } from "lucide-react";
import { Suspense } from "react";
import CartSummary from "./CartSummary";
import NavbarMobile from "./NavbarMobile";
import UserMenu from "./UserMenu";
import AdminLink from "./AdminLink";

// Navbar est un RSC synchrone (statique).
// Les parties dynamiques (auth, panier) vivent dans des <Suspense>.
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-sm">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        <Link href="/" className="text-3xl font-bold tracking-tight text-white shrink-0 font-dancing">
          Bazar
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Accueil
          </Link>
          <Link href="/products" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Produits
          </Link>
          {/* Lien admin — trou dynamique PPR (lit la session) */}
          <Suspense fallback={null}>
            <AdminLink />
          </Suspense>
        </nav>

        <div className="hidden md:flex items-center flex-1 max-w-xs bg-gray-800 rounded-full px-4 py-2 gap-2">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Trigramme + déconnexion — trou dynamique PPR */}
          <Suspense fallback={<div className="w-8 h-8" />}>
            <UserMenu />
          </Suspense>

          {/* Panier — trou dynamique PPR */}
          <Suspense fallback={<div className="w-9 h-9" />}>
            <CartSummary />
          </Suspense>

          <NavbarMobile />
        </div>
      </div>
    </header>
  );
}
