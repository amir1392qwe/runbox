"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Gamepad2, Users, Mail, LogOut, Globe } from "lucide-react";

import { logoutAction } from "@/lib/actions/auth";

const navItems = [
  { title: "داشبورد", href: "/admin", icon: LayoutDashboard },
  { title: "مدیریت بازی‌ها", href: "/admin/games", icon: Gamepad2 },
  { title: "سازنده‌ها", href: "/admin/creators", icon: Users },
  { title: "پیام‌ها", href: "/admin/messages", icon: Mail },
];

interface AdminSidebarProps {
  username: string;
}

export default function AdminSidebar({ username }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col border-l border-white/10 bg-[#080808] p-6">
      <Link
        href="/admin"
        className="mb-1 block text-xl font-black uppercase tracking-[0.25em] text-white"
      >
        رانباکس
        <span className="mr-2 text-xs font-normal tracking-normal text-violet-400">
          ادمین
        </span>
      </Link>

      <p className="mb-8 text-xs text-neutral-600">
        وارد شده به عنوان {username}
      </p>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors duration-200 ${
                active
                  ? "bg-violet-500/15 text-violet-300"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-neutral-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"
        >
          <Globe size={18} />
          مشاهده سایت
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-right text-sm text-red-400 transition-colors duration-200 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          خروج از حساب
        </button>
      </div>
    </aside>
  );
}
