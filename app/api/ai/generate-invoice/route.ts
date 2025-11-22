import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { contractId, services } = body || {};
  if (!contractId) return NextResponse.json({ ok: false, error: "Missing contractId" }, { status: 400 });
  const contract = await prisma.contract.findUnique({ where: { id: contractId } });
  if (!contract) return NextResponse.json({ ok: false, error: "Contract not found" }, { status: 404 });
  const items = (contract.contractJson as any)?.billable_items || [];
  const rows = items.slice(0, Math.max(1, items.length)).map((it: any, idx: number) => ({
    line_number: idx + 1,
    item_description: it.name,
    quantity: 1,
    unit_price: it.rate ?? 0,
    extended_price: (it.rate ?? 0) * 1,
    unit_of_measure: it.unit ?? "unit",
  }));
  return NextResponse.json({ ok: true, invoice: { invoice_header: { total_amount: rows.reduce((a: number, r: any) => a + r.extended_price, 0) }, line_items: rows } });
}