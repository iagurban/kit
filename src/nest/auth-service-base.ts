import { randomBytes } from 'node:crypto';

import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CookieOptions } from 'express';

import { UnauthenticatedError } from './unauthenticated-error';

const saltOrRounds = 10;

export const hashing = {
  hash: (password: string) => bcrypt.hash(password, saltOrRounds),
  check: (password: string, hash: string) => bcrypt.compare(password, hash),
} as const;

type JWTObject<JWTPayload extends Record<string, string>> = { sub: string } & JWTPayload;

/**
 * Base class for implementing authentication service in NestJS applications.
 * Provides a complete JWT-based authentication flow with access and refresh tokens.
 *
 * This service handles:
 * - User authentication with username/password
 * - JWT access token generation and validation
 * - Refresh token rotation with secure cookie storage
 * - User session management
 *
 * @template DbUser - User entity type that must contain 'id' and 'passwordHash' properties
 * @template JWTPayload - JWT payload type that must contain a 'sub' property
 */
export abstract class AuthServiceBase<
  DbUser extends { id: string; passwordHash: string },
  JWTPayload extends { sub: string },
> {
  /**
   * Creates an instance of AuthServiceBase.
   *
   * @param {JwtService} jwtService - NestJS JWT service for token operations
   * @param {Object} refreshCookieOptions - Configuration for refresh tokens
   * @param {string} refreshCookieOptions.cookieSecret - Secret for signing JWTs
   * @param {string|number} refreshCookieOptions.accessExpiresIn - Access token lifetime
   * @param {number} refreshCookieOptions.refreshExpiresDays - Refresh token lifetime in days
   * @protected
   */
  protected constructor(
    readonly jwtService: JwtService,
    readonly refreshCookieOptions: {
      cookieSecret: string;
      accessExpiresIn: number;
      refreshExpiresDays: number;
    }
  ) {}

  /**
   * Finds a user by their username or email address.
   * Used during the initial authentication process.
   *
   * @param {string} nameOrMail - Username or email to search for
   * @returns {Promise<(DbUser & { passwordHash: string }) | null>} The found user or null if not found
   */
  abstract findByUsernameOrEmail(nameOrMail: string): Promise<(DbUser & { passwordHash: string }) | null>;

  /**
   * Stores a new refresh token in the database.
   *
   * @param {string} userId - ID of the user the token belongs to
   * @param {string} hash - Hashed value of the refresh token
   * @param {Date} expiresAt - Token expiration date
   * @returns {Promise<string>} ID of the stored refresh token
   */
  abstract saveRefreshToken(userId: string, hash: string, expiresAt: Date): Promise<string>;

  /**
   * Retrieves a refresh token from storage by its ID.
   *
   * @param {string} id - ID of the refresh token to find
   * @returns {Promise<{id: string; expiresAt: Date; hash: string; user: Omit<DbUser, `passwordHash`>} | null>}
   */
  abstract findRefreshToken(id: string): Promise<{
    id: string;
    expiresAt: Date;
    hash: string;
    user: Omit<DbUser, `passwordHash`>;
  } | null>;

  /**
   * Deletes a specific refresh token from storage.
   *
   * @param {string} id - ID of the refresh token to delete
   */
  abstract deleteRefreshToken(id: string): Promise<void>;

  /**
   * Deletes all refresh tokens belonging to a specific user.
   * Used for logging out from all devices.
   *
   * @param {string} userId - ID of the user whose tokens should be deleted
   */
  abstract deleteRefreshTokensOfUser(userId: string): Promise<void>;

  /**
   * Converts a user object to a JWT payload.
   * Implementing classes should define how user data maps to token claims.
   *
   * @param {Omit<DbUser, `passwordHash`>} user - User object without password hash
   * @returns {JWTPayload} JWT payload object
   */
  abstract userToPayload(user: Omit<DbUser, `passwordHash`>): JWTObject<JWTPayload>;

  async validateUser(nameOrMail: string, pass: string): Promise<Omit<DbUser, `passwordHash`>> {
    const user = await this.findByUsernameOrEmail(nameOrMail);
    if (!user || !(await hashing.check(pass, user.passwordHash))) {
      throw new UnauthorizedException();
    }
    const { passwordHash: _, ...rest } = user;
    return rest;
  }

  async login(login: string, password: string) {
    const user = await this.validateUser(login, password); // твоя функция

    return this.issueTokens(user);
  }

  async issueTokens(user: Omit<DbUser, `passwordHash`>) {
    const payload = this.userToPayload(user);
    const userId = payload.sub;
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.refreshCookieOptions.accessExpiresIn,
      secret: this.refreshCookieOptions.cookieSecret,
    });

    const tokenValue = randomBytes(32).toString('hex');

    const id = await this.saveRefreshToken(
      userId,
      await bcrypt.hash(tokenValue, 10),
      new Date(Date.now() + 1000 * 60 * 60 * 24 * this.refreshCookieOptions.refreshExpiresDays)
    );

    return { accessToken, refreshToken: `${id}:${tokenValue}` };
  }

  async refresh(compositeToken: string) {
    const [id, rawValue] = compositeToken.split(':');
    if (!id || !rawValue) {
      throw new UnauthenticatedError(`no token`);
    }

    const stored = await this.findRefreshToken(id);

    if (!stored) {
      throw new UnauthenticatedError(`not stored`);
    }

    if (stored.expiresAt < new Date()) {
      throw new UnauthenticatedError(`expired`);
    }

    if (!(await bcrypt.compare(rawValue, stored.hash))) {
      throw new UnauthenticatedError(`wrong token`);
    }

    await this.deleteRefreshToken(stored.id); // ротация

    return this.issueTokens(stored.user); // новый access + refresh
  }

  async revokeAll(userId: DbUser[`id`]) {
    await this.deleteRefreshTokensOfUser(userId);
  }

  get refreshTokenCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * this.refreshCookieOptions.refreshExpiresDays,
    };
  }

  accessTokenToPayload(rawToken: string): JWTObject<JWTPayload> {
    if (!rawToken) {
      throw new UnauthenticatedError('Access token is required');
    }

    try {
      // верифицируем и распаковываем payload
      return this.jwtService.verify<JWTObject<JWTPayload>>(rawToken, {
        secret: this.refreshCookieOptions.cookieSecret,
      });
    } catch (e) {
      throw new UnauthenticatedError(String(e));
    }
  }
}
