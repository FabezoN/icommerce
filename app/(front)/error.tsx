"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <div className="text-5xl">⚠️</div>
      <div>
        <h2 className="text-2xl font-black text-white mb-2">Une erreur est survenue</h2>
        <p className="text-gray-400 text-sm max-w-sm">
          {error.message || "Quelque chose s'est mal passé."}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={unstable_retry}
          className="bg-white text-gray-900 font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors text-sm"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="border border-gray-700 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors text-sm"
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
