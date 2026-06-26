import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Redirige vers / si l'utilisateur n'est pas connecté ou n'a pas le rôle admin
export default auth((req) => {
  const session = req.auth;
  console.log("[proxy] session.user:", session?.user);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
