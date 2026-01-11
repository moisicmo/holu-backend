import { Module } from '@nestjs/common';
import { PhisicalRecordsService } from './physical-records.service';
import { PhisicalRecordsController } from './physical-records.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [PhisicalRecordsController],
  providers: [PhisicalRecordsService],
  imports: [PrismaModule],
})
export class PhisicalRecordsModule { }
