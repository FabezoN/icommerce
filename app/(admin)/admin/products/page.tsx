import Link from "next/link";
import { getAllProducts } from "@/domains/catalog/repository/productRepository";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Produits <span className="text-gray-400 font-normal text-lg">({products.length})</span>
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-5 py-3 font-semibold text-gray-500">Nom</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-500">Catégorie</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-500">Marque</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-500">Prix</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-500">Stock</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-500">SKU</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-medium text-gray-900">{product.name}</td>
                <td className="px-5 py-3 text-gray-500">{product.category}</td>
                <td className="px-5 py-3 text-gray-500">{product.brand}</td>
                <td className="px-5 py-3 font-semibold text-gray-900">{product.price.toFixed(2)} €</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    product.stock === 0
                      ? "bg-red-100 text-red-600"
                      : product.stock < 10
                      ? "bg-orange-100 text-orange-600"
                      : "bg-green-100 text-green-600"
                  }`}>
                    {product.stock === 0 ? "Rupture" : product.stock}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-400 font-mono text-xs">{product.sku}</td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-xs font-medium text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-400 transition"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
