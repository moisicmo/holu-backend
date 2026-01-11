import { Prisma } from "@/generated/prisma/client";

export type RadioCategoryType = Prisma.RadioCategoryGetPayload<{
  select: typeof RadioCategorySelect;
}>;

export const RadioCategorySelect = {
  id: true,
  name: true,
};

