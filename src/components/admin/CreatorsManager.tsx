"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

import CreatorAvatar from "@/components/CreatorAvatar";
import {
  createCreator,
  updateCreator,
  deleteCreator,
  type CreatorInput,
} from "@/lib/actions/creators";

type CreatorWithCount = CreatorInput & {
  id: number;
  _count: { games: number };
};

const accentOptions = [
  "from-violet-500 to-fuchsia-500",
  "from-cyan-500 to-blue-500",
  "from-orange-500 to-pink-500",
  "from-emerald-400 to-cyan-500",
  "from-sky-400 to-violet-500",
  "from-fuchsia-400 to-cyan-400",
];

const emptyForm: CreatorInput = {
  name: "",
  slug: "",
  role: "",
  bio: "",
  accent: accentOptions[0],
};

export default function CreatorsManager({
  initialCreators,
}: {
  initialCreators: CreatorWithCount[];
}) {
  const [creators, setCreators] = useState(initialCreators);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<CreatorInput>(emptyForm);
  const [isPending, startTransition] = useTransition();

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (creator: CreatorWithCount) => {
    setEditingId(creator.id);
    setForm({
      name: creator.name,
      slug: creator.slug,
      role: creator.role,
      bio: creator.bio,
      accent: creator.accent,
    });
    setFormOpen(true);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;

    startTransition(async () => {
      if (editingId === null) {
        const created = await createCreator({
          ...form,
          slug: form.slug || slugify(form.name),
        });
        setCreators((prev) => [...prev, { ...created, _count: { games: 0 } }]);
      } else {
        const updated = await updateCreator(editingId, form);
        setCreators((prev) =>
          prev.map((c) =>
            c.id === editingId ? { ...c, ...updated } : c
          )
        );
      }

      setFormOpen(false);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteCreator(id);
      setCreators((prev) => prev.filter((c) => c.id !== id));
    });
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">مدیریت محتوا · دیتابیس</p>
          <h1 className="mt-2 text-4xl font-black">سازنده‌ها</h1>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full border border-violet-500/30 px-5 py-3 text-sm transition hover:bg-violet-500/10"
        >
          <Plus size={16} />
          سازنده جدید
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <CreatorAvatar
                name={creator.name}
                accent={creator.accent}
                className="h-14 w-14 text-lg"
              />
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold">{creator.name}</h3>
                <p className="text-xs uppercase tracking-[0.3em] text-violet-300">
                  {creator.role}
                </p>
              </div>
            </div>

            <p className="mt-4 line-clamp-2 text-sm text-neutral-400">
              {creator.bio}
            </p>

            <p className="mt-3 text-xs text-neutral-500">
              {creator._count.games.toLocaleString("fa-IR")} بازی ·{" "}
              <code className="text-neutral-600">/creators/{creator.slug}</code>
            </p>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => openEdit(creator)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 py-2 text-sm transition hover:border-violet-400 hover:bg-violet-500/10"
              >
                <Pencil size={14} />
                ویرایش
              </button>

              <button
                onClick={() => handleDelete(creator.id)}
                disabled={isPending}
                className="flex items-center justify-center rounded-full border border-red-500/20 px-3 py-2 text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {creators.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-neutral-500">
            هنوز سازنده‌ای ثبت نشده است.
          </p>
        )}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#0a0a0a] p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId === null ? "افزودن سازنده جدید" : "ویرایش سازنده"}
              </h2>
              <button
                onClick={() => setFormOpen(false)}
                className="text-neutral-500 transition hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  نام
                </label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-violet-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  نقش / تخصص
                </label>
                <input
                  value={form.role}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, role: e.target.value }))
                  }
                  placeholder="مثلاً طراح بازی، برنامه‌نویس، هنرمند"
                  className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-violet-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  بیوگرافی
                </label>
                <textarea
                  rows={4}
                  value={form.bio}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, bio: e.target.value }))
                  }
                  className="resize-none rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-violet-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  رنگ آواتار
                </label>
                <div className="flex flex-wrap gap-3">
                  {accentOptions.map((accent) => (
                    <button
                      key={accent}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, accent }))}
                      className={`h-10 w-10 rounded-full bg-gradient-to-br ${accent} border-2 transition ${
                        form.accent === accent
                          ? "border-white"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setFormOpen(false)}
                className="flex-1 rounded-full border border-white/15 py-3 text-sm text-neutral-400 transition hover:text-white"
              >
                انصراف
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="flex-1 rounded-full border border-violet-500/30 py-3 text-sm transition hover:bg-violet-500/10 disabled:opacity-50"
              >
                {editingId === null ? "افزودن سازنده" : "ذخیره تغییرات"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}
