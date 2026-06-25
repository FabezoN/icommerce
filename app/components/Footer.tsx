import Link from "next/link";
import { cacheLife } from "next/cache";

export default async function Footer() {
  "use cache";
  cacheLife("max"); // cache quasi-permanent, ne dépend d'aucune donnée dynamique
  return (
    <footer className="bg-gray-950 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="flex flex-col gap-3">
          <span className="text-2xl font-black text-white">Bazar</span>
          <p className="text-sm leading-relaxed">
            Tout ce dont vous avez besoin, au meilleur prix.
          </p>
        </div>

        {/* Boutique */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Boutique</h3>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/products" className="hover:text-white transition-colors">Tous les produits</Link>
            <Link href="/products" className="hover:text-white transition-colors">Nouveautés</Link>
            <Link href="/products" className="hover:text-white transition-colors">Promotions</Link>
            <Link href="/products" className="hover:text-white transition-colors">Meilleures ventes</Link>
          </nav>
        </div>

        {/* Aide */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Aide</h3>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="#" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="#" className="hover:text-white transition-colors">Livraison & retours</Link>
            <Link href="#" className="hover:text-white transition-colors">Suivi de commande</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Newsletter</h3>
          <p className="text-sm">Recevez nos offres exclusives.</p>
          <div className="flex gap-2 mt-1">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg outline-none placeholder-gray-500 border border-gray-700 focus:border-gray-500 transition-colors min-w-0"
            />
            <button className="bg-white text-gray-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0">
              OK
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Bazar. Tous droits réservés.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-400 transition-colors">CGV</Link>
            <Link href="#" className="hover:text-gray-400 transition-colors">Confidentialité</Link>
            <Link href="#" className="hover:text-gray-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
