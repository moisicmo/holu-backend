import { Prisma } from '@/generated/prisma/client';
import { PermissionSelect } from '@/modules/identity-service/permissions/entities/permission.entity';

export type RoleType = Prisma.RoleGetPayload<{
  select: typeof RoleSelect;
}>;
export const RoleSelect = {
  id: true,
  tenantId: true,
  name: true,
  permissions: {
    select: PermissionSelect
  }
};