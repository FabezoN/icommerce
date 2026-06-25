import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Zap } from "lucide-react";
import {
  getSponsoredProductByHandle,
  getSponsoredProducts,
} from "@/domains/sponsored/repository/sponsoredProductRepository";


export async function generateStaticParams() {
  const products = await getSponsoredProducts(20);
  return products.map((p) => ({ handle: p.handle }));
}

export default async function SponsoredProductPage(
  props: PageProps<"/sponsored/[handle]">
) {
  const { handle } = await props.params;
  const product = await getSponsoredProductByHandle(handle);
  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Retour à l&apos;accueil
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>

        {/* Infos */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full w-fit">
            <Zap size={12} />
            Produit sponsorisé
          </div>

          <h1 className="text-3xl font-black text-gray-900 leading-tight">
            {product.title}
          </h1>

          <p className="text-4xl font-black text-gray-900">
            {product.price.toFixed(2)} {product.currency}
          </p>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-sm text-amber-800">
            Ce produit est proposé par un partenaire de Bazar. Il n&apos;est pas disponible
            à l&apos;achat directement sur notre plateforme.
          </div>
        </div>
      </div>
    </div>
  );
}
