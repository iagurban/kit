import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { notNull } from '@gurban/kit/utils/flow/flow-utils';
import { Injectable, OnModuleInit, Type } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { Logger } from '../../../logger/logger.module';
import { IWithModuleRef } from '../../../with-module-ref.interface';
import { RedisStreamConsumer } from './redis-sream.consumer';
import {
  REDIS_STREAM_HANDLER_METADATA,
  RedisStreamHandlerNestMetadata,
} from './redis-stream-handler.decorator';

@Injectable()
export class RedisStreamDiscoveryService implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, RedisStreamDiscoveryService.name);
  }

  async onModuleInit() {
    await this.findAndRegisterHandlers();
  }

  async findAndRegisterHandlers() {
    const providers: InstanceWrapper[] = [
      ...this.discoveryService.getProviders(),
      ...this.discoveryService.getControllers(),
    ];

    for (const wrapper of providers) {
      const { instance } = wrapper;
      const prototype = instance ? Object.getPrototypeOf(instance) : null;

      if (!instance || !prototype) {
        continue;
      }

      const methodNames = this.metadataScanner.getAllMethodNames(prototype);
      await Promise.all(methodNames.map(methodName => this.registerHandler(instance, methodName)));
    }
  }

  private async registerHandler(instance: unknown, methodName: string) {
    const methodRef = (instance as Record<string, Type>)[methodName];
    const metadata = this.reflector.get(REDIS_STREAM_HANDLER_METADATA, methodRef);

    if (!metadata) {
      return;
    }

    const { streamName, schema } = metadata as RedisStreamHandlerNestMetadata;
    const providerToken = `RedisStreamConsumer-${streamName}`;

    const instanceName = (instance as { constructor: { name: string } }).constructor.name;

    const moduleRef = notNull(
      (instance as IWithModuleRef).moduleRef,
      () =>
        new Error(
          `The service "${instanceName}" uses @RedisStreamHandler but does not have a 'moduleRef' property or does not implement IWithModuleRef correctly.`
        )
    );

    try {
      moduleRef
        .get<RedisStreamConsumer>(providerToken, {
          strict: false,
        })
        .setHandler(methodRef.bind(instance), schema, `${instanceName}/${methodName}`);
    } catch (error) {
      this.logger.error(
        { error },
        `Failed to find a provider for token "${providerToken}". Make sure a stream "${streamName}" is declared in the RedisStreamConsumerModule.forRoot().`
      );
      throw error;
    }
  }
}
