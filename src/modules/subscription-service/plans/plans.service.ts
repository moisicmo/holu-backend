import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PaginationDto, PaginationResult } from '@/common';
import { PlanSelect, PlanType } from './entities/plan.entity';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class PlansService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  create(createPlanDto: CreatePlanDto) {
    return 'This action adds a new plan';
  }

  async findAllByBranch(
    branchId: string,
    paginationDto: PaginationDto,
  ): Promise<PaginationResult<PlanType>> {
    try {
      const { page = 1, limit = 10, keys = '' } = paginationDto;

      // 🔹 Filtro final
      const whereClause: Prisma.PlanWhereInput = {
        branchId,
        ...(keys && {
          title: {
            contains: keys,
            mode: Prisma.QueryMode.insensitive,
          },
        }),
      };

      // 🔹 Total
      const total = await this.prisma.plan.count({
        where: whereClause,
      });

      const lastPage = Math.ceil(total / limit);

      // 🔹 Datos
      const data = await this.prisma.plan.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereClause,
        orderBy: { createdAt: 'asc' },
        select: PlanSelect,
      });

      return {
        data,
        meta: { total, page, lastPage },
      };
    } catch (error) {
      console.error('❌ Error en findAll(Plan):', error);
      throw new InternalServerErrorException(
        'Hubo un error al listar los planes',
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
