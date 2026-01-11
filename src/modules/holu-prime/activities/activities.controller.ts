import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { checkAbilities, CurrentUser } from '@/decorator';
import { PaginationDto, TypeAction, TypeSubject } from '@/common';
import { JwtPayload } from '@/modules/identity-service/auth/entities/jwt-payload.interface';
import { CreateActivityProgressDto } from './dto/create-activity-progress.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) { }

  @Post()
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.activities })
  create(@CurrentUser() user: JwtPayload, @Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(user.email, createActivityDto);
  }

  @Post('progress')
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.activities })
  createProgress(@CurrentUser() user: JwtPayload, @Body() createActivityProgressDto: CreateActivityProgressDto) {
    return this.activitiesService.createProgress(user.email, createActivityProgressDto);
  }

  @Get('/user/:userId')
  @checkAbilities({ action: TypeAction.leer, subject: TypeSubject.activities })
  findAll(@Param('userId') userId: string, @Query() paginationDto: PaginationDto) {
    return this.activitiesService.findAllByUser(userId, paginationDto);
  }

  @Get(':id')
  @checkAbilities({ action: TypeAction.leer, subject: TypeSubject.activities })
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(id);
  }

  @Patch(':id')
  @checkAbilities({ action: TypeAction.editar, subject: TypeSubject.activities })
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @checkAbilities({ action: TypeAction.eliminar, subject: TypeSubject.activities })
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(id);
  }
}
