"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/auth";

export interface CreatorInput {
  name: string;
  slug: string;
  role: string;
  bio: string;
  accent: string;
}

function refresh() {
  revalidatePath("/creators");
  revalidatePath("/admin/creators");
}

export async function listCreators() {
  return prisma.creator.findMany({
    orderBy: { id: "asc" },
    include: { _count: { select: { games: true } } },
  });
}

export async function getCreatorBySlug(slug: string) {
  return prisma.creator.findUnique({
    where: { slug },
    include: { games: { orderBy: { id: "asc" } } },
  });
}

export async function createCreator(data: CreatorInput) {
  await requireAdmin();

  const creator = await prisma.creator.create({ data });
  refresh();

  return creator;
}

export async function updateCreator(id: number, data: Partial<CreatorInput>) {
  await requireAdmin();

  const creator = await prisma.creator.update({ where: { id }, data });
  refresh();

  return creator;
}

export async function deleteCreator(id: number) {
  await requireAdmin();

  await prisma.creator.update({
    where: { id },
    data: { games: { set: [] } },
  });
  await prisma.creator.delete({ where: { id } });
  refresh();
}

export async function assignGameCreator(gameId: number, creatorId: number | null) {
  await requireAdmin();

  const game = await prisma.game.update({
    where: { id: gameId },
    data: { creatorId },
  });

  refresh();
  revalidatePath("/games");
  revalidatePath("/admin/games");

  return game;
}
