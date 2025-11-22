import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export async function auditLog(params: { actorId?: string | null; entityType: string; entityId?: string; action: string; input?: unknown; output?: unknown; risk?: string; summary?: string; exceptionIds?: string[] }) {
  const metadata: Prisma.InputJsonValue = {
    input: (params.input as Prisma.InputJsonValue) ?? null,
    output: (params.output as Prisma.InputJsonValue) ?? null,
    risk: params.risk ?? null,
    summary: params.summary ?? null,
    exceptionIds: (params.exceptionIds as Prisma.InputJsonValue) ?? null,
  };
  await prisma.auditLog.create({ data: { actorId: params.actorId || null, entityType: params.entityType, entityId: params.entityId || "", action: params.action, metadata } });
}