import { Prisma } from "@/generated/prisma/client";

export type BranchType = Prisma.BranchGetPayload<{
  select: typeof BranchSelect;
}>;

export const BranchSelect = {
  id: true,
  // tenant: true,
  name: true,
  city: true,
  zone: true,
  detail: true,
  latitude: true,
  longitude: true,
  phone: true,
  schedule: true
};