import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { validateValidationRequest } from "../../../lib/ajv";
import { auditLog } from "../../../lib/audit";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { invoiceId, contractId, invoice } = body || {};
  let inv = invoice;
  if (invoiceId) {
    inv = await prisma.invoice.findUnique({ where: { id: invoiceId } }).then((r: { normalized?: unknown } | null) => r?.normalized);
  }
  if (!inv) return NextResponse.json({ ok: false, error: "Missing invoice" }, { status: 400 });
  const { valid, errors } = validateValidationRequest({ validation_request: { invoice_data: inv } });
  if (!valid) {
    await auditLog({ entityType: "Invoice", entityId: invoiceId, action: "validation_failed", input: inv, output: { errors } });
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }
  const result = {
    pricing_validation: "pending",
    billable_item_match: "pending",
    aggregation_validation: "pending",
    service_requirement_status: "pending",
    allowed_variance: "pending",
    final_confidence: 0.0,
  };
  await auditLog({ entityType: "Invoice", entityId: invoiceId, action: "validated", input: inv, output: { validation_result: result }, summary: "structure OK" });
  return NextResponse.json({ ok: true, validation_result: result });
}