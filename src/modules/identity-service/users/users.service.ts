import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserSelect } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { provider, ...rest } = createUserDto;

    const normalizedEmail = rest.email.toLowerCase();

    try {
      const userExists = await this.prisma.user.findFirst({
        where: {
          numberDocument: rest.numberDocument,
          authProviders: {
            some: {
              email: normalizedEmail,
              provider: String(provider),
            }
          }
        }
      });

      if (userExists) {
        throw new BadRequestException('El usuario ya existe');
      }

      const salt = bcrypt.genSaltSync(10);

      const user = await this.prisma.user.create({
        data: {
          ...rest,
          password: bcrypt.hashSync(rest.password, salt),
          createdBy: normalizedEmail,
        },
      });

      await this.prisma.authProvider.create({
        data: {
          userId: user.id,
          provider: String(provider),
          email: normalizedEmail,
          verified: true,
          createdBy: normalizedEmail,
        }
      });

      const newUser = await this.findOne(user.id);
      return newUser;

    } catch (error) {
      console.error('❌ Error en UserService.create():', error);

      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Hubo un error al crear el usuario');
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
      numberDocument,
      birthDate,
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
          ...(numberDocument !== undefined && numberDocument !== null && { numberDocument }),
          ...(birthDate !== undefined && birthDate !== null && { birthDate }),
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
}
