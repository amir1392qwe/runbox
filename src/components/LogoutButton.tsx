"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { logoutUserAction } from "@/lib/actions/user";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUserAction();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-full border border-red-500/20 px-6 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
    >
      <LogOut size={16} />
      خروج از حساب
    </button>
  );
}
