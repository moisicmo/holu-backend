import { PartialType } from '@nestjs/swagger';
import { CreateHabitProgressDto } from './create-habit-progress.dto';

export class UpdateHabitDto extends PartialType(CreateHabitProgressDto) {}
