import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { JwtPayload } from '@/modules/identity-service/auth/entities/jwt-payload.interface';
import { PaginationDto, TypeAction, TypeSubject } from '@/common';
import { checkAbilities, CurrentUser } from '@/decorator';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) { }

  @Post()
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.tenant })
  create(@CurrentUser() user: JwtPayload, @Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.create(user.email, createTenantDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tenantsService.findAll(paginationDto);
  }

  @Get(':id')
  @checkAbilities({ action: TypeAction.leer, subject: TypeSubject.tenant })
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @Patch(':id')
  @checkAbilities({ action: TypeAction.editar, subject: TypeSubject.tenant })
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @checkAbilities({ action: TypeAction.eliminar, subject: TypeSubject.tenant })
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }
}
