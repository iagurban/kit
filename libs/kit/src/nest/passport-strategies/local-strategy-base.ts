import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthServiceBase } from '../auth-service-base';

/**
 * Base class for implementing Passport Local authentication strategy in NestJS applications.
 * Provides username/password authentication integration with Passport.js.
 *
 * To use this class:
 * 1. Import AuthModule in your module
 * 2. Create a strategy class that extends this base class
 * 3. Inject AuthService implementation in the constructor
 * 4. Implement getAuthService() to return the injected service
 *
 * @template User - User entity type that must contain 'id' and 'passwordHash' properties
 * @template CurrentUserJwtPayload - JWT payload type that must contain a 'sub' property
 *
 * @example
 * ```typescript
 * @Injectable()
 * class LocalStrategy extends LocalStrategyBase<UserType, JwtPayloadType> {
 *   constructor(private authService: AuthService) {
 *     super();
 *   }
 *
 *   getAuthService() {
 *     return this.authService;
 *   }
 * }
 * ```
 *
 * @extends {PassportStrategy(Strategy)}
 */
export abstract class LocalStrategyBase<
  User extends { id: string; passwordHash: string },
  CurrentUserJwtPayload extends { sub: string },
> extends PassportStrategy(Strategy) {
  /**
   * Abstract method that must return an authentication service instance.
   * The service must extend AuthServiceBase and implement user validation logic.
   *
   * @returns {AuthServiceBase<User, CurrentUserJwtPayload>} An authentication service instance
   * that can validate users with username/password credentials
   *
   * @abstract
   */
  abstract getAuthService(): AuthServiceBase<User, CurrentUserJwtPayload>;

  async validate(username: string, password: string) {
    const user = await this.getAuthService().validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
