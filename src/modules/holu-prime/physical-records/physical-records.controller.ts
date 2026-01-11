import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PhysicalRecordsService } from './physical-records.service';
import { CreatePhysicalRecordDto } from './dto/create-physical-record.dto';
import { UpdatePhysicalRecordDto } from './dto/update-physical-record.dto';
import { checkAbilities, Public } from '@/decorator';
import { PaginationDto, TypeAction, TypeSubject } from '@/common';

@Controller('physical-records')
export class PhysicalRecordsController {
  constructor(private readonly physicalRecordsService: PhysicalRecordsService) { }

  @Public()
  @Post()
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.physicalRecord })
  create( @Body() createPhysicalRecordDto: CreatePhysicalRecordDto) {
    return this.physicalRecordsService.create('evaluation', createPhysicalRecordDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.physicalRecordsService.findAll(paginationDto);
  }

  @Get(':id')
  @checkAbilities({ action: TypeAction.leer, subject: TypeSubject.physicalRecord })
  findOne(@Param('id') id: string) {
    return this.physicalRecordsService.findOne(id);
  }

  @Patch(':id')
  @checkAbilities({ action: TypeAction.editar, subject: TypeSubject.physicalRecord })
  update(@Param('id') id: string, @Body() updatePhysicalRecordDto: UpdatePhysicalRecordDto) {
    return this.physicalRecordsService.update(id, updatePhysicalRecordDto);
  }

  @Delete(':id')
  @checkAbilities({ action: TypeAction.eliminar, subject: TypeSubject.physicalRecord })
  remove(@Param('id') id: string) {
    return this.physicalRecordsService.remove(id);
  }
}
