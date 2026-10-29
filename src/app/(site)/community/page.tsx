import type { Metadata } from "next";

import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "انجمن",
  description: "انجمن بازیکنان رانباکس",
};

const channels = [
  {
    title: "دیسکورد رانباکس",
    description:
      "به گفتگوهای زنده بپیوندید، آخرین اخبار را دنبال کنید و با سازندگان بازی مستقیم صحبت کنید.",
    cta: "پیوستن به دیسکورد",
  },
  {
    title: "انجمن استیم",
    description:
      "نقد بنویسید، راهنما بسازید و درباره‌ی هر بازی رانباکس با بازیکنان دیگر گفتگو کنید.",
    cta: "مشاهده در استیم",
  },
  {
    title: "برنامه آزمایش‌کنندگان",
    description:
      "پیش از دیگران به نسخه‌های آزمایشی دسترسی داشته باشید و مسیر توسعه‌ی بازی را شکل دهید.",
    cta: "درخواست عضویت",
  },
];

export default function CommunityPage() {
  return (
    <section className="relative overflow-hidden bg-[#050505] pb-32 pt-40">
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[180px]" />

      <Container className="relative z-10">
        <div className="mb-24 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-violet-400">
            انجمن
          </p>

          <h1 className="text-6xl font-black leading-[0.95] md:text-7xl">
            جایی برای
            <br />
            بازیکنان رانباکس
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
            بیش از دو میلیون بازیکن در سراسر جهان بخشی از انجمن رانباکس
            هستند. به یکی از کانال‌های زیر بپیوندید و صدای شما در آینده‌ی
            بازی‌های ما شنیده می‌شود.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {channels.map((channel) => (
            <div
              key={channel.title}
              className="flex flex-col items-start justify-between gap-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:flex-row md:items-center"
            >
              <div>
                <h3 className="text-2xl font-bold">{channel.title}</h3>

                <p className="mt-3 max-w-xl text-base leading-8 text-neutral-400">
                  {channel.description}
                </p>
              </div>

              <button className="shrink-0 rounded-full border border-violet-500/30 px-6 py-3 text-sm transition duration-300 hover:bg-violet-500/10 hover:shadow-[0_0_40px_rgba(139,92,246,.3)]">
                {channel.cta}
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
