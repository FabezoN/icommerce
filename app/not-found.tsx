import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <p className="text-8xl font-black text-white font-dancing">404</p>
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Page introuvable</h2>
        <p className="text-gray-400 text-sm">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
      </div>
      <Link
        href="/"
        className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
