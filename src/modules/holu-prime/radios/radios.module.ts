import { Module } from '@nestjs/common';
import { RadiosService } from './radios.service';
import { RadiosController } from './radios.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [RadiosController],
  providers: [RadiosService],
  imports: [PrismaModule],
})
export class RadiosModule { }
