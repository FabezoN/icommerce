"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { revalidateSponsoredAction } from "@/app/actions/revalidateSponsored";

export default function RefreshSponsoredButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await revalidateSponsoredAction(); // Server Action → revalidateTag + revalidatePath
    router.refresh();                  // re-render RSC côté client
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 border border-gray-200 hover:border-gray-400 px-2.5 py-1 rounded-full transition-colors disabled:opacity-50"
    >
      <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
      {loading ? "Actualisation…" : "Actualiser"}
    </button>
  );
}
