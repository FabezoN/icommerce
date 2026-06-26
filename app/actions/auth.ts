"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { auth, signIn, signOut } from "@/auth";

// ── Inscription ───────────────────────────────────────────────────────────────

export type AuthState = { error?: string } | null;

export async function registerAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!name || !email || !password) return { error: "Tous les champs sont requis." };
  if (password.length < 8) return { error: "Mot de passe trop court (8 caractères min)." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Email invalide." };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "Cet email est déjà utilisé." };

  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.create({ data: { name, email, password: hashed } });

  redirect("/login?registered=1");
}

// ── Connexion ─────────────────────────────────────────────────────────────────

export async function loginAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    await signIn("credentials", {
      email: (formData.get("email") as string)?.trim().toLowerCase(),
      password: formData.get("password") as string,
      redirect: false,
    });
  } catch (e) {
    if (e instanceof AuthError) return { error: "Email ou mot de passe incorrect." };
    throw e; // laisser propager les erreurs inattendues
  }
  redirect("/");
}

// ── Déconnexion ───────────────────────────────────────────────────────────────

export async function signOutAction() {
  await signOut({ redirect: false });
  redirect("/");
}
