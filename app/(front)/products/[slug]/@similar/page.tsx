import { SimilarProducts } from "@/app/components/SimilarProducts";

export default async function SimilarSlot({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SimilarProducts slug={slug} />;
}
