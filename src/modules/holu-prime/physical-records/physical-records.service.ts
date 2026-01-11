import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePhisicalRecordDto as CreatePhysicalRecordDto } from './dto/create-physical-record.dto';
import { UpdatePhisicalRecordDto } from './dto/update-physical-record.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PhysicalRecordType, PhysicalRecordTypeSelect } from './entities/physical-record.entity';
import { PaginationDto, PaginationResult } from '@/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class PhisicalRecordsService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(email: string, createPhysicalRecordDto: CreatePhysicalRecordDto) {
    try {
      const { ...physicalRecordDto } = createPhysicalRecordDto;

      return await this.prisma.physicalRecord.create({
        data: {
          ...physicalRecordDto,
          createdBy: email,
        },
        select: PhysicalRecordTypeSelect,
      });

    } catch (error) {
      console.log(error);
      throw new Error(`No se pudo crear el branch: ${error.message}`);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginationResult<PhysicalRecordType>> {
    try {
      const { page = 1, limit = 10, keys = '' } = paginationDto;

      // 🔹 Armar el filtro final para Prisma
      const whereClause: Prisma.PhysicalRecordWhereInput = {
        ...(keys ? { note: { contains: keys, mode: Prisma.QueryMode.insensitive } } : {}),
      };

      // 🔹 Paginación
      const total = await this.prisma.physicalRecord.count({ where: whereClause });
      const lastPage = Math.ceil(total / limit);

      // 🔹 Consulta final con selección de campos
      const data = await this.prisma.physicalRecord.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereClause,
        orderBy: { createdAt: 'asc' },
        select: PhysicalRecordTypeSelect,
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
    return `This action returns a #${id} phisicalRecord`;
  }

  update(id: string, updatePhisicalRecordDto: UpdatePhisicalRecordDto) {
    return `This action updates a #${id} phisicalRecord`;
  }

  remove(id: string) {
    return `This action removes a #${id} phisicalRecord`;
  }
}
