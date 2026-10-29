"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginAction } from "@/lib/actions/auth";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginAction(username, password);

    if (result.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(result.error ?? "نام کاربری یا رمز عبور اشتباه است.");
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="text-2xl font-black uppercase tracking-[0.25em] text-white"
          >
            رانباکس
          </Link>

          <p className="mt-3 text-sm text-neutral-500">
            ورود به پنل مدیریت
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              نام کاربری
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              className="rounded-2xl border border-white/10 bg-transparent px-5 py-4 text-white placeholder:text-neutral-600 outline-none transition focus:border-violet-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="rounded-2xl border border-white/10 bg-transparent px-5 py-4 text-white placeholder:text-neutral-600 outline-none transition focus:border-violet-400"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full border border-violet-500/30 px-8 py-4 text-sm transition duration-300 hover:bg-violet-500/10 hover:shadow-[0_0_40px_rgba(139,92,246,.3)] disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>

        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-neutral-500 transition hover:text-white"
          >
            بازگشت به سایت
          </Link>
        </div>
      </div>
    </main>
  );
}
