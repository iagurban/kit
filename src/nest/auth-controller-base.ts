import { Request, Response } from 'express';

import { UnauthenticatedError } from '../graphql/unauthenticated-error';
import { AuthServiceBase } from './auth-service-base';

/**
 * Base controller class that implements JWT-based authentication flow with access and refresh tokens.
 * Uses bearer tokens for access authorization and HTTP-only cookies for refresh tokens.
 *
 * This class provides endpoints for login, logout, and token refresh operations.
 * Currently supports local authentication strategy.
 *
 * Recommended usage is composition over inheritance - create an instance inside your controller
 * rather than extending this class.
 *
 * @template User - User entity type that must contain 'id' and 'passwordHash' properties
 * @template CurrentUserJwtPayload - JWT payload type that must contain a 'sub' property
 *
 * @example
 * ```typescript
 * @Controller('auth')
 * export class AuthController {
 *   private authController: AuthControllerBase<User, JwtPayload>;
 *
 *   constructor(private authService: AuthService) {
 *     this.authController = new AuthControllerBase(authService);
 *   }
 * }
 * ```
 */

export class AuthControllerBase<
  User extends { id: string; passwordHash: string },
  CurrentUserJwtPayload extends { sub: string },
> {
  constructor(private authService: AuthServiceBase<User, CurrentUserJwtPayload>) {}

  /**
   * Refreshes the access token using a refresh token from cookies.
   * Issues new refresh token and returns new access token.
   *
   * @param {Request} req - Express request object containing refresh token in cookies
   * @param {Response} res - Express response object for setting new refresh token cookie
   * @returns {Promise<{access_token: string}>} New access token in JSON format
   * @throws {UnauthenticatedError} If refresh token is missing in cookies
   */
  async refresh(req: Request, res: Response) {
    const oldRefreshToken = req.cookies['refresh_token'];

    if (!oldRefreshToken) {
      throw new UnauthenticatedError('Missing refresh token');
    }

    const { accessToken, refreshToken } = await this.authService.refresh(oldRefreshToken);

    res.cookie('refresh_token', refreshToken, this.authService.refreshTokenCookieOptions);

    return res.json({ access_token: accessToken });
  }

  /**
   * Authenticates user credentials and creates new session.
   * Sets refresh token in cookies and returns access token.
   *
   * @param {string} login - User login (username or email)
   * @param {string} password - User password
   * @param {Response} res - Express response object for setting refresh token cookie
   * @returns {Promise<string>} Access token for authenticated user
   * @throws {UnauthorizedException} If credentials are invalid
   */
  async login(login: string, password: string, res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(login, password);

    res.cookie('refresh_token', refreshToken, this.authService.refreshTokenCookieOptions);

    return accessToken;
  }

  /**
   * Ends the user session by invalidating refresh token and clearing cookies.
   * If refresh token exists, it will be invalidated on the server.
   *
   * @param {Request} req - Express request object containing refresh token in cookies
   * @param {Response} res - Express response object for clearing refresh token cookie
   * @returns {Promise<boolean>} True if logout was successful
   */
  async logout(req: Request, res: Response) {
    const oldRefresh = req.cookies['refresh_token'];
    if (oldRefresh) {
      await this.authService.refresh(oldRefresh);
    } // она удалит токен
    res.clearCookie('refresh_token');
    return true;
  }
}
