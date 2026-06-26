import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getProductById } from "@/domains/catalog/repository/productRepository";
import EditProductForm from "./EditProductForm";

// RSC async dans le Suspense — toute la donnée dynamique est ici
async function EditContent({ paramsPromise }: { paramsPromise: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  await connection();
  const product = await getProductById(id);
  if (!product) notFound();
  return (
    <>
      <p className="text-gray-400 text-sm mt-1 font-mono">{product.sku}</p>
      <div className="mt-6">
        <EditProductForm product={product} />
      </div>
    </>
  );
}

// Shell statique — ne touche pas aux params ni à la DB
export default function EditProductPage(props: { params: Promise<{ id: string }> }) {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Modifier le produit</h1>
      <Suspense fallback={<div className="mt-6 h-96 bg-gray-100 rounded-2xl animate-pulse" />}>
        <EditContent paramsPromise={props.params} />
      </Suspense>
    </div>
  );
}
