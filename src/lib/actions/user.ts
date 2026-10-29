"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import {
  USER_SESSION_COOKIE,
  createSessionValue,
  verifySessionValue,
} from "@/lib/session";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // یک هفته
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function signupAction(
  name: string,
  email: string,
  password: string
) {
  name = name.trim();
  email = email.trim().toLowerCase();

  if (!name || name.length > 60) {
    return { ok: false, error: "نام را به‌درستی وارد کنید." };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: "ایمیل معتبر نیست." };
  }

  if (password.length < 6) {
    return { ok: false, error: "رمز عبور باید حداقل ۶ کاراکتر باشد." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return { ok: false, error: "کاربری با این ایمیل قبلاً ثبت‌نام کرده است." };
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  const cookieStore = await cookies();
  cookieStore.set(
    USER_SESSION_COOKIE,
    createSessionValue(user.email),
    COOKIE_OPTIONS
  );

  return { ok: true };
}

export async function loginUserAction(email: string, password: string) {
  email = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { ok: false, error: "ایمیل یا رمز عبور اشتباه است." };
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return { ok: false, error: "ایمیل یا رمز عبور اشتباه است." };
  }

  const cookieStore = await cookies();
  cookieStore.set(
    USER_SESSION_COOKIE,
    createSessionValue(user.email),
    COOKIE_OPTIONS
  );

  return { ok: true };
}

export async function logoutUserAction() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_SESSION_COOKIE);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const value = cookieStore.get(USER_SESSION_COOKIE)?.value;
  const session = verifySessionValue(value);

  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.username },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  return user;
}
