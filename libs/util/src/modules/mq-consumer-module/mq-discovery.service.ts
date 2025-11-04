import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Injectable, OnApplicationBootstrap, Type } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, ModuleRef, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { Logger } from '../logger/logger.module';
import { MqConsumer } from './mq.consumer';
import { MQ_HANDLER_METADATA, MqHandlerNestMetadata } from './mq-handler.decorator';

@Injectable()
export class MqDiscoveryService implements OnApplicationBootstrap {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly loggerBase: Logger,
    readonly moduleRef: ModuleRef
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, MqDiscoveryService.name);
  }

  async onApplicationBootstrap() {
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
    const metadata = this.reflector.get(MQ_HANDLER_METADATA, methodRef);

    if (!metadata) {
      return;
    }

    const { streamName, schema } = metadata as MqHandlerNestMetadata;
    const providerToken = `RedisStreamConsumer-${streamName}`;

    const instanceName = (instance as { constructor: { name: string } }).constructor.name;

    try {
      this.moduleRef
        .get<MqConsumer>(providerToken, { strict: false })
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
