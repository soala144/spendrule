import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const ex = await prisma.exception.findUnique({ where: { id } });
  if (!ex) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, data: ex });
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const body = await req.json();
  const { id } = await context.params;
  const ex = await prisma.exception.update({ where: { id }, data: body });
  return NextResponse.json({ ok: true, data: ex });
}