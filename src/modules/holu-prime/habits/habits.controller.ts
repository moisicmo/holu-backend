import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitProgressDto } from './dto/create-habit-progress.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { checkAbilities, CurrentUser } from '@/decorator';
import { PaginationDto, TypeAction, TypeSubject } from '@/common';
import { JwtPayload } from '@/modules/identity-service/auth/entities/jwt-payload.interface';
import { CreateHabitDto } from './dto/create-habit.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitService: HabitsService) { }

  @Post()
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.habit })
  create(@CurrentUser() user: JwtPayload, @Body() createHabitDto: CreateHabitDto) {
    return this.habitService.create(user.email, createHabitDto);
  }

  @Post('progress')
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.habit })
  createProgress(@CurrentUser() user: JwtPayload, @Body() createHabitDto: CreateHabitProgressDto) {
    return this.habitService.createProgress(user.email, createHabitDto);
  }

  @Get('/user/:userId')
  @checkAbilities({ action: TypeAction.leer, subject: TypeSubject.habit })
  findAll(@Param('userId') userId: string, @Query() paginationDto: PaginationDto) {
    return this.habitService.findAllByUser(userId, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitService.update(id, updateHabitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitService.remove(id);
  }
}
