import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  const monthly = await prisma.invoice.groupBy({ by: ["date"], _sum: { amount: true } });
  return NextResponse.json({ ok: true, monthly });
}