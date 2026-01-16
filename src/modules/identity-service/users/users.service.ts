import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserSelect } from './entities/user.entity';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { provider, ...rest } = createUserDto;

    const normalizedEmail = rest.email.toLowerCase();

    try {
      // Buscar usuario existente (incluyendo inactivos)
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: normalizedEmail,
          authProviders: {
            some: {
              email: normalizedEmail,
              provider: String(provider),
            }
          }
        },
        include: {
          authProviders: true,
        },
      });

      // Si el usuario existe y está ACTIVO
      if (existingUser && existingUser.active) {
        throw new BadRequestException('El usuario ya existe');
      }

      // Si el usuario existe pero está INACTIVO, reactivarlo
      if (existingUser && !existingUser.active) {
        // Reactivar usuario
        await this.prisma.user.update({
          where: { id: existingUser.id },
          data: {
            active: true,
            updatedAt: new Date(),
            // Actualizar datos si es necesario
            ...(rest.name && { name: rest.name }),
            ...(rest.lastName && { lastName: rest.lastName }),
            ...(rest.image && { image: rest.image }),
            // Solo actualizar password si se proporciona uno nuevo
            ...(rest.password && {
              password: bcrypt.hashSync(rest.password, bcrypt.genSaltSync(10))
            }),
          },
        });

        // Verificar y actualizar authProvider si es necesario
        const existingAuthProvider = existingUser.authProviders.find(
          ap => ap.provider === String(provider) && ap.email === normalizedEmail
        );

        if (existingAuthProvider && !existingAuthProvider.active) {
          await this.prisma.authProvider.update({
            where: { id: existingAuthProvider.id },
            data: {
              active: true,
              verified: true,
              updatedAt: new Date(),
            },
          });
        }

        // Retornar usuario reactivado
        const reactivatedUser = await this.findOne(existingUser.id);
        return {
          ...reactivatedUser,
          reactivated: true,
          message: 'Usuario reactivado exitosamente'
        };
      }

      // Si no existe, crear nuevo usuario
      const salt = bcrypt.genSaltSync(10);

      const user = await this.prisma.user.create({
        data: {
          ...rest,
          email: normalizedEmail, // Asegurar email normalizado
          password: bcrypt.hashSync(rest.password, salt),
          createdBy: normalizedEmail,
          active: true,
        },
      });

      await this.prisma.authProvider.create({
        data: {
          userId: user.id,
          provider: String(provider),
          email: normalizedEmail,
          verified: true,
          active: true,
          createdBy: normalizedEmail,
        }
      });

      const newUser = await this.findOne(user.id);
      return {
        ...newUser,
        reactivated: false,
        message: 'Usuario creado exitosamente'
      };

    } catch (error) {
      console.error('❌ Error en UserService.create():', error);

      // Manejar errores específicos de Prisma
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // Violación de constraint única
          throw new BadRequestException('El email ya está registrado');
        }
      }

      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Hubo un error al crear/activar el usuario');
    }
  }


  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: UserSelect,
      });

      if (!user) {
        throw new BadRequestException('El usuario no existe');
      }

      return user;

    } catch (error) {
      console.error('❌ Error en UserService.findOne():', error);

      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Hubo un error al consultar el usuario');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto)
    const {
      email,
      provider,
      image,
      name,
      lastName,
    } = updateUserDto;

    const normalizedEmail = email?.toLowerCase();

    try {
      const user = await this.findOne(id);
      if (!user) throw new NotFoundException('Usuario no encontrado');

      // Actualizar campos básicos del usuario
      await this.prisma.user.update({
        where: { id },
        data: {
          ...(image !== undefined && image !== null && { image }),
          ...(name !== undefined && name !== null && { name }),
          ...(lastName !== undefined && lastName !== null && { lastName }),
        }
      });
      // Registrar nuevo proveedor de autenticación
      if (normalizedEmail && provider) {
        await this.prisma.authProvider.create({
          data: {
            userId: id,
            provider: String(provider),
            email: normalizedEmail,
            createdBy: normalizedEmail,
          },
        });
      }
      const userUpdated = await this.findOne(id);
      return userUpdated;
    } catch (error) {
      console.error('❌ Error en UserService.update():', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Hubo un error al actualizar el usuario');
    }
  }

  async remove(id: string) {
    try {
      // 1. Verificar que el usuario existe
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          authProviders: true,
        },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      if (!user.active) {
        throw new BadRequestException('El usuario ya está inactivo');
      }

      // 2. Usar transacción para garantizar consistencia
      const result = await this.prisma.$transaction(async (prisma) => {
        // Opción A: Desactivar usuario (soft delete)
        const updatedUser = await prisma.user.update({
          where: { id },
          data: {
            active: false,
            updatedAt: new Date(),
          },
        });

        // Opcional: También desactivar los auth providers
        await prisma.authProvider.updateMany({
          where: { userId: id },
          data: { active: false },
        });

        return updatedUser;
      });

      return {
        success: true,
        message: 'Usuario desactivado correctamente',
        data: result,
      };

    } catch (error) {
      console.error('❌ Error en UserService.remove():', error);

      // Manejo específico de errores de Prisma
      if (error.code === 'P2025') {
        throw new NotFoundException('Usuario no encontrado');
      }

      if (error instanceof NotFoundException ||
        error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Hubo un error al eliminar el usuario'
      );
    }
  }
}
