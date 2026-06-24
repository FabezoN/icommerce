import Link from "next/link";
import { LayoutGrid, Package } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-gray-900 text-white flex flex-col">
        <div className="px-5 py-5 border-b border-gray-700">
          <Link href="/admin" className="text-lg font-black tracking-tight">
            Bazar <span className="text-gray-400 font-normal text-sm">Admin</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-1 p-3 flex-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LayoutGrid size={16} />
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Package size={16} />
            Produits
          </Link>
        </nav>
        <div className="px-5 py-4 border-t border-gray-700">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            ← Retour au site
          </Link>
        </div>
      </aside>

      {/* Contenu */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
