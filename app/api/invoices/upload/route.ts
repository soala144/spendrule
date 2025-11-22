import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { validateValidationRequest } from "../../../../lib/ajv";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { valid, errors } = validateValidationRequest({ validation_request: { invoice_data: body } });
  if (!valid) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }
  const record = await prisma.invoice.create({ data: { normalized: body } });
  return NextResponse.json({ ok: true, id: record.id });
}