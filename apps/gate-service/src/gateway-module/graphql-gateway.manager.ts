import { checked, isInteger } from '@gurban/kit/core/checks';
import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Nullish } from '@gurban/kit/utils/types';
import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';
import { Logger } from '@poslah/util/modules/logger/logger.module';

import { GraphqlAppModule } from '../graphql-app-module/graphql-app.module';
import { RegistryConsumerService } from './registry-consumer.service';

@Injectable()
export class GraphqlGatewayManager implements OnModuleInit, OnApplicationShutdown {
  private graphqlApp: { app: NestFastifyApplication; sdl: string } | null = null;
  private subscription: (() => void) | undefined;

  readonly internalPort: number;

  constructor(
    private readonly registry: RegistryConsumerService,
    private readonly loggerBase: Logger,
    private readonly config: ConfigService
  ) {
    this.internalPort = checked(
      Number(config.get(`GATE_GRAPHQL_INTERNAL_PORT`, 34982)),
      isInteger,
      () => `GATE_GRAPHQL_INTERNAL_PORT must be integer`
    );
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, GraphqlGatewayManager.name);
  }

  async onModuleInit() {
    this.subscription = this.registry.supergraphSdlResource.subscribe(() => {
      this.restartGraphqlApp();
    });
    await this.restartGraphqlApp();
  }

  private async create(sdl: string): Promise<Exclude<typeof this.graphqlApp, Nullish>> {
    const dynamicModule = GraphqlAppModule.forRoot(sdl);
    const origins = new Set(
      this.config
        .getOrThrow<string>(`ALLOWED_ORIGINS_CSV`)
        .split(',')
        .map(s => s.trim())
    );
    return {
      app: await fastifyBootstrap(dynamicModule, null, {
        noHotReload: true,
        cors: {
          origin: (origin, cb) => {
            const allowed = !origin || origins.has(origin);
            this.logger.info({ origin, allowed }, 'graphql-gateway cors check origin:');
            cb(null, allowed);
          },
          credentials: true,
          methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
        },
      }),
      sdl,
    } as const;
  }

  async onApplicationShutdown() {
    this.subscription?.();
    await this.graphqlApp?.app.close();
  }

  private restartingPromise: Promise<Exclude<typeof this.graphqlApp, Nullish>['app'] | undefined> | null =
    null;

  private async restartGraphqlApp(): Promise<void> {
    this.restartingPromise = (this.restartingPromise || Promise.resolve())
      .then(async () => {
        this.logger.warn('Restarting GraphQL App module...');

        const oldApp = this.graphqlApp?.app;

        const supergraphSdl = await this.registry.supergraphSdlResource.fetch();
        if (!supergraphSdl) {
          this.logger.error('Could not fetch new supergraph SDL. GraphQL endpoint will be unavailable.');
          return oldApp;
        }

        if (supergraphSdl === this.graphqlApp?.sdl) {
          this.logger.debug('Supergraph SDL is same. Skipping restarting the app.');
          return oldApp;
        }

        const graphqlApp = await this.create(supergraphSdl);

        this.graphqlApp = null;
        await oldApp?.close();

        await graphqlApp.app.listen(this.internalPort, 'localhost');
        this.graphqlApp = graphqlApp;

        this.logger.info(`✅ New GraphQL App instance is active and listening on port ${this.internalPort}.`);

        return graphqlApp.app;
      })
      .catch(error => {
        this.logger.error({ error }, `Error while restartGraphqlApp()`);
        return undefined;
      });
  }

  async waitForAvailability(): Promise<void> {
    await this.restartingPromise;
  }
}
