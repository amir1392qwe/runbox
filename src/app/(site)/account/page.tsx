import { redirect } from "next/navigation";
import Link from "next/link";

import { getCurrentUser } from "@/lib/actions/user";
import Container from "@/components/ui/Container";
import LogoutButton from "@/components/LogoutButton";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] pb-32 pt-40 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

      <Container className="relative z-10 max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.45em] text-violet-400">
          حساب کاربری
        </p>

        <h1 className="text-5xl font-black">خوش آمدید، {user.name}</h1>

        <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-4">
            <div className="border-b border-white/10 pb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                نام
              </p>
              <p className="mt-2 text-lg">{user.name}</p>
            </div>

            <div className="border-b border-white/10 pb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                ایمیل
              </p>
              <p className="mt-2 text-lg">{user.email}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                عضو از
              </p>
              <p className="mt-2 text-lg">
                {new Date(user.createdAt).toLocaleDateString("fa-IR")}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              href="/games"
              className="rounded-full border border-white/15 px-6 py-3 text-sm transition hover:border-violet-400 hover:bg-violet-500/10"
            >
              مشاهده بازی‌ها
            </Link>

            <LogoutButton />
          </div>
        </div>
      </Container>
    </main>
  );
}
