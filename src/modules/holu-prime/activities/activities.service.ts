import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PaginationDto, PaginationResult } from '@/common';
import { DailyActivitySelect, DailyActivityType } from './entities/activity.entity';
import { Prisma } from '@/generated/prisma/client';
import { CreateActivityProgressDto } from './dto/create-activity-progress.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }


  async create(email: string, createActivityDto: CreateActivityDto) {
    try {
      const { ...activitieDto } = createActivityDto;

      return await this.prisma.dailyActivity.create({
        data: {
          ...activitieDto,
          createdBy: email,
        },
        select: DailyActivitySelect,
      });

    } catch (error) {
      console.log(error);
      throw new Error(`No se pudo crear el activitie: ${error.message}`);
    }
  }

  async createProgress(email: string, createActivityProgressDto: CreateActivityProgressDto) {
    try {
      const { activityId, status, progressDate } = createActivityProgressDto;

      // Fecha enviada por el frontend (día local)
      const inputDate = new Date(progressDate);

      // Normalizar al inicio del día (LOCAL)
      const setProgressDate = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate(),
        0, 0, 0, 0,
      );

      // 🔎 Buscar progreso del día
      const existing = await this.prisma.activityProgress.findFirst({
        where: {
          activityId,
          progressDate: setProgressDate,
        },
      });

      // 🔁 Si existe → actualizar
      if (existing) {
        const updated = await this.prisma.activityProgress.update({
          where: { id: existing.id },
          data: { status },
        });

        return {
          message: 'Progreso actualizado correctamente',
          data: updated,
        };
      }

      // ✅ Crear progreso
      const activityProgress = await this.prisma.activityProgress.create({
        data: {
          activityId,
          status,
          progressDate: setProgressDate,
          createdBy: email,
        },
      });

      return {
        message: 'Progreso de la actividad registrado correctamente',
        data: activityProgress,
      };
    } catch (error) {
      console.error('❌ Error en activityProgress.create():', error);

      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'Hubo un error al registrar el progreso de la actividad',
      );
    }
  }

  async findAllByUser(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<PaginationResult<DailyActivityType>> {
    try {
      const { page = 1, limit = 10, keys = '' } = paginationDto;

      // 🔹 Armar el filtro final para Prisma
      const whereClause: Prisma.DailyActivityWhereInput = {
        userId,
        ...(keys && {
          title: {
            contains: keys,
            mode: Prisma.QueryMode.insensitive,
          },
        }),
      };

      // 🔹 Paginación
      const total = await this.prisma.dailyActivity.count({ where: whereClause });
      const lastPage = Math.ceil(total / limit);

      // 🔹 Consulta final con selección de campos
      const data = await this.prisma.dailyActivity.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereClause,
        orderBy: { createdAt: 'asc' },
        select: DailyActivitySelect,
      });

      // 🔹 Retornar la respuesta formateada
      return {
        data,
        meta: { total, page, lastPage },
      };
    } catch (error) {
      console.error('❌ Error en findAll(Branch):', error);
      // Manejo de errores personalizado
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Hubo un error al listar las sucursales');
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} activity`;
  }

  update(id: string, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: string) {
    return `This action removes a #${id} activity`;
  }
}
