import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHabitProgressDto } from './dto/create-habit-progress.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateHabitDto } from './dto/create-habit.dto';

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

  findAll() {
    return `This action returns all habit`;
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
