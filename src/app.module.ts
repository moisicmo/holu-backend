import { Module } from '@nestjs/common';
import { UsersModule } from './modules/identity-service/users/users.module';
import { RolesModule } from './modules/identity-service/roles/roles.module';
import { PermissionsModule } from './modules/identity-service/permissions/permissions.module';
import { AuthModule } from './modules/identity-service/auth/auth.module';

import { TenantsModule } from './modules/tenant-service/tenants/tenants.module';
import { BranchesModule } from './modules/tenant-service/branches/branches.module';
import { TemplatesModule } from './modules/tenant-service/templates/templates.module';

import { SubscriptionsModule } from './modules/subscription-service/subscriptions/subscriptions.module';
import { PlansModule } from './modules/subscription-service/plans/plans.module';
import { PaymentsModule } from './modules/subscription-service/payments/payments.module';

@Module({
  imports: [UsersModule, RolesModule, PermissionsModule, TenantsModule, BranchesModule, SubscriptionsModule, TemplatesModule, AuthModule, PlansModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
