import { getSessionId, getCart } from "@/lib/cart";
import CartIcon from "./CartIcon";

export default async function CartSummary() {
  const sessionId = await getSessionId();
  const cart = sessionId ? await getCart(sessionId) : null;
  const items = cart?.items ?? [];

  return (
    <CartIcon
      items={items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity }))}
      totalItems={items.reduce((acc, i) => acc + i.quantity, 0)}
      totalPrice={items.reduce((acc, i) => acc + i.price * i.quantity, 0)}
    />
  );
}
