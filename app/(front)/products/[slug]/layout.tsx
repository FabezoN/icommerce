import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProductLayout({
  children,
  similar,
  sponsored,
}: {
  children: React.ReactNode;
  similar: React.ReactNode;
  sponsored: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Retour aux produits
      </Link>

      {/* Slot principal : ProductDetails */}
      {children}

      {/* Slot @similar : streame indépendamment */}
      {similar}

      {/* Slot @sponsored : streame indépendamment */}
      {sponsored}
    </div>
  );
}
