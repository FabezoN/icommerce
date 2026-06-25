import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  if (!sessionId) return NextResponse.json({ items: [], totalItems: 0, totalPrice: 0 });

  const cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: { items: true },
  });

  const items = cart?.items ?? [];
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return NextResponse.json({ items, totalItems, totalPrice });
}

export async function POST(request: Request) {
  const { productId } = await request.json();

  const cookieStore = await cookies();
  let sessionId = cookieStore.get("session_id")?.value;

  const res = NextResponse.json({ success: true });

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    res.cookies.set("session_id", sessionId, { httpOnly: true, path: "/", sameSite: "lax" });
  }

  let cart = await prisma.cart.findUnique({ where: { sessionId } });
  if (!cart) cart = await prisma.cart.create({ data: { sessionId } });

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    create: { cartId: cart.id, productId, quantity: 1, name: product.name, price: product.price, currency: product.currency },
    update: { quantity: { increment: 1 } },
  });

  return res;
}

export async function DELETE(request: Request) {
  const { itemId } = await request.json();

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  if (!sessionId) return NextResponse.json({ error: "Session introuvable" }, { status: 401 });

  const cart = await prisma.cart.findUnique({ where: { sessionId } });
  if (!cart) return NextResponse.json({ error: "Panier introuvable" }, { status: 404 });

  await prisma.cartItem.delete({
    where: { id: itemId, cartId: cart.id },
  });

  return NextResponse.json({ success: true });
}
