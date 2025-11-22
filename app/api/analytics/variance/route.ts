import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  const bySeverity = await prisma.exception.groupBy({ by: ["severity"], _count: { _all: true } });
  const byType = await prisma.exception.groupBy({ by: ["type"], _count: { _all: true } });
  return NextResponse.json({ ok: true, bySeverity, byType });
}