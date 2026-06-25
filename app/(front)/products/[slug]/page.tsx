import { getAllProducts } from "@/domains/catalog/repository/productRepository";
import { ProductDetails } from "@/app/components/ProductDetails";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  return <ProductDetails slug={slug} />;
}
