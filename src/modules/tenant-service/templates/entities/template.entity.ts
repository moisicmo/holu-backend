import { Prisma } from "@/generated/prisma/client";

export type TemplateType = Prisma.TemplateGetPayload<{
  select: typeof TemplateSelect;
}>;

export const TemplateSelect = {
  id: true,
  name: true,
  type: true,
  tenants: true,
};