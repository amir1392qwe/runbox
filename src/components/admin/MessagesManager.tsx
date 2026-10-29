"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import type { Message } from "@prisma/client";

import { deleteMessage } from "@/lib/actions/messages";

export default function MessagesManager({
  initialMessages,
}: {
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    });
  };

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm text-neutral-500">مدیریت محتوا · دیتابیس</p>
        <h1 className="mt-2 text-4xl font-black">پیام‌های تماس</h1>
      </div>

      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold">{message.name}</p>
                <p className="text-sm text-neutral-500">{message.email}</p>
              </div>

              <button
                onClick={() => handleDelete(message.id)}
                disabled={isPending}
                className="flex items-center justify-center rounded-full border border-red-500/20 p-2 text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-7 text-neutral-300">
              {message.content}
            </p>

            <p className="mt-4 text-xs text-neutral-600">
              {new Date(message.createdAt).toLocaleString("fa-IR")}
            </p>
          </div>
        ))}

        {messages.length === 0 && (
          <p className="py-10 text-center text-sm text-neutral-500">
            هنوز پیامی دریافت نشده است.
          </p>
        )}
      </div>
    </div>
  );
}
