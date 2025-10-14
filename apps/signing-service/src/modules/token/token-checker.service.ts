import { Metadata } from '@grpc/grpc-js';
import { once } from '@gurban/kit/core/once';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import * as fs from 'fs';
import * as https from 'https';
import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
import { sortedIndexOf } from 'lodash';

import { InternalJWTPayload } from '../signing/signing.service';

@Injectable()
export class TokenCheckerService {
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
    // Create a custom HTTPS agent that trusts our local CA.
    const httpsAgent = new https.Agent({
      ca: fs.readFileSync('./certs/ca.crt'),
    });

    return new JwksClient({
      jwksUri: this.configService.getOrThrow('SIGNING_JWKS_URI'),
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 10 * 60 * 1000, // 10 minutes
      // Pass the custom agent to the client.
      requestAgent: httpsAgent,
    });
  }

  public async validateAndUnpackToken(token: string): Promise<InternalJWTPayload> {
    const decodedToken = jwt.decode(token, { complete: true });
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token format');
    }

    const key = await this.client.getSigningKey(decodedToken.header.kid);
    const signingKey = key.getPublicKey();

    const decoded = jwt.verify(token, signingKey) as InternalJWTPayload;
    this.logger.info('Successfully validated and unpacked token.');
    return decoded;
  }

  public async tryValidateAndUnpackToken(token: string) {
    try {
      return await this.validateAndUnpackToken(token);
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

  private jwtFromMetadata(metadata: Metadata): string {
    const authHeaderValues = metadata.get('authorization');
    if (!authHeaderValues || authHeaderValues.length === 0) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const authHeader = authHeaderValues[0].toString(); // Handles both string and Buffer

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid Bearer token format. Expected "Bearer <token>".');
    }

    return parts[1];
  }

  public async assertAuthorization(metadata: Metadata, service: string, method: string) {
    const token = this.jwtFromMetadata(metadata);
    const payload = await this.validateAndUnpackToken(token);
    const methods = payload.permissions[service];
    if (!methods || sortedIndexOf(methods, method) === -1) {
      throw new ForbiddenException(
        `client "${payload.sub}" has insufficient permissions to call ${service}/${method}`
      );
    }
  }
}
