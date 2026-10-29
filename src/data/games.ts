import type { GameIconId } from "@/components/icons/GameIcons";

export interface GameEntry {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  icon: GameIconId;
  accent: string;
}

export const gamesCatalog: GameEntry[] = [
  {
    id: 1,
    slug: "cyber-strike",
    title: "ضربه سایبری",
    category: "اکشن",
    description:
      "یک تیرانداز آینده‌نگرانه در دل شهری نئونی که هر مأموریت با سرعت و واکنش سریع شما سنجیده می‌شود.",
    icon: "cyber",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 2,
    slug: "shadow-legion",
    title: "سپاه سایه",
    category: "نقش‌آفرینی",
    description:
      "در دنیایی تاریک و حماسی، سپاهی از سایه‌ها را رهبری کنید و سرنوشت قلمروهای فراموش‌شده را رقم بزنید.",
    icon: "shadow",
    accent: "from-purple-500 to-indigo-500",
  },
  {
    id: 3,
    slug: "void-racers",
    title: "مسابقه‌دهندگان پوچی",
    category: "مسابقه‌ای",
    description:
      "با سفینه‌های ضدجاذبه در مسیرهای بی‌انتهای فضا رقابت کنید؛ هر پیچ یک تصمیم مرگ و زندگی است.",
    icon: "void",
    accent: "from-cyan-500 to-blue-500",
  },
  {
    id: 4,
    slug: "dragons-ember",
    title: "افسانه اژدهای آتشین",
    category: "ماجراجویی",
    description:
      "همراه اژدهایی افسانه‌ای بر فراز سرزمین‌های سوخته پرواز کنید و رازهای گمشده‌ی آتش ازلی را بیابید.",
    icon: "dragon",
    accent: "from-orange-500 to-pink-500",
  },
  {
    id: 5,
    slug: "starborn-empire",
    title: "امپراتوری ستاره‌ای",
    category: "استراتژی",
    description:
      "امپراتوری کهکشانی خود را از صفر بسازید، ناوگان‌ها را فرماندهی کنید و بر منظومه‌های دوردست حکم برانید.",
    icon: "empire",
    accent: "from-sky-400 to-violet-500",
  },
  {
    id: 6,
    slug: "ghost-duel",
    title: "نبرد ارواح",
    category: "مبارزه‌ای",
    description:
      "در آوردگاهی میان دنیای زندگان و مردگان، روح خود را در نبردهای تن‌به‌تن سریع و بی‌رحمانه محک بزنید.",
    icon: "ghost",
    accent: "from-fuchsia-400 to-cyan-400",
  },
];
