import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateHabitProgressDto } from './dto/create-habit-progress.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { Prisma } from '@/generated/prisma/client';
import { UserHabitSelect, UserHabitType } from './entities/habit.entity';
import { PaginationDto, PaginationResult } from '@/common';

@Injectable()
export class HabitsService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(email: string, createHabitDto: CreateHabitDto) {
    try {

      const { ...restHabitDto } = createHabitDto;

      return await this.prisma.userHabit.create({
        data: {
          ...restHabitDto,
          createdBy: email,
        },
      });

    } catch (error) {
      console.error('❌ Error en habit.create():', error);

      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'Hubo un error al registrar el progreso del hábito',
      );
    }
  }

  async createProgress(email: string, createHabitProgressDto: CreateHabitProgressDto) {
    try {
      const { habitId, status, progressDate } = createHabitProgressDto;

      // Fecha enviada por el frontend (día local)
      const inputDate = new Date(progressDate);

      // Normalizar al inicio del día (LOCAL)
      const setProgressDate = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate(),
        0, 0, 0, 0,
      );

      // 🔎 Buscar duplicado por día lógico
      const existing = await this.prisma.habitProgress.findFirst({
        where: {
          habitId,
          progressDate: setProgressDate,
        },
      });

      if (existing) {
        throw new BadRequestException(
          'Ya existe un registro de progreso para este hábito hoy.',
        );
      }

      // ✅ Crear progreso
      const habitProgress = await this.prisma.habitProgress.create({
        data: {
          habitId,
          status,
          progressDate: setProgressDate,
          createdBy: email,
        },
      });

      return {
        message: 'Progreso del hábito registrado correctamente',
        data: habitProgress,
      };
    } catch (error) {
      console.error('❌ Error en habitProgress.create():', error);

      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'Hubo un error al registrar el progreso del hábito',
      );
    }
  }

  async findAll(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<PaginationResult<UserHabitType>> {
    try {
      const { page = 1, limit = 10, keys = '' } = paginationDto;

      // 🔹 Filtro final
      const whereClause: Prisma.UserHabitWhereInput = {
        userId,
        ...(keys && {
          title: {
            contains: keys,
            mode: Prisma.QueryMode.insensitive,
          },
        }),
      };

      // 🔹 Total
      const total = await this.prisma.userHabit.count({
        where: whereClause,
      });

      const lastPage = Math.ceil(total / limit);

      // 🔹 Datos
      const data = await this.prisma.userHabit.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereClause,
        orderBy: { createdAt: 'asc' },
        select: UserHabitSelect,
      });

      return {
        data,
        meta: { total, page, lastPage },
      };
    } catch (error) {
      console.error('❌ Error en findAll(UserHabit):', error);
      throw new InternalServerErrorException(
        'Hubo un error al listar los hábitos',
      );
    }
  }


  findOne(id: string) {
    return `This action returns a #${id} habit`;
  }

  update(id: string, updateHabitDto: UpdateHabitDto) {
    return `This action updates a #${id} habit`;
  }

  remove(id: string) {
    return `This action removes a #${id} habit`;
  }
}
