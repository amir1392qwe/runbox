import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/ui/Container";
import CreatorAvatar from "@/components/CreatorAvatar";
import { listCreators } from "@/lib/actions/creators";

export const metadata: Metadata = {
  title: "سازنده‌ها",
  description: "تیم سازندگان بازی‌های رانباکس",
};

export const revalidate = 0;

export default async function CreatorsPage() {
  const creators = await listCreators();

  return (
    <section className="relative overflow-hidden bg-[#050505] pb-32 pt-40">
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[180px]" />

      <Container className="relative z-10">
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-violet-400">
            سازنده‌ها
          </p>

          <h1 className="text-6xl font-black leading-[0.95] md:text-7xl">
            آدم‌های پشت
            <br />
            بازی‌ها
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
            هر بازی رانباکس دست‌ساز یک یا چند نفره. با سازنده‌ها آشنا شو و
            بازی‌هایی که ساختن رو ببین.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {creators.map((creator) => (
            <Link
              key={creator.id}
              href={`/creators/${creator.slug}`}
              className="group flex flex-col items-center rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl transition duration-300 hover:border-violet-400/40 hover:bg-white/[0.05]"
            >
              <CreatorAvatar
                name={creator.name}
                accent={creator.accent}
                className="h-20 w-20 text-2xl"
              />

              <h3 className="mt-5 text-xl font-bold text-white">
                {creator.name}
              </h3>

              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-violet-300">
                {creator.role}
              </p>

              <p className="mt-4 line-clamp-2 text-sm leading-7 text-neutral-400">
                {creator.bio}
              </p>

              <span className="mt-5 text-xs text-neutral-500">
                {creator._count.games.toLocaleString("fa-IR")} بازی
              </span>
            </Link>
          ))}

          {creators.length === 0 && (
            <p className="col-span-full py-10 text-center text-neutral-500">
              هنوز سازنده‌ای ثبت نشده است.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
