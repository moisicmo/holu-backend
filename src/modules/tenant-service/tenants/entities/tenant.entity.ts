import { Prisma } from "@/generated/prisma/client";
import { BranchSelect } from "../../branches/entities/branch.entity";

export type TenantType = Prisma.TenantGetPayload<{
  select: typeof TenantSelect;
}>;

export const TenantSelect = {
  id: true,
  // template: true,
  notionApiKey: true,
  notionDbId: true,
  name: true,
  image: true,
  colors: true,
  subdomain: true,
  branches:{
    select: {
      ...BranchSelect
    }
  }
};