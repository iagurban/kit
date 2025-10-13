import { type Metadata, status as GrpcStatus } from '@grpc/grpc-js';
import { isSomeObject } from '@gurban/kit/core/checks';
import { once } from '@gurban/kit/core/once';
import { Controller, Inject } from '@nestjs/common';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';

import {
  IssueTokenRequest,
  IssueTokenResponse,
  SigningServiceController,
  SigningServiceControllerMethods,
} from '../../generated/grpc/src/grpc/signing';
import { SigningService } from './signing.service';

@Controller()
@SigningServiceControllerMethods()
export class SigningGrpcController implements SigningServiceController {
  constructor(
    private readonly signingService: SigningService,
    @Inject(Logger) private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, SigningGrpcController.name);
  }

  /**
   * Handles the gRPC `issueToken` request.
   * Authentication is performed by inspecting the client's mTLS certificate.
   * @param data The request payload object.
   * @param metadata The incoming gRPC metadata (headers).
   * @returns The signed JWT and its expiration.
   */
  issueToken(data: IssueTokenRequest, metadata: Metadata): IssueTokenResponse {
    this.logger.info('Attempting to issue token...');
    // Log the full metadata to diagnose header issues.
    this.logger.debug({ metadata: metadata.toHttp2Headers() }, 'Received gRPC metadata');

    try {
      // Read the trusted header injected by our proxy service.
      // gRPC metadata keys are typically lowercased.
      const serviceNameValues = metadata.get('x-forwarded-client-cert-cn');

      if (!serviceNameValues || serviceNameValues.length === 0) {
        this.logger.warn(
          { metadata: metadata.toHttp2Headers() },
          'Authentication failed: x-forwarded-client-cert-cn header is missing or empty.'
        );
        throw { code: GrpcStatus.UNAUTHENTICATED, message: 'Client identity not forwarded by proxy.' };
      }

      const serviceName = serviceNameValues[0] as string;
      this.logger.info(`Issuing token for service: ${serviceName}`);
      const { accessToken, expiresIn } = this.signingService.signToken(serviceName);
      this.logger.info(`Successfully issued token for service: ${serviceName}`);

      return { accessToken, expiresIn };
    } catch (error) {
      this.logger.error({ error }, 'Error during token issuance');

      // If it's already a gRPC error, re-throw it.
      if (isSomeObject(error) && `code` in error && typeof error.code === 'number') {
        throw error;
      }

      // Otherwise, wrap it in a generic INTERNAL gRPC error to prevent RST_STREAM.
      throw { code: GrpcStatus.INTERNAL, message: 'An internal error occurred while issuing the token.' };
    }
  }
}
