import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { TenantSelect, TenantType } from './entities/tenant.entity';
import { PaginationDto, PaginationResult } from '@/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class TenantsService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(email: string, createTenantDto: CreateTenantDto) {
    try {
      const { ...tenantDto } = createTenantDto;

      return await this.prisma.tenant.create({
        data: {
          ...tenantDto,
          colors: [],
          createdBy: email,
        },
        select: TenantSelect,
      });

    } catch (error) {
      console.log(error);
      throw new Error(`No se pudo crear el tenant: ${error.message}`);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginationResult<TenantType>> {
    try {
      const { page = 1, limit = 10, keys = '' } = paginationDto;

      // 🔹 Armar el filtro final para Prisma
      const whereClause: Prisma.TenantWhereInput = {
        ...(keys ? { name: { contains: keys, mode: Prisma.QueryMode.insensitive } } : {}),
      };

      // 🔹 Paginación
      const total = await this.prisma.tenant.count({ where: whereClause });
      const lastPage = Math.ceil(total / limit);

      // 🔹 Consulta final con selección de campos
      const data = await this.prisma.tenant.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereClause,
        orderBy: { createdAt: 'asc' },
        select: TenantSelect,
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



  async findOne(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
      select: TenantSelect,
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant with id #${id} not found`);
    }

    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    const { ...rest } = updateTenantDto;
    await this.findOne(id);

    return this.prisma.tenant.update({
      where: { id },
      data: {
        ...rest,
      },
      select: TenantSelect,
    });
  }


  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.branch.update({
      where: { id },
      data: { active: false },
      select: TenantSelect,
    });
  }
}
