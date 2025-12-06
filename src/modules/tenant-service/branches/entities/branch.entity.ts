import { Prisma } from "@/generated/prisma/client";

export type BranchType = Prisma.BranchGetPayload<{
  select: typeof BranchSelect;
}>;

export const BranchSelect = {
  id: true,
  tenant: true,
  name: true,
  address: true,
  phone: true,
  schedule: true
};