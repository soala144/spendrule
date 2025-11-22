import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const ex = await prisma.exception.findUnique({ where: { id: params.id } });
  if (!ex) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, data: ex });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const ex = await prisma.exception.update({ where: { id: params.id }, data: body });
  return NextResponse.json({ ok: true, data: ex });
}