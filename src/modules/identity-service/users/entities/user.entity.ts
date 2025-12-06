import { Prisma } from '@/generated/prisma/client';
import { RoleSelect } from '@/modules/identity-service/roles/entities/role.entity';

export type UserType = Prisma.UserGetPayload<{
  select: typeof UserSelect;
}>;

export const UserSelect = {
  id: true,
  image: true,
  numberDocument: true,
  typeDocument: true,
  name: true,
  lastName: true,
  gender: true,
  email: true,
  birthDate: true,
  authProviders: true
};

export const UserRoleSelect = {
  id: true,
  user: { select: UserSelect },
  role: { select: RoleSelect },
  branchId: true,
}