import { Prisma } from "@/generated/prisma/client";

export type RadioType = Prisma.RadioGetPayload<{
  select: typeof RadioSelect;
}>;

export const RadioSelect = {
  id: true,
  category: true,
  stationUUID: true,
  name: true,
  url: true,
  resolvedUrl: true,
  image: true,
  description: true,
  bitrate: true,
  codec: true,
  isHls: true,
  isOnline: true,
  lastCheck: true,
  lastCheckOk: true,
};

