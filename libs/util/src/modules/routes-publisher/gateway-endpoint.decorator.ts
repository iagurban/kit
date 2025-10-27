import { SetMetadata } from '@nestjs/common';

export const GATEWAY_ENDPOINT_METADATA = '__gatewayEndpoint__';

export interface GatewayEndpointOptions {
  /**
   * The public-facing path. If not provided, it will be auto-generated
   * from the controller and method paths.
   * e.g., "/my-custom/path"
   */
  publicPath?: string;
  /**
   * The API version for this specific endpoint.
   */
  version?: number;
}

/**
 * Marks a controller method to be published to the API Gateway.
 * @param options (Optional) Configuration to override the default path.
 */
export const GatewayEndpoint = (options: GatewayEndpointOptions = {}) =>
  SetMetadata(GATEWAY_ENDPOINT_METADATA, options);
