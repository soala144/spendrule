import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, rawInvoice: invoice.raw, normalized: invoice.normalized, validation: invoice.validation });
}