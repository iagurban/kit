import { Injectable, OnModuleInit, Type } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { IWithModuleRef } from '@poslah/util/with-module-ref.interface';

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
    private readonly reflector: Reflector
  ) {}

  async onModuleInit() {
    await this.findAndRegisterHandlers();
  }

  async findAndRegisterHandlers() {
    const providers: InstanceWrapper[] = this.discoveryService.getProviders();

    for (const wrapper of providers) {
      const { instance } = wrapper;
      const prototype = instance ? Object.getPrototypeOf(instance) : null;

      if (!instance || !prototype) {
        continue;
      }

      // The flawed and incorrect moduleRef assignment has been removed.
      // We now rely on the service to correctly implement IWithModuleRef and have ModuleRef injected.

      // Use the modern, non-deprecated method for finding methods.
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

    // Ensure the instance has the moduleRef to resolve the consumer
    if (!(instance as IWithModuleRef).moduleRef) {
      throw new Error(
        `The service "${(instance as { constructor: { name: string } }).constructor.name}" uses @RedisStreamHandler but does not have a 'moduleRef' property or does not implement IWithModuleRef correctly.`
      );
    }

    const moduleRef = (instance as IWithModuleRef).moduleRef;

    try {
      const consumer = moduleRef.get<RedisStreamConsumer>(providerToken, {
        strict: false,
      });
      consumer.setHandler(methodRef.bind(instance), schema);
    } catch (error) {
      console.error(
        `Failed to find a provider for token "${providerToken}". Make sure a consumer for stream "${streamName}" is provided in the module.`,
        error
      );
    }
  }
}
