"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/domains/catalog/entity/product";

const tabBase = "px-5 py-2.5 text-sm font-semibold rounded-full transition-colors";
const tabActive = "bg-gray-900 text-white";
const tabInactive = "text-gray-500 hover:text-gray-900";

export default function ProductTabs({ product, slug }: { product: Product; slug: string }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") === "specs" ? "specs" : "description";

  return (
    <div>
      <div className="flex gap-2 bg-gray-100 p-1 rounded-full w-fit mb-5">
        <Link
          href={`/products/${slug}`}
          className={`${tabBase} ${activeTab === "description" ? tabActive : tabInactive}`}
        >
          Description
        </Link>
        <Link
          href={`/products/${slug}?tab=specs`}
          className={`${tabBase} ${activeTab === "specs" ? tabActive : tabInactive}`}
        >
          Spécifications
        </Link>
      </div>

      {activeTab === "description" ? (
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 capitalize mb-0.5">{key}</p>
              <p className="text-sm font-semibold text-gray-800">
                {typeof value === "boolean" ? (value ? "Oui" : "Non") : String(value)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
