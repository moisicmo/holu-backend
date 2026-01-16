import { Module } from '@nestjs/common';
import { ScheduledNotificationsService } from './scheduled-notifications.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PushNotificationModule } from '../push-notification/push-notification.module';

@Module({
  imports: [
    PushNotificationModule,
    PrismaModule,
  ],
  providers: [ScheduledNotificationsService],
})
export class ScheduledNotificationsModule {}
