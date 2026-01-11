import { Module } from '@nestjs/common';
import { PhysicalRecordsService } from './physical-records.service';
import { PhysicalRecordsController } from './physical-records.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [PhysicalRecordsController],
  providers: [PhysicalRecordsService],
  imports: [PrismaModule],
})
export class PhysicalRecordsModule { }
