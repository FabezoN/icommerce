import { NextResponse } from "next/server";
import { getAllProducts } from "@/domains/catalog/repository/productRepository";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products);
}
