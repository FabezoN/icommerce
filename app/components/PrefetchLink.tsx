"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

// Variante B : pas de prefetch automatique, prefetch déclenché au survol
export default function PrefetchLink({ href, onMouseEnter, ...props }: Props) {
  const router = useRouter();

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    router.prefetch(typeof href === "string" ? href : (href.pathname ?? ""));
    onMouseEnter?.(e);
  };

  return (
    <Link href={href} prefetch={false} onMouseEnter={handleMouseEnter} {...props} />
  );
}
