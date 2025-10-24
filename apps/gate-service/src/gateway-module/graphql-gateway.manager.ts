import { checked, isInteger } from '@gurban/kit/core/checks';
import { once } from '@gurban/kit/core/once';
import { Nullish } from '@gurban/kit/utils/types';
import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastifyBootstrap } from '@poslah/util/fastify-bootstrap';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';

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
    this.logger.info('Initializing Gateway Manager...');
    this.subscription = this.registry.supergraphSdlResource.subscribe(() => {
      this.registry.supergraphSdlResource.fetch(true);
      this.restartGraphqlApp();
    });
    await this.restartGraphqlApp();
  }

  private async create(sdl: string): Promise<Exclude<typeof this.graphqlApp, Nullish>> {
    const dynamicModule = GraphqlAppModule.forRoot(sdl);
    return {
      app: await fastifyBootstrap(dynamicModule, null, {
        noHotReload: true,
        cors: {
          origin: (origin, cb) => {
            console.log('graphql-gateway cors check origin:', origin);
            cb(
              null,
              !origin || origin === `https://localhost:${this.config.getOrThrow(`WEB_CLIENT_PORT`, '3000')}`
            );
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
          this.logger.error('Supergraph SDL is same. Skipping restarting the app.');
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
