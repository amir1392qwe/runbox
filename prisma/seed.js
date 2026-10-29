const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const creators = [
  {
    slug: "amir-hosseini",
    name: "امیر حسینی",
    role: "طراح بازی و برنامه‌نویس",
    bio: "بنیان‌گذار رانباکس. عاشق مکانیک‌های اکشن سریع و دنیاهای علمی‌تخیلی. سازنده‌ی ضربه سایبری و مسابقه‌دهندگان پوچی.",
    accent: "from-violet-500 to-fuchsia-500",
    games: ["cyber-strike", "void-racers"],
  },
  {
    slug: "sara-karimi",
    name: "سارا کریمی",
    role: "طراح هنری و روایت‌گر",
    bio: "کارگردان هنری استودیو. دنیاهای تاریک و حماسی می‌سازه؛ از سپاه سایه تا افسانه اژدهای آتشین.",
    accent: "from-orange-500 to-pink-500",
    games: ["shadow-legion", "dragons-ember"],
  },
];

const games = [
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

async function main() {
  // ادمین پیش‌فرض
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "runbox1404";
  const hashed = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { username },
    update: {},
    create: { username, password: hashed },
  });

  // بازی‌ها
  for (const game of games) {
    await prisma.game.upsert({
      where: { slug: game.slug },
      update: game,
      create: game,
    });
  }

  // سازنده‌ها + اختصاص بازی‌ها
  for (const creator of creators) {
    const { games: gameSlugs, ...creatorData } = creator;

    const savedCreator = await prisma.creator.upsert({
      where: { slug: creatorData.slug },
      update: creatorData,
      create: creatorData,
    });

    for (const slug of gameSlugs) {
      await prisma.game.updateMany({
        where: { slug },
        data: { creatorId: savedCreator.id },
      });
    }
  }

  console.log("✅ Seed کامل شد. کاربر ادمین:", username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
