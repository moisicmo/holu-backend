import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService],
  imports: [PrismaModule],
})
export class TenantsModule {}
