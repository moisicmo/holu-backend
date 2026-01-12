import { Prisma } from '@/generated/prisma/client';

export type PlanType = Prisma.PlanGetPayload<{
  select: typeof PlanSelect;
}>;

export const PlanScheduleSelect = {
  id: true,
  dayOfWeek: true,
  startTime: true,
  endTime: true,
}

export const PlanSelect = {
  id: true,
  name: true,
  description: true,
  price: true,
  duration: true,
  accessDays: true,
  schedules: {
    select: PlanScheduleSelect
  }
};