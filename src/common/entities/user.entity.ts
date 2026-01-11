import { Prisma } from "@/generated/prisma/client";
import { RoleSelect } from "@/modules/identity-service/roles/entities/role.entity";


export type UserEntity = Prisma.UserGetPayload<{
  select: typeof UserSelect;
}>;

export const UserRole = {
  id: true,
  role: {
    select: RoleSelect,
  }
}

export const UserSelect = {
  id: true,
  image: true,
  numberDocument: true,
  typeDocument: true,
  name: true,
  lastName: true,
  gender: true,
  email: true,
  authProviders: { select: { email: true } },
  roles: {
    select: UserRole
  }
};