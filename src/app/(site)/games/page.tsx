import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";

import Container from "@/components/ui/Container";
import GameIcon, { type GameIconId } from "@/components/icons/GameIcons";
import { prisma } from "@/lib/prisma";
import { formatFileSize } from "@/lib/format";

export const metadata: Metadata = {
  title: "بازی‌ها",
  description: "مجموعه بازی‌های رانباکس",
};

export const revalidate = 0;

export default async function GamesPage() {
  const gamesCatalog = await prisma.game.findMany({
    orderBy: { id: "asc" },
    include: { creator: true },
  });

  return (
    <section className="relative overflow-hidden bg-[#050505] pb-32 pt-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

      <Container className="relative z-10">
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-violet-400">
            بازی‌ها
          </p>

          <h1 className="text-6xl font-black leading-[0.95] md:text-7xl">
            دنیاهایی برای
            <br />
            کاوش
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
            هر بازی رانباکس یک دنیای مستقل است؛ از نبردهای سایبری تا
            سرزمین‌های اژدها. مجموعه‌ی کامل بازی‌های استودیو را اینجا
            ببینید.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {gamesCatalog.map((game) => (
            <article
              key={game.id}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-neutral-900"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <GameIcon
                  id={game.icon as GameIconId}
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${game.accent} opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-30`}
                />

                <div className="absolute bottom-0 right-0 z-10 w-full p-8 text-right">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.45em] text-violet-300">
                    {game.category}
                  </p>

                  <h3 className="text-3xl font-black leading-tight text-white">
                    {game.title}
                  </h3>
                </div>
              </div>

              <div className="p-8">
                <p className="text-base leading-8 text-neutral-400">
                  {game.description}
                </p>

                {game.creator && (
                  <Link
                    href={`/creators/${game.creator.slug}`}
                    className="mt-3 inline-block text-xs text-violet-400 transition hover:text-violet-300"
                  >
                    ساخته‌ی {game.creator.name}
                  </Link>
                )}

                <div className="mt-6 flex items-center gap-3">
                  {game.fileUrl ? (
                    <a
                      href={`/api/download/${game.slug}`}
                      className="group/btn flex flex-1 items-center justify-center gap-2 rounded-full border border-violet-500/30 px-6 py-3 text-sm transition-all duration-300 hover:bg-violet-500/10 hover:shadow-[0_0_30px_rgba(139,92,246,.25)]"
                    >
                      <Download size={16} />
                      دانلود بازی
                      {game.fileSize ? (
                        <span className="text-xs text-neutral-500">
                          ({formatFileSize(game.fileSize)})
                        </span>
                      ) : null}
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-neutral-500"
                    >
                      به‌زودی
                    </button>
                  )}
                </div>

                {game.downloads > 0 && (
                  <p className="mt-3 text-xs text-neutral-500">
                    {game.downloads.toLocaleString("fa-IR")} دانلود
                  </p>
                )}
              </div>
            </article>
          ))}

          {gamesCatalog.length === 0 && (
            <p className="col-span-full py-10 text-center text-neutral-500">
              در حال حاضر بازی‌ای ثبت نشده است.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
