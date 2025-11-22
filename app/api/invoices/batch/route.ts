import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { validateValidationRequest } from "../../../../lib/ajv";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!Array.isArray(body)) return NextResponse.json({ ok: false, error: "Expected array" }, { status: 400 });
  const results: { index: number; ok: boolean; id?: string; errors?: unknown }[] = [];
  for (let i = 0; i < body.length; i++) {
    const item = body[i];
    const { valid, errors } = validateValidationRequest({ validation_request: { invoice_data: item } });
    if (!valid) {
      results.push({ index: i, ok: false, errors });
      continue;
    }
    const rec = await prisma.invoice.create({ data: { normalized: item } });
    results.push({ index: i, ok: true, id: rec.id });
  }
  return NextResponse.json({ ok: true, results });
}