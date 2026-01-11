import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PaginationDto, TypeAction, TypeSubject } from '@/common';
import { checkAbilities, CurrentUser } from '@/decorator';
import { JwtPayload } from '@/modules/identity-service/auth/entities/jwt-payload.interface';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) { }

  @Post()
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.branch })
  create(@CurrentUser() user: JwtPayload, @Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(user.email, createBranchDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.branchesService.findAll(paginationDto);
  }

  @Get(':id')
  @checkAbilities({ action: TypeAction.leer, subject: TypeSubject.branch })
  findOne(@Param('id') id: string) {
    return this.branchesService.findOne(id);
  }

  @Patch(':id')
  @checkAbilities({ action: TypeAction.editar, subject: TypeSubject.branch })
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(id, updateBranchDto);
  }

  @Delete(':id')
  @checkAbilities({ action: TypeAction.eliminar, subject: TypeSubject.branch })
  remove(@Param('id') id: string) {
    return this.branchesService.remove(id);
  }
}
