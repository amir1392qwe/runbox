import Link from "next/link";
import { Gamepad2, Users, Star, MessageCircle } from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [gameCount, games, messageCount] = await Promise.all([
    prisma.game.count(),
    prisma.game.findMany({ orderBy: { id: "asc" }, take: 5 }),
    prisma.message.count(),
  ]);

  const stats = [
    { label: "تعداد بازی‌ها", value: gameCount, icon: Gamepad2 },
    { label: "بازیکنان جهانی", value: "۲.۴ میلیون", icon: Users },
    { label: "میانگین امتیاز", value: "۴.۹ / ۵", icon: Star },
    { label: "پیام‌های دریافتی", value: messageCount, icon: MessageCircle },
  ];

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm text-neutral-500">خوش آمدید</p>
        <h1 className="mt-2 text-4xl font-black">داشبورد مدیریت</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <Icon size={22} className="text-violet-400" />
              <p className="mt-4 text-3xl font-black">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-neutral-500">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-[24px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">آخرین بازی‌های ثبت‌شده</h2>
          <Link
            href="/admin/games"
            className="text-sm text-violet-400 transition hover:text-violet-300"
          >
            مدیریت همه بازی‌ها ←
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-white/10">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="font-semibold">{game.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {game.category}
                </p>
              </div>
            </div>
          ))}

          {games.length === 0 && (
            <p className="py-6 text-center text-sm text-neutral-500">
              هنوز بازی‌ای ثبت نشده است.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
