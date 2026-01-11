import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { TemplateSelect, TemplateType } from './entities/template.entity';
import { PaginationDto, PaginationResult } from '@/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(email: string, createTemplateDto: CreateTemplateDto) {
    try {
      const { ...templateDto } = createTemplateDto;

      return await this.prisma.template.create({
        data: {
          ...templateDto,
          createdBy: email,
        },
        select: TemplateSelect,
      });

    } catch (error) {
      console.log(error);
      throw new Error(`No se pudo crear la plantilla: ${error.message}`);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginationResult<TemplateType>> {
    try {
      const { page = 1, limit = 10, keys = '' } = paginationDto;

      // 🔹 Armar el filtro final para Prisma
      const whereClause: Prisma.TemplateWhereInput = {
        ...(keys ? { name: { contains: keys, mode: Prisma.QueryMode.insensitive } } : {}),
      };

      // 🔹 Paginación
      const total = await this.prisma.template.count({ where: whereClause });
      const lastPage = Math.ceil(total / limit);

      // 🔹 Consulta final con selección de campos
      const data = await this.prisma.template.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereClause,
        orderBy: { createdAt: 'asc' },
        select: TemplateSelect,
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
      throw new InternalServerErrorException('Hubo un error al listar las plantillas');
    }
  }

  async findOne(id: string) {
    const template = await this.prisma.template.findUnique({
      where: { id },
      select: TemplateSelect,
    });

    if (!template) {
      throw new NotFoundException(`Template with id #${id} not found`);
    }

    return template;
  }

  async update(id: string, updateTemplateDto: UpdateTemplateDto) {
    const { ...rest } = updateTemplateDto;
    await this.findOne(id);

    return this.prisma.template.update({
      where: { id },
      data: {
        ...rest,
      },
      select: TemplateSelect,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.template.update({
      where: { id },
      data: { active: false },
      select: TemplateSelect,
    });
  }
}