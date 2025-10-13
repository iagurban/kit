import { Metadata } from '@grpc/grpc-js';
import { once } from '@gurban/kit/core/once';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { firstValueFrom } from 'rxjs';

import { SIGNING_SERVICE_NAME, SigningServiceClient } from '../../generated/grpc/src/grpc/signing';
import { signingGRPCConfig } from '../../grpc/signing.grpc-config';

// A buffer to refresh the token 5 minutes before it actually expires.
const TOKEN_EXPIRATION_BUFFER_MS = 5 * 60 * 1000;

@Injectable()
export class TokenFetcherService {
  // A promise lock to prevent a "thundering herd" of requests for a new token.
  private fetchPromise: Promise<string> | null = null;

  constructor(
    @Inject(signingGRPCConfig.clientName) private readonly grpcClient: ClientGrpc,
    private readonly configService: ConfigService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, TokenFetcherService.name);
  }

  @once
  get signingClient(): SigningServiceClient {
    return this.grpcClient.getService<SigningServiceClient>(SIGNING_SERVICE_NAME);
  }

  /**
   * Returns a valid service-to-service JWT, fetching a new one if necessary.
   * This is the main public method consumers will call.
   */
  public async getToken(): Promise<string> {
    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    // Check if the cached token is still valid (and not about to expire).
    if (!this.lastToken || this.lastToken.expiresAt.getTime() < Date.now() + TOKEN_EXPIRATION_BUFFER_MS) {
      return this.fetchAndCacheToken();
    }

    return this.lastToken.accessToken;
  }

  private lastToken: { accessToken: string; expiresAt: Date } | undefined;

  /**
   * The core logic to call the signing-service gRPC endpoint and cache the new token.
   */
  private async fetchAndCacheToken(): Promise<string> {
    return (this.fetchPromise ??= (async () => {
      try {
        const { accessToken, expiresIn } = await firstValueFrom(
          this.signingClient.issueToken({}, new Metadata())
        );

        // Calculate the absolute expiration time.
        const tokenExpiresAt = new Date(Date.now() + expiresIn * 1000);

        this.lastToken = { accessToken, expiresAt: tokenExpiresAt };

        this.logger.info(
          `Successfully fetched and cached a new internal token, expiring at ${tokenExpiresAt.toISOString()}`
        );
        return accessToken;
      } catch (error) {
        this.logger.error(
          { error },
          'FATAL: Could not fetch internal service token. This service cannot authenticate with other services.'
        );
        // Re-throw the error. This is a critical failure.
        throw error;
      } finally {
        this.fetchPromise = null;
      }
    })());
  }
}
