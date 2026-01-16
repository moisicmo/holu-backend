import { Module } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { FirebaseAdminProvider } from './firebase.provider';

@Module({
  providers: [
    FirebaseAdminProvider,
    PushNotificationService,
  ],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
