import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [HabitsController],
  providers: [HabitsService],
  imports: [ PrismaModule],
})
export class HabitsModule { }
