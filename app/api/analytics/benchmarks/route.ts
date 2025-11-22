import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  const vendors = await prisma.vendor.findMany({ select: { id: true, name: true } });
  return NextResponse.json({ ok: true, vendors });
}