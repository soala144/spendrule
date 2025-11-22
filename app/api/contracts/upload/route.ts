import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { validateContractSphere } from "../../../../lib/ajv";
import { auditLog } from "../../../../lib/audit";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { valid, errors } = validateContractSphere(body);
  if (!valid) {
    await auditLog({ entityType: "Contract", action: "upload_failed", input: body, output: { errors } });
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }
  const record = await prisma.contract.create({ data: { contractJson: body } });
  await auditLog({ entityType: "Contract", entityId: record.id, action: "upload", input: body, output: { id: record.id } });
  return NextResponse.json({ ok: true, id: record.id });
}