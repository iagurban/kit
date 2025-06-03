import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { DbModule } from '../db/db.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService, jwtConstants } from './auth.service';
import { JwtStrategy } from './strategies/jwt';
import { LocalStrategy } from './strategies/local';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    DbModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: AuthService.accessExpiresIn },
    }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
