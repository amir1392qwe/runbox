"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/auth";

export async function sendMessage(data: {
  name: string;
  email: string;
  content: string;
}) {
  if (!data.name.trim() || !data.email.trim() || !data.content.trim()) {
    return { ok: false, error: "لطفاً همه‌ی فیلدها را پر کنید." };
  }

  if (
    data.name.length > 100 ||
    data.email.length > 200 ||
    data.content.length > 5000
  ) {
    return { ok: false, error: "متن وارد شده بیش از حد طولانی است." };
  }

  await prisma.message.create({
    data: {
      name: data.name.trim(),
      email: data.email.trim(),
      content: data.content.trim(),
    },
  });
  revalidatePath("/admin/messages");

  return { ok: true };
}

export async function listMessages() {
  await requireAdmin();
  return prisma.message.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteMessage(id: number) {
  await requireAdmin();
  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
