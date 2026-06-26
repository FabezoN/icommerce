import Link from "next/link";
import { auth } from "@/auth";
import { signOutAction } from "@/app/actions/auth";

function trigram(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

export default async function UserMenu() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium text-gray-300 hover:text-white transition"
      >
        Connexion
      </Link>
    );
  }

  const initials = trigram(session.user.name ?? session.user.email ?? "?");

  return (
    <div className="flex items-center gap-3">
      {/* Trigramme */}
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white tracking-wide">
        {initials}
      </div>

      {/* Déconnexion via server action dans un <form> */}
      <form action={signOutAction}>
        <button
          type="submit"
          className="text-xs text-gray-400 hover:text-white transition"
        >
          Déconnexion
        </button>
      </form>
    </div>
  );
}
