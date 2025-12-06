import { Prisma } from "@/generated/prisma/client";
import { RoleSelect } from "@/modules/identity-service/roles/entities/role.entity";
import { BranchSelect } from "@/modules/tenant-service/branches/entities/branch.entity";


export type UserEntity = Prisma.UserGetPayload<{
  select: typeof UserSelect;
}>;

export const UserSelect = {
  id: true,
  numberDocument: true,
  typeDocument: true,
  name: true,
  lastName: true,
  authProviders: { select: { email: true } },
  roles: { select: { role: { select: RoleSelect }, branch: { select: BranchSelect } } },
};