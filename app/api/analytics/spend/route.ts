import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  const byVendor = await prisma.invoice.groupBy({ by: ["vendorId"], _sum: { amount: true } });
  return NextResponse.json({ ok: true, byVendor });
}