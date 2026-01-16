import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface RequestInfo {
  ipAddress: string;
  userAgent: string;
  language: string;
}

export const RequestInfo = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RequestInfo => {
    const request = ctx.switchToHttp().getRequest();

    const ipAddress =
      request.headers['x-forwarded-for'] ||
      request.ip ||
      request.connection.remoteAddress ||
      '';

    const userAgent = request.headers['user-agent'] || '';

    const acceptLanguage = request.headers['accept-language'];
    const language = acceptLanguage?.toString().split(',')[0] ?? 'es';

    return {
      ipAddress: typeof ipAddress === 'string' ? ipAddress : ipAddress[0],
      userAgent,
      language,
    };
  },
);