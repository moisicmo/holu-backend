import { Prisma } from "@/generated/prisma/client";

export type PhysicalRecordType = Prisma.PhysicalRecordGetPayload<{
  select: typeof PhysicalRecordTypeSelect;
}>;

export const PhysicalRecordTypeSelect = {
  id: true,
  weightKg: true,
  heightCm: true,
  note: true,
};