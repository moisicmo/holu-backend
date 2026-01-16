import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { PushNotificationService } from '../push-notification/push-notification.service';

@Injectable()
export class ScheduledNotificationsService {
  private readonly logger = new Logger(ScheduledNotificationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly pushService: PushNotificationService,
  ) {}

  @Cron('0 8 * * *', { timeZone: 'America/La_Paz' })
  async dailyReminder() {
    this.logger.log('⏰ Ejecutando CRON: dailyReminder');

    const sessions = await this.prisma.authSession.findMany({
      where: {
        active: true,
        revokedAt: null,
      },
      select: {
        tokenFCM: true,
        createdBy: true,
      },
    });
    console.log(sessions)

    const tokens = sessions.map(s => s.tokenFCM);

    if (!tokens.length) {
      this.logger.log('No hay tokens activos para enviar');
      return;
    }

    await this.pushService.sendToTokens(tokens, {
      title: '⏰ Recordatorio diario',
      body: 'No olvides completar tu hábito hoy 💪',
      data: {
        type: 'daily-reminder',
      },
    });
  }
}
