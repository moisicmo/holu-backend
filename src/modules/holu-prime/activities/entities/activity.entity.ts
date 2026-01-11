import { Prisma } from "@/generated/prisma/client";

export type DailyActivityType = Prisma.DailyActivityGetPayload<{
  select: typeof DailyActivitySelect;
}>;

export const ActivityProgress = {
  id: true,
  status: true,
  progressDate: true,
}

export const DailyActivitySelect = {
  id: true,
  title: true,
  time: true,
  progress: {
    select: ActivityProgress
  },
};