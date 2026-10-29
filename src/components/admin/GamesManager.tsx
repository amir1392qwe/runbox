"use client";

import { useRef, useState, useTransition } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  X,
  UploadCloud,
  FileArchive,
} from "lucide-react";
import type { Game } from "@prisma/client";

import GameIcon, {
  gameIconMap,
  type GameIconId,
} from "@/components/icons/GameIcons";
import {
  createGame,
  updateGame,
  deleteGame,
  resetGames,
  uploadGameFile,
  removeGameFile,
  type GameInput,
} from "@/lib/actions/games";
import { formatFileSize } from "@/lib/format";

const iconOptions = Object.keys(gameIconMap) as GameIconId[];

const emptyForm: GameInput = {
  title: "",
  slug: "",
  category: "",
  description: "",
  icon: "cyber",
  accent: "from-violet-500 to-fuchsia-500",
  creatorId: null,
};

interface CreatorOption {
  id: number;
  name: string;
}

export default function GamesManager({
  initialGames,
  creators = [],
}: {
  initialGames: Game[];
  creators?: CreatorOption[];
}) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<GameInput>(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({});

  const handleFileSelect = (game: Game, fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file) return;

    setUploadError("");
    setUploadingId(game.id);

    const formData = new FormData();
    formData.set("file", file);

    startTransition(async () => {
      const result = await uploadGameFile(game.id, formData);

      if (result.ok && result.game) {
        setGames((prev) =>
          prev.map((g) => (g.id === game.id ? result.game! : g))
        );
      } else {
        setUploadError(result.error ?? "آپلود ناموفق بود.");
      }

      setUploadingId(null);
    });
  };

  const handleRemoveFile = (game: Game) => {
    startTransition(async () => {
      const result = await removeGameFile(game.id);
      if (result.ok && result.game) {
        setGames((prev) =>
          prev.map((g) => (g.id === game.id ? result.game! : g))
        );
      }
    });
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (game: Game) => {
    setEditingId(game.id);
    setForm({
      title: game.title,
      slug: game.slug,
      category: game.category,
      description: game.description,
      icon: game.icon as GameIconId,
      accent: game.accent,
      creatorId: game.creatorId ?? null,
    });
    setFormOpen(true);
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;

    startTransition(async () => {
      if (editingId === null) {
        const created = await createGame({
          ...form,
          slug: form.slug || slugify(form.title),
        });
        setGames((prev) => [...prev, created]);
      } else {
        const updated = await updateGame(editingId, form);
        setGames((prev) =>
          prev.map((g) => (g.id === editingId ? updated : g))
        );
      }

      setFormOpen(false);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteGame(id);
      setGames((prev) => prev.filter((g) => g.id !== id));
    });
  };

  const handleReset = () => {
    startTransition(async () => {
      const fresh = await resetGames();
      setGames(fresh);
    });
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">مدیریت محتوا · دیتابیس</p>
          <h1 className="mt-2 text-4xl font-black">بازی‌ها</h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            disabled={isPending}
            className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-neutral-400 transition hover:border-white/30 hover:text-white disabled:opacity-50"
          >
            <RotateCcw size={16} />
            بازنشانی پیش‌فرض
          </button>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-full border border-violet-500/30 px-5 py-3 text-sm transition hover:bg-violet-500/10"
          >
            <Plus size={16} />
            بازی جدید
          </button>
        </div>
      </div>

      {uploadError && (
        <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {uploadError}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {games.map((game) => (
          <div
            key={game.id}
            className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-xl"
          >
            <div className="relative aspect-[16/9]">
              <GameIcon
                id={game.icon as GameIconId}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>

            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-violet-300">
                {game.category}
              </p>
              <h3 className="mt-2 text-lg font-bold">{game.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
                {game.description}
              </p>

              {game.creatorId && (
                <p className="mt-2 text-xs text-neutral-500">
                  سازنده:{" "}
                  {creators.find((c) => c.id === game.creatorId)?.name ??
                    "—"}
                </p>
              )}

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => openEdit(game)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 py-2 text-sm transition hover:border-violet-400 hover:bg-violet-500/10"
                >
                  <Pencil size={14} />
                  ویرایش
                </button>

                <button
                  onClick={() => handleDelete(game.id)}
                  disabled={isPending}
                  className="flex items-center justify-center rounded-full border border-red-500/20 px-3 py-2 text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-dashed border-white/15 p-3">
                <input
                  ref={(el) => {
                    fileInputs.current[game.id] = el;
                  }}
                  type="file"
                  accept=".zip,.rar,.7z,.exe"
                  onChange={(e) => handleFileSelect(game, e.target.files)}
                  className="hidden"
                />

                {game.fileUrl ? (
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2 text-xs text-neutral-400">
                      <FileArchive size={14} className="shrink-0 text-violet-400" />
                      <span className="truncate">{game.fileName}</span>
                      {game.fileSize ? (
                        <span className="shrink-0 text-neutral-600">
                          ({formatFileSize(game.fileSize)})
                        </span>
                      ) : null}
                    </div>

                    <button
                      onClick={() => handleRemoveFile(game)}
                      disabled={isPending}
                      className="shrink-0 text-xs text-red-400 transition hover:text-red-300 disabled:opacity-50"
                    >
                      حذف
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputs.current[game.id]?.click()}
                    disabled={uploadingId === game.id}
                    className="flex w-full items-center justify-center gap-2 text-xs text-neutral-400 transition hover:text-violet-300 disabled:opacity-50"
                  >
                    <UploadCloud size={14} />
                    {uploadingId === game.id
                      ? "در حال آپلود..."
                      : "آپلود فایل بازی (zip, rar, 7z, exe)"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {games.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-neutral-500">
            هنوز بازی‌ای در دیتابیس ثبت نشده است.
          </p>
        )}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#0a0a0a] p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId === null ? "افزودن بازی جدید" : "ویرایش بازی"}
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
                  عنوان بازی
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-violet-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  دسته‌بندی
                </label>
                <input
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-violet-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  توضیحات
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="resize-none rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:border-violet-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  سازنده
                </label>
                <select
                  value={form.creatorId ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      creatorId: e.target.value ? Number(e.target.value) : null,
                    }))
                  }
                  className="rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none focus:border-violet-400"
                >
                  <option value="">بدون سازنده</option>
                  {creators.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  آیکن
                </label>
                <div className="flex flex-wrap gap-3">
                  {iconOptions.map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, icon: id }))}
                      className={`h-14 w-14 overflow-hidden rounded-xl border transition ${
                        form.icon === id
                          ? "border-violet-400 ring-2 ring-violet-400/40"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <GameIcon id={id} className="h-full w-full" />
                    </button>
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
                {editingId === null ? "افزودن بازی" : "ذخیره تغییرات"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function slugify(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}
