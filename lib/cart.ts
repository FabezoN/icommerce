import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function getSessionId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("session_id")?.value;
}

export async function getCart(sessionId: string) {
  return prisma.cart.findUnique({
    where: { sessionId },
    include: { items: { include: { product: { select: { images: true } } } } },
  });
}
