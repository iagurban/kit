import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthModule } from '../auth-module/auth.module';

@Module({
  imports: [
    AuthModule.forRoot({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        issuer: configService.getOrThrow<string>('KEYCLOAK_ISSUER_URL'),
        audience: configService.getOrThrow<string>('KEYCLOAK_CLIENT_ID'),
      }),
    }),
  ],
  exports: [AuthModule],
})
export class AuthStaticModule {}
