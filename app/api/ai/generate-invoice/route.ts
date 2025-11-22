import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { validateValidationRequest } from "../../../../lib/ajv";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { contractId } = body || {};
  if (!contractId) return NextResponse.json({ ok: false, error: "Missing contractId" }, { status: 400 });
  const contract = await prisma.contract.findUnique({ where: { id: contractId } });
  if (!contract) return NextResponse.json({ ok: false, error: "Contract not found" }, { status: 404 });
  const items = (contract.contractJson as unknown as { billable_items?: { name?: string; unit?: string; rate?: number }[] })?.billable_items || [];
  const chosen: { name?: string; unit?: string; rate?: number }[] = items.length ? items : [{ name: "Service", unit: "unit", rate: 0 }];
  const line_items = chosen.map((it: { name?: string; unit?: string; rate?: number }, idx: number) => ({
    line_number: idx + 1,
    item_description: it.name,
    quantity: 1,
    unit_price: it.rate ?? 0,
    extended_price: (it.rate ?? 0) * 1,
    unit_of_measure: it.unit ?? "unit",
    aggregation_type: "single_item",
    aggregation_method: "sum",
    base_calculation: {
      formula: `extended_price = unit_price * quantity (${it.rate ?? 0} * 1)`,
      total_units: 1,
      base_amount: it.rate ?? 0,
    },
  }));
  const total_amount = line_items.reduce((a: number, r: { extended_price: number }) => a + r.extended_price, 0);
  const invoice_header = {
    invoice_id: `INV-${Date.now()}`,
    vendor_party_id: "00000000-0000-0000-0000-000000000001",
    customer_party_id: "00000000-0000-0000-0000-000000000002",
    invoice_date: new Date().toISOString().slice(0, 10),
    total_amount,
    currency: "USD",
    service_period: { start_date: new Date().toISOString().slice(0, 10), end_date: new Date().toISOString().slice(0, 10) },
    billing_aggregation_level: "line_item",
  };
  const invoice_data = { invoice_header, line_items };
  const { valid, errors } = validateValidationRequest({ validation_request: { invoice_data } });
  if (!valid) return NextResponse.json({ ok: false, errors }, { status: 400 });
  return NextResponse.json({ ok: true, draft_invoice: invoice_data });
}