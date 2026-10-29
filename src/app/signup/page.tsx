"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signupAction } from "@/lib/actions/user";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    setLoading(true);

    const result = await signupAction(name, email, password);

    if (result.ok) {
      router.push("/account");
      router.refresh();
    } else {
      setError(result.error ?? "ثبت‌نام ناموفق بود.");
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-600/10 blur-[180px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="text-2xl font-black uppercase tracking-[0.25em] text-white"
          >
            رانباکس
          </Link>

          <p className="mt-3 text-sm text-neutral-500">
            ساخت حساب کاربری جدید
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              نام
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام و نام خانوادگی"
              autoComplete="name"
              className="rounded-2xl border border-white/10 bg-transparent px-5 py-4 text-white placeholder:text-neutral-600 outline-none transition focus:border-violet-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              ایمیل
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
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
              placeholder="حداقل ۶ کاراکتر"
              autoComplete="new-password"
              className="rounded-2xl border border-white/10 bg-transparent px-5 py-4 text-white placeholder:text-neutral-600 outline-none transition focus:border-violet-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              تکرار رمز عبور
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
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
            {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>

          <p className="text-center text-sm text-neutral-500">
            قبلاً حساب ساختی؟{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300">
              وارد شو
            </Link>
          </p>
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
