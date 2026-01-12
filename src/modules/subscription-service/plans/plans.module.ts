import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [PlansController],
  providers: [PlansService],
  imports: [PrismaModule],
})
export class PlansModule { }
