import { KeycloakJwtConfig, keycloakJwtConfigToken } from '@gurban/kit/nest/oidc-jwt-strategy.base';
import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DbModule } from '@poslah/database/db/db.module';
import { DynamicModuleFabric } from '@poslah/database/dynamic-module-fabric';

import { AuthService } from './auth.service';
import { GqlJwtAuthGuard } from './guards/gql-jwt-auth-guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { KeycloakJwtStrategy } from './keycloak-jwt.strategy';

@Module({})
export class AuthModule {
  static forRoot(options: DynamicModuleFabric<KeycloakJwtConfig>): DynamicModule {
    return {
      module: AuthModule,
      imports: [...(options.imports || []), DbModule, PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        {
          provide: keycloakJwtConfigToken,
          inject: options.inject || [],
          useFactory: options.useFactory,
        },
        // UsersService,
        KeycloakJwtStrategy,
        JwtAuthGuard,
        GqlJwtAuthGuard,
        AuthService,
      ],
      exports: [PassportModule, JwtAuthGuard, GqlJwtAuthGuard, AuthService],
      global: options.global,
    };
  }
}
