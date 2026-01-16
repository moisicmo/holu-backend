import { Inject, Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class PushNotificationService {
  private readonly logger = new Logger(PushNotificationService.name);

  constructor(
    @Inject('FIREBASE_ADMIN')
    private readonly firebase: typeof admin,
  ) { }

  async sendToTokens(
    tokens: string[],
    payload: {
      title: string;
      body: string;
      data?: Record<string, string>;
    },
  ) {
    if (!tokens.length) return;

    try {
      const response = await this.firebase
        .messaging()
        .sendEachForMulticast({
          tokens,
          notification: {
            title: payload.title,
            body: payload.body,
          },
          data: payload.data,
        });

      // Manejo básico de errores por token
      response.responses.forEach((res, index) => {
        if (!res.success) {
          this.logger.warn(
            `Token inválido: ${tokens[index]} - ${res.error?.message}`,
          );
        }
      });

      return response;
    } catch (error) {
      this.logger.error('Error enviando push', error);
      throw error;
    }
  }
}
