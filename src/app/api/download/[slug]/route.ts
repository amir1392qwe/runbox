import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/actions/user";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const user = await getCurrentUser();

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `/games`);
    return NextResponse.redirect(loginUrl);
  }

  const game = await prisma.game.findUnique({ where: { slug } });

  if (!game || !game.fileUrl || !game.fileName) {
    return NextResponse.json(
      { error: "فایلی برای این بازی موجود نیست." },
      { status: 404 }
    );
  }

  const filePath = path.join(process.cwd(), "public", game.fileUrl);

  let bytes: Buffer;
  try {
    bytes = await readFile(filePath);
  } catch {
    return NextResponse.json(
      { error: "فایل روی سرور پیدا نشد." },
      { status: 404 }
    );
  }

  await prisma.game.update({
    where: { id: game.id },
    data: { downloads: { increment: 1 } },
  });

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(
        game.fileName
      )}"`,
      "Content-Length": String(bytes.length),
    },
  });
}
