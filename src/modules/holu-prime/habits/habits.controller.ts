import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitProgressDto } from './dto/create-habit-progress.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { checkAbilities, CurrentUser, Public } from '@/decorator';
import { TypeAction, TypeSubject } from '@/common';
import { JwtPayload } from '@/modules/identity-service/auth/entities/jwt-payload.interface';
import { CreateHabitDto } from './dto/create-habit.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitService: HabitsService) { }

  @Public()
  @Post()
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.habit })
  create( @Body() createHabitDto: CreateHabitDto) {
    return this.habitService.create('evaluation', createHabitDto);
  }

  @Post('progress')
  @checkAbilities({ action: TypeAction.crear, subject: TypeSubject.habit })
  createProgress(@CurrentUser() user: JwtPayload, @Body() createHabitDto: CreateHabitProgressDto) {
    return this.habitService.createProgress(user.email, createHabitDto);
  }

  @Get()
  findAll() {
    return this.habitService.findAll();
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
