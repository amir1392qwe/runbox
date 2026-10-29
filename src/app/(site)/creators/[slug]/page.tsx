import { notFound } from "next/navigation";
import { Download } from "lucide-react";

import Container from "@/components/ui/Container";
import CreatorAvatar from "@/components/CreatorAvatar";
import GameIcon, { type GameIconId } from "@/components/icons/GameIcons";
import { getCreatorBySlug } from "@/lib/actions/creators";
import { formatFileSize } from "@/lib/format";

export const revalidate = 0;

export default async function CreatorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const creator = await getCreatorBySlug(slug);

  if (!creator) {
    notFound();
  }

  return (
    <section className="relative overflow-hidden bg-[#050505] pb-32 pt-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

      <Container className="relative z-10">
        <div className="mb-16 flex flex-col items-center gap-6 text-center">
          <CreatorAvatar
            name={creator.name}
            accent={creator.accent}
            className="h-28 w-28 text-3xl"
          />

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-violet-300">
              {creator.role}
            </p>
            <h1 className="text-5xl font-black">{creator.name}</h1>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-neutral-400">
            {creator.bio}
          </p>
        </div>

        <h2 className="mb-8 text-xl font-bold">
          بازی‌های ساخته‌شده ({creator.games.length.toLocaleString("fa-IR")})
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {creator.games.map((game) => (
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

                {game.fileUrl ? (
                  <a
                    href={`/api/download/${game.slug}`}
                    className="mt-6 flex items-center justify-center gap-2 rounded-full border border-violet-500/30 px-6 py-3 text-sm transition-all duration-300 hover:bg-violet-500/10"
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
                    className="mt-6 flex w-full cursor-not-allowed items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm text-neutral-500"
                  >
                    به‌زودی
                  </button>
                )}
              </div>
            </article>
          ))}

          {creator.games.length === 0 && (
            <p className="col-span-full py-10 text-center text-neutral-500">
              این سازنده هنوز بازی‌ای منتشر نکرده است.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
