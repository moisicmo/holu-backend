import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PaginationDto, TypeAction, TypeSubject } from '@/common';
import { checkAbilities, CurrentUser } from '@/decorator';
import { JwtPayload } from '@/modules/identity-service/auth/entities/jwt-payload.interface';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) { }

  @Post()
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.template })
  create(@CurrentUser() user: JwtPayload, @Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(user.email, createTemplateDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.templatesService.findAll(paginationDto);
  }

  @Get(':id')
  @checkAbilities({ action: TypeAction.leer, subject: TypeSubject.template })
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Patch(':id')
  @checkAbilities({ action: TypeAction.editar, subject: TypeSubject.template })
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templatesService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templatesService.remove(id);
  }
}
