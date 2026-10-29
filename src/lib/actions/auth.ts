"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE,
  createSessionValue,
  verifySessionValue,
} from "@/lib/session";

export async function loginAction(username: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { username } });

  if (!admin) {
    return { ok: false, error: "نام کاربری یا رمز عبور اشتباه است." };
  }

  const valid = await bcrypt.compare(password, admin.password);

  if (!valid) {
    return { ok: false, error: "نام کاربری یا رمز عبور اشتباه است." };
  }

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, createSessionValue(admin.username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // یک هفته
  });

  return { ok: true };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionValue(value);
}

export async function requireAdmin() {
  const session = await getCurrentAdmin();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}
