import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * Base class for implementing Passport JWT authentication strategy in NestJS applications.
 * Provides the basic JWT authentication configuration and validation flow.
 *
 * This class automatically configures JWT extraction from Bearer tokens and handles token validation.
 * Implementing classes only need to define the conversion from JWT payload to user object.
 *
 * @template User - The user entity type that must contain at least an 'id' property
 * @template CurrentUserJwtPayload - The JWT payload type that must contain at least a 'sub' property
 *
 * @example
 * ```typescript
 * @Injectable()
 * class CustomJwtStrategy extends JwtStrategyBase<UserType, JwtPayloadType> {
 *   constructor(configService: ConfigService) {
 *     super(configService.jwtSecret);
 *   }
 *
 *   async convert(payload: JwtPayloadType): Promise<UserType> {
 *     return {
 *       id: payload.sub,
 *       // ... other user properties
 *     };
 *   }
 * }
 * ```
 *
 * @extends {PassportStrategy(Strategy)}
 */
export abstract class JwtStrategyBase<
  User extends { id: string },
  CurrentUserJwtPayload extends { sub: string },
> extends PassportStrategy(Strategy) {
  /**
   * Abstract method to convert JWT payload into a user object.
   * Must be implemented by derived classes to define how the JWT payload maps to a user.
   *
   * @param {CurrentUserJwtPayload} payload - The decoded JWT payload
   * @returns {Promise<User>} A promise that resolves to the user object
   */
  abstract convert(payload: CurrentUserJwtPayload): Promise<User>;

  override validate(payload: CurrentUserJwtPayload): Promise<User> {
    return this.convert(payload);
  }

  protected constructor(cookieSecret: string) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: cookieSecret,
    });
  }
}
