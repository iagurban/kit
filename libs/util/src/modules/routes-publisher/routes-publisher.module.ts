import { ExMap } from '@gurban/kit/collections/ex-map';
import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { DynamicModule, Inject, Injectable, Module, OnModuleInit, RequestMethod } from '@nestjs/common';
import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { ConfigService } from '@nestjs/config';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';

import { Logger } from '../logger/logger.module';
import { RedisService } from '../nosql/redis/redis.service';
import { GATEWAY_ENDPOINT_METADATA, GatewayEndpointOptions } from './gateway-endpoint.decorator';

const serviceNameSymbol = Symbol(`SERVICE_NAME`);

@Injectable()
export class RoutePublisherService implements OnModuleInit {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
    private readonly redis: RedisService,
    private readonly config: ConfigService,
    private readonly loggerBase: Logger,
    @Inject(serviceNameSymbol) private readonly serviceName: string
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, RoutePublisherService.name);
  }

  async onModuleInit() {
    const serviceName = this.serviceName; // e.g., "chats"

    // This is the final object we will publish to Redis.
    // Key: The public wildcard path (e.g., "/api/chats/v1/auth/endpoint/*/something")
    // Value: A map of HTTP methods to their full internal target URLs.
    const routeMap = new ExMap<string, ExMap<string /* method */, string>>();

    // 1. Find all controllers
    const controllers = this.discovery.getControllers();

    for (const controller of controllers) {
      if (!controller.instance) {
        continue;
      }

      const controllerPath =
        (controller.metatype && this.reflector.get<string>(PATH_METADATA, controller.metatype)) || '';
      const prototype = Object.getPrototypeOf(controller.instance);

      // 2. Scan all methods on each controller
      const methodNames = this.metadataScanner.getAllMethodNames(prototype);

      for (const methodName of methodNames) {
        const methodRef = controller.instance[methodName];

        // 3. Find methods with our @GatewayEndpoint decorator
        const gatewayOptions = this.reflector.get<GatewayEndpointOptions>(
          GATEWAY_ENDPOINT_METADATA,
          methodRef
        );
        if (!gatewayOptions) {
          continue; // This method is not public
        }

        // 4. Find the @Get, @Post, etc. decorator
        const httpMethodCode = this.reflector.get<number>(METHOD_METADATA, methodRef);
        const httpMethod = RequestMethod[httpMethodCode]; // "GET", "POST", "PUT", etc.

        // 5. Get the path from the @Get, @Post decorator
        const methodPath = this.reflector.get<string>(PATH_METADATA, methodRef) || '';

        // --- 6. Construct the Public and Target Paths ---

        // Combine controller and method paths
        const internalPath = [controllerPath, methodPath].filter(Boolean).join('/');

        // A NestJS path ending in `/*` is a greedy wildcard.
        const isGreedy = internalPath.endsWith('/*');

        let pathForMatcher = internalPath;
        if (isGreedy) {
          // Our path matcher handles this by matching the prefix and returning the rest.
          // To do this, we register the path without the trailing `/*`.
          pathForMatcher = pathForMatcher.slice(0, -2);
        }

        // Convert NestJS params to wildcards for our matcher
        // e.g., "auth/:id(\d+)/verify" -> "auth/*/verify"
        const wildcardPath = pathForMatcher.replace(/(^|\/):[a-zA-Z0-9_]+(?:\([^)]+\))?/g, '$1*');

        const publicPath = gatewayOptions.publicPath
          ? gatewayOptions.publicPath
          : `/api${gatewayOptions.version ? `/v${gatewayOptions.version}` : ''}/${serviceName}/${wildcardPath}${!isGreedy ? '$' : ''}`;

        // e.g., /auth/endpoint/:id/something
        const targetPath = internalPath.startsWith('/') ? internalPath : `/${internalPath}`;

        // 7. Add this method/target pair to our route map
        routeMap
          .getOrCreate(publicPath, () => new ExMap())
          .update(httpMethod, o => {
            if (o) {
              throw new Error(`duplicate path for ${httpMethod} - ${publicPath}`);
            }
            return targetPath;
          });
      }
    }

    const redisKey = `gateway:proxy-routes:${serviceName}`;
    if (routeMap.size > 0) {
      this.logger.info(`Publishing ${routeMap.size} endpoint routes to Redis on key ${redisKey}...`);
      const routesToPublish: Record<string, string> = {};
      for (const [publicPath, methods] of routeMap.entries()) {
        routesToPublish[publicPath] = JSON.stringify(
          Object.fromEntries(methods.toArray((v, k) => [k, v] as const))
        );
      }
      await this.redis.hmset(redisKey, routesToPublish);
      await this.redis.sadd('gateway:proxy-services', serviceName);
    }
  }
}

@Module({})
export class RoutesPublisherModule {
  static forRoot = (serviceName: string): DynamicModule => {
    return {
      module: RoutesPublisherModule,
      providers: [{ provide: serviceNameSymbol, useValue: serviceName }, RoutePublisherService],
      exports: [RoutePublisherService],
      global: true,
    };
  };
}
