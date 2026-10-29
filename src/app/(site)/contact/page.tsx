import type { Metadata } from "next";

import Container from "@/components/ui/Container";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "با تیم رانباکس در ارتباط باشید",
};

const info = [
  { label: "ایمیل", value: "hello@runbox.studio" },
  { label: "همکاری‌های تجاری", value: "business@runbox.studio" },
  { label: "پشتیبانی", value: "۲۴ ساعته، ۷ روز هفته" },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-[#050505] pb-32 pt-40">
      <div className="pointer-events-none absolute left-1/4 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[180px]" />

      <Container className="relative z-10 grid gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-violet-400">
            تماس با ما
          </p>

          <h1 className="text-6xl font-black leading-[0.95] md:text-7xl">
            بیایید با هم
            <br />
            صحبت کنیم
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-400">
            برای همکاری در پروژه‌ای جدید، پیشنهاد شراکت یا فقط یک سلام
            دوستانه، خوشحال می‌شویم از شما بشنویم.
          </p>

          <div className="mt-12 flex flex-col gap-6">
            {info.map((item) => (
              <div key={item.label} className="border-b border-white/10 pb-4">
                <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                  {item.label}
                </p>
                <p className="mt-2 text-lg text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <ContactForm />
      </Container>
    </section>
  );
}
