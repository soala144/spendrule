import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { validateValidationRequest } from "../../../../lib/ajv";
import { auditLog } from "../../../../lib/audit";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { valid, errors } = validateValidationRequest({ validation_request: { invoice_data: body } });
  if (!valid) {
    await auditLog({ entityType: "Invoice", action: "upload_failed", input: body, output: { errors } });
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }
  const record = await prisma.invoice.create({ data: { normalized: body } });
  await auditLog({ entityType: "Invoice", entityId: record.id, action: "upload", input: body, output: { id: record.id } });
  return NextResponse.json({ ok: true, id: record.id });
}