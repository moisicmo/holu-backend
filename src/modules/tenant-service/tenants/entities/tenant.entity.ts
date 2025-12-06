import { Prisma } from "@/generated/prisma/client";

export type TenantType = Prisma.TenantGetPayload<{
  select: typeof TenantSelect;
}>;

export const TenantSelect = {
  id: true,
  template: true,
  notionApiKey: true,
  notionDbId: true,
  name: true,
  image: true,
  colors: true
};