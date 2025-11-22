import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  const list = await prisma.exception.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, data: list });
}