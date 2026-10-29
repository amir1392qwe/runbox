"use server";

import { revalidatePath } from "next/cache";
import { writeFile, mkdir, unlink } from "node:fs/promises";
import path from "node:path";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "games");
const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1 گیگابایت
const ALLOWED_EXT = [".zip", ".rar", ".7z", ".exe"];

export interface GameInput {
  title: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  accent: string;
  creatorId?: number | null;
}

function refresh() {
  revalidatePath("/games");
  revalidatePath("/admin/games");
  revalidatePath("/admin");
}

export async function listGames() {
  return prisma.game.findMany({ orderBy: { id: "asc" } });
}

export async function createGame(data: GameInput) {
  await requireAdmin();

  const game = await prisma.game.create({ data });
  refresh();

  return game;
}

export async function updateGame(id: number, data: Partial<GameInput>) {
  await requireAdmin();

  const game = await prisma.game.update({ where: { id }, data });
  refresh();

  return game;
}

export async function deleteGame(id: number) {
  await requireAdmin();

  await prisma.game.delete({ where: { id } });
  refresh();
}

export async function uploadGameFile(gameId: number, formData: FormData) {
  await requireAdmin();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return { ok: false, error: "فایلی انتخاب نشده است." };
  }

  const ext = path.extname(file.name).toLowerCase();

  if (!ALLOWED_EXT.includes(ext)) {
    return {
      ok: false,
      error: `فرمت مجاز نیست. فرمت‌های قابل قبول: ${ALLOWED_EXT.join("، ")}`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, error: "حجم فایل نباید بیش از ۱ گیگابایت باشد." };
  }

  const game = await prisma.game.findUnique({ where: { id: gameId } });
  if (!game) {
    return { ok: false, error: "بازی پیدا نشد." };
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  // فایل قدیمی (اگر بود) حذف می‌شود
  if (game.fileUrl) {
    await unlink(path.join(process.cwd(), "public", game.fileUrl)).catch(
      () => {}
    );
  }

  const storedName = `${game.slug}-${Date.now()}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  await writeFile(path.join(UPLOAD_DIR, storedName), bytes);

  const fileUrl = `/uploads/games/${storedName}`;

  const updated = await prisma.game.update({
    where: { id: gameId },
    data: {
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
    },
  });

  refresh();

  return { ok: true, game: updated };
}

export async function removeGameFile(gameId: number) {
  await requireAdmin();

  const game = await prisma.game.findUnique({ where: { id: gameId } });
  if (!game) return { ok: false, error: "بازی پیدا نشد." };

  if (game.fileUrl) {
    await unlink(path.join(process.cwd(), "public", game.fileUrl)).catch(
      () => {}
    );
  }

  const updated = await prisma.game.update({
    where: { id: gameId },
    data: { fileUrl: null, fileName: null, fileSize: null },
  });

  refresh();

  return { ok: true, game: updated };
}

export async function resetGames() {
  await requireAdmin();

  const defaults: GameInput[] = [
    {
      slug: "cyber-strike",
      title: "ضربه سایبری",
      category: "اکشن",
      description:
        "یک تیرانداز آینده‌نگرانه در دل شهری نئونی که هر مأموریت با سرعت و واکنش سریع شما سنجیده می‌شود.",
      icon: "cyber",
      accent: "from-violet-500 to-fuchsia-500",
    },
    {
      slug: "shadow-legion",
      title: "سپاه سایه",
      category: "نقش‌آفرینی",
      description:
        "در دنیایی تاریک و حماسی، سپاهی از سایه‌ها را رهبری کنید و سرنوشت قلمروهای فراموش‌شده را رقم بزنید.",
      icon: "shadow",
      accent: "from-purple-500 to-indigo-500",
    },
    {
      slug: "void-racers",
      title: "مسابقه‌دهندگان پوچی",
      category: "مسابقه‌ای",
      description:
        "با سفینه‌های ضدجاذبه در مسیرهای بی‌انتهای فضا رقابت کنید؛ هر پیچ یک تصمیم مرگ و زندگی است.",
      icon: "void",
      accent: "from-cyan-500 to-blue-500",
    },
    {
      slug: "dragons-ember",
      title: "افسانه اژدهای آتشین",
      category: "ماجراجویی",
      description:
        "همراه اژدهایی افسانه‌ای بر فراز سرزمین‌های سوخته پرواز کنید و رازهای گمشده‌ی آتش ازلی را بیابید.",
      icon: "dragon",
      accent: "from-orange-500 to-pink-500",
    },
    {
      slug: "starborn-empire",
      title: "امپراتوری ستاره‌ای",
      category: "استراتژی",
      description:
        "امپراتوری کهکشانی خود را از صفر بسازید، ناوگان‌ها را فرماندهی کنید و بر منظومه‌های دوردست حکم برانید.",
      icon: "empire",
      accent: "from-sky-400 to-violet-500",
    },
    {
      slug: "ghost-duel",
      title: "نبرد ارواح",
      category: "مبارزه‌ای",
      description:
        "در آوردگاهی میان دنیای زندگان و مردگان، روح خود را در نبردهای تن‌به‌تن سریع و بی‌رحمانه محک بزنید.",
      icon: "ghost",
      accent: "from-fuchsia-400 to-cyan-400",
    },
  ];

  await prisma.game.deleteMany();
  await prisma.game.createMany({ data: defaults });
  refresh();

  return prisma.game.findMany({ orderBy: { id: "asc" } });
}
