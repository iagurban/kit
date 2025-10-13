import { once } from '@gurban/kit/core/once';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';

@Injectable()
export class TokenCheckerService {
  private jwksClient?: JwksClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, TokenCheckerService.name);
  }

  @once
  get client() {
    return (this.jwksClient ??= new JwksClient({
      jwksUri: this.configService.getOrThrow('SIGNING_JWKS_URI'),
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 10 * 60 * 1000, // 10 minutes
    }));
  }

  public async validateAndUnpackToken<T>(token: string): Promise<T | null> {
    try {
      const decodedToken = jwt.decode(token, { complete: true });
      if (!decodedToken) {
        this.logger.error('Invalid token format');
        return null;
      }

      const key = await this.client.getSigningKey(decodedToken.header.kid);
      const signingKey = key.getPublicKey();

      const decoded = jwt.verify(token, signingKey) as T;
      this.logger.info('Successfully validated and unpacked token.');
      return decoded;
    } catch (error) {
      this.logger.error(
        {
          err: error,
          errMsg: (error as Record<string, string>).message,
          errStack: (error as Record<string, string>).stack,
        },
        'Failed to validate or unpack token.'
      );
      return null;
    }
  }
}
