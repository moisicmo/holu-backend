import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitProgressDto } from './dto/create-habit-progress.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { checkAbilities, CurrentUser, Public, RequestInfo } from '@/decorator';
import { PaginationDto, TypeAction, TypeSubject } from '@/common';
import { JwtPayload } from '@/modules/identity-service/auth/entities/jwt-payload.interface';
import { CreateHabitDto } from './dto/create-habit.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) { }

  @Post()
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.habit })
  create(@CurrentUser() user: JwtPayload, @Body() createHabitDto: CreateHabitDto) {
    return this.habitsService.create(user.email, createHabitDto);
  }

  @Post('progress')
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.habit })
  createProgress(@CurrentUser() user: JwtPayload, @Body() createHabitDto: CreateHabitProgressDto) {
    return this.habitsService.createProgress(user.email, createHabitDto);
  }

  @Get('/user/:userId')
  @checkAbilities({ action: TypeAction.leer, subject: TypeSubject.habit })
  findAll(@Param('userId') userId: string, @Query() paginationDto: PaginationDto) {
    return this.habitsService.findAllByUser(userId, paginationDto);
  }

  @Public()
  @Get()
  getHabits(@RequestInfo() requestInfo: RequestInfo) {
  console.log(requestInfo.ipAddress, requestInfo.userAgent, requestInfo.language);
    return this.habitsService.getHabits(requestInfo.language);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitsService.update(id, updateHabitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitsService.remove(id);
  }
}
