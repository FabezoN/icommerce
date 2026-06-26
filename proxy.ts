import { auth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";

const AB_COOKIE = "ab_variant";

// Détermine la variante A/B pour la requête
function resolveVariant(req: NextRequest): { variant: "A" | "B"; fresh: boolean } {
  // 1. Query param override → force la variante (ex: ?ab_prefetch=B)
  const param = req.nextUrl.searchParams.get("ab_prefetch");
  if (param === "A" || param === "B") {
    console.log(`[proxy] A/B forcé via query param : ${param}`);
    return { variant: param, fresh: true };
  }

  // 2. Cookie existant → on conserve la variante
  const cookie = req.cookies.get(AB_COOKIE)?.value;
  if (cookie === "A" || cookie === "B") {
    console.log(`[proxy] A/B depuis cookie : ${cookie}`);
    return { variant: cookie, fresh: false };
  }

  // 3. Aucun cookie → tirage aléatoire 50/50
  const variant = Math.random() < 0.5 ? "A" : "B";
  console.log(`[proxy] A/B tirage : ${variant}`);
  return { variant, fresh: true };
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // ── Admin guard ──────────────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const session = req.auth;
    if (!session || session.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // ── A/B test — s'applique à toutes les pages front ──────────────────────────
  const { variant, fresh } = resolveVariant(req);
  const response = NextResponse.next();

  // On écrit le cookie seulement si c'est un nouveau tirage (ou un override)
  if (fresh) {
    response.cookies.set(AB_COOKIE, variant, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 jours
      sameSite: "lax",
      httpOnly: false, // lisible en JS et visible dans DevTools > Application > Cookies
    });
  }

  return response;
});

export const config = {
  // Admin guard + toutes les pages front (hors assets/API)
  matcher: [
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon\\.ico).*)",
  ],
};
