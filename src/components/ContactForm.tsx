"use client";

import { useState, type FormEvent } from "react";

import { sendMessage } from "@/lib/actions/messages";

const inputClass =
  "rounded-2xl border border-white/10 bg-transparent px-5 py-4 text-white placeholder:text-neutral-600 outline-none transition focus:border-violet-400";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("sending");

    const result = await sendMessage({ name, email, content });

    if (result.ok) {
      setName("");
      setEmail("");
      setContent("");
      setStatus("done");
    } else {
      setError(result.error ?? "ارسال پیام ناموفق بود.");
      setStatus("idle");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">
          نام شما
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="نام و نام خانوادگی"
          className={inputClass}
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
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">
          پیام شما
        </label>
        <textarea
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="درباره‌ی پروژه‌تان بنویسید..."
          className={`resize-none ${inputClass}`}
        />
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {status === "done" && (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          پیام شما ثبت شد. به‌زودی با شما تماس می‌گیریم.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 rounded-full border border-violet-500/30 px-8 py-4 transition duration-300 hover:bg-violet-500/10 hover:shadow-[0_0_40px_rgba(139,92,246,.3)] disabled:opacity-50"
      >
        {status === "sending" ? "در حال ارسال..." : "ارسال پیام"}
      </button>
    </form>
  );
}
