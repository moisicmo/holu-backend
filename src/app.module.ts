import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/auth.guard';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';

import { GoogledriveModule } from './common/googledrive/googledrive.module';
import { GmailModule } from './common/gmail/gmail.module';

import { AvatarsModule } from './modules/identity-service/avatars/avatars.module';
import { AuthModule } from './modules/identity-service/auth/auth.module';
import { UsersModule } from './modules/identity-service/users/users.module';

import { TemplatesModule } from './modules/tenant-service/templates/templates.module';
import { TenantsModule } from './modules/tenant-service/tenants/tenants.module';
import { BranchesModule } from './modules/tenant-service/branches/branches.module';

import { InvoicesModule } from './modules/subscription-service/invoices/invoices.module';

import { HabitsModule } from './modules/holu-prime/habits/habits.module';
import { RadiosModule } from './modules/holu-prime/radios/radios.module';
import { ActivitiesModule } from './modules/holu-prime/activities/activities.module';
import { PhisicalRecordsModule } from './modules/holu-prime/physical-records/physical-records.module';
import { RoutinesModule } from './modules/holu-prime/routines/routines.module';
@Module({
  imports: [
    PrismaModule,
    CloudinaryModule,
    GoogledriveModule,
    GmailModule,

    AvatarsModule,
    AuthModule,
    UsersModule,

    TemplatesModule,
    TenantsModule,
    BranchesModule,

    InvoicesModule,
    
    RadiosModule,
    PhisicalRecordsModule,
    RoutinesModule,
    HabitsModule,
    ActivitiesModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
