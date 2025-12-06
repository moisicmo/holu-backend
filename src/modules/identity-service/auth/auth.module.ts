import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthService } from '@/common/google/auth/google.auth.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule, // ✅ Esto es lo que falta
    JwtModule.register({}),
  ],
  providers: [AuthService, GoogleAuthService],
  exports: [AuthService],
})
export class AuthModule {}