import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { validateContractSphere } from "../../../../lib/ajv";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { valid, errors } = validateContractSphere(body);
  if (!valid) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }
  const record = await prisma.contract.create({ data: { contractJson: body } });
  return NextResponse.json({ ok: true, id: record.id });
}