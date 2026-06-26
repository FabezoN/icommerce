import Link from "next/link";
import { auth } from "@/auth";

// RSC async — sera placé dans <Suspense> pour rester un trou dynamique PPR
export default async function AdminLink() {
  const session = await auth();
  if (session?.user?.role !== "admin") return null;
  return (
    <Link
      href="/admin"
      className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
    >
      Admin
    </Link>
  );
}
