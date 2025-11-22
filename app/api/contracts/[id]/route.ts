import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const contract = await prisma.contract.findUnique({ where: { id } });
  if (!contract) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  const cj = contract.contractJson as unknown as {
    billable_items?: unknown[];
    pricing_models?: unknown[];
    service_requirements?: unknown[];
    locations?: unknown[];
  };
  const meta = {
    billable_items: Array.isArray(cj.billable_items) ? cj.billable_items.length : 0,
    pricing_models: Array.isArray(cj.pricing_models) ? cj.pricing_models.length : 0,
    service_requirements: Array.isArray(cj.service_requirements) ? cj.service_requirements.length : 0,
    locations: Array.isArray(cj.locations) ? cj.locations.length : 0,
  };
  return NextResponse.json({ ok: true, contract: contract.contractJson, meta });
}