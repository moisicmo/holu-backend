import { Prisma } from '@/generated/prisma/client';

export type UserHabitType = Prisma.UserHabitGetPayload<{
  select: typeof UserHabitSelect;
}>;

export const HabitProgressSelect = {
  id: true,
  status: true,
  progressDate: true,
}

export const UserHabitSelect = {
  id: true,
  userId: true,
  title: true,
  type: true,
  progress: {
    select: HabitProgressSelect
  },
};