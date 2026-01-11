import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PhisicalRecordsService } from './physical-records.service';
import { CreatePhisicalRecordDto } from './dto/create-physical-record.dto';
import { UpdatePhisicalRecordDto } from './dto/update-physical-record.dto';
import { checkAbilities, CurrentUser } from '@/decorator';
import { JwtPayload } from '@/modules/identity-service/auth/entities/jwt-payload.interface';
import { PaginationDto, TypeAction, TypeSubject } from '@/common';

@Controller('phisical-records')
export class PhisicalRecordsController {
  constructor(private readonly phisicalRecordsService: PhisicalRecordsService) { }

  @Post()
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.physicalRecord })
  create(@CurrentUser() user: JwtPayload, @Body() createPhisicalRecordDto: CreatePhisicalRecordDto) {
    return this.phisicalRecordsService.create(user.email, createPhisicalRecordDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.phisicalRecordsService.findAll(paginationDto);
  }

  @Get(':id')
  @checkAbilities({ action: TypeAction.leer, subject: TypeSubject.physicalRecord })
  findOne(@Param('id') id: string) {
    return this.phisicalRecordsService.findOne(id);
  }

  @Patch(':id')
  @checkAbilities({ action: TypeAction.editar, subject: TypeSubject.physicalRecord })
  update(@Param('id') id: string, @Body() updatePhisicalRecordDto: UpdatePhisicalRecordDto) {
    return this.phisicalRecordsService.update(id, updatePhisicalRecordDto);
  }

  @Delete(':id')
  @checkAbilities({ action: TypeAction.eliminar, subject: TypeSubject.physicalRecord })
  remove(@Param('id') id: string) {
    return this.phisicalRecordsService.remove(id);
  }
}
