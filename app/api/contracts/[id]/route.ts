import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const contract = await prisma.contract.findUnique({ where: { id } });
  if (!contract) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  const meta = {
    billable_items: Array.isArray((contract.contractJson as any)?.billable_items) ? (contract.contractJson as any).billable_items.length : 0,
    pricing_models: Array.isArray((contract.contractJson as any)?.pricing_models) ? (contract.contractJson as any).pricing_models.length : 0,
    service_requirements: Array.isArray((contract.contractJson as any)?.service_requirements) ? (contract.contractJson as any).service_requirements.length : 0,
    locations: Array.isArray((contract.contractJson as any)?.locations) ? (contract.contractJson as any).locations.length : 0,
  };
  return NextResponse.json({ ok: true, contract: contract.contractJson, meta });
}