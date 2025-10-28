import { ExtendedJsonValue } from '@gurban/kit/core/json-type';
import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { ServiceInfo } from '@gurban/kit/nest/service-info';
import { sleep } from '@gurban/kit/utils/async-utils';
import { notNull } from '@gurban/kit/utils/flow/flow-utils';
import { AnyAnyFunction } from '@gurban/kit/utils/types';
import { FactoryProvider, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectionToken } from '@nestjs/common/interfaces/modules/injection-token.interface';
import { OptionalFactoryDependency } from '@nestjs/common/interfaces/modules/optional-factory-dependency.interface';
import { Redis } from 'ioredis';
import { treeifyError, ZodType } from 'zod/v4';

import { Logger } from '../logger/logger.module';
import { RedisModule } from '../nosql/redis/redis.module';
import { RedisFabric } from '../nosql/redis/redis-client.factory';

export type ProcessMessageFunction = (
  data: ExtendedJsonValue,
  messageId: string,
  ctx: { stopped: boolean }
) => Promise<void>;

export interface MqConsumerConfigBase {
  redisFabric: RedisFabric;
  consumerName: string;
  consumersGroup: string;
  staleMessageTimeoutMs?: number; // Configurable stale period
  reclaimSleepMs?: number; // Configurable sleep period
  dlqStreamName?: string | boolean;
  reclaimOnceCount?: number;
}

export interface MqConsumerConfig extends MqConsumerConfigBase {
  streamName: string;
}

type MqConsumerConfigBaseInput = Omit<MqConsumerConfigBase, `consumersGroup`> & {
  consumersGroup:
    | string /* postfix to service name */
    | {
        /* full name (dangerous - can be shared group because of group names interference */
        fullConsumersGroupName: string;
      }
    | null /* use service name as a group name */;
};

// The options-interface is now simpler and more direct.
export interface MqConsumerProviderOptions {
  inject?: (InjectionToken | OptionalFactoryDependency)[];
  /**
   * Factory function that returns the complete configuration for the consumer,
   * including the RedisFabric instance.
   */
  useFactory: AnyAnyFunction<Promise<MqConsumerConfigBaseInput> | MqConsumerConfigBaseInput>;
}

// Type definition for the complex result of the XREADGROUP command
type XReadGroupResult = [string, [string, string[]][]][] | null;

type XClaimResult = [string, string[]][] | null;

type XPendingResult =
  | {
      messageId: string;
      consumerName: string;
      idleTime: number;
      deliveryCount: number;
    }[]
  | null;

/**
 * A non-injectable class that encapsulates the logic for consuming messages
 * from a Redis stream. Instances are created and managed via the static `provide` method.
 */
export class MqConsumer implements OnModuleInit, OnModuleDestroy {
  private redis?: Redis; // Client for the main consumption loop
  private reclaimRedis?: Redis; // Dedicated client for the reclaim loop
  private isRunning = false;
  private isReclaiming = false;
  private processFunction: { fn: ProcessMessageFunction; schema: ZodType; name: string } | null = null;

  private readonly redisFabric: RedisFabric;
  private readonly consumerName: string;
  private readonly consumersGroup: string;
  private readonly streamName: string;
  private readonly staleMessageTimeoutMs: number;
  private readonly reclaimSleepMs: number;
  private readonly dlqStreamName?: string;
  private readonly reclaimOnceCount: number;

  constructor(
    config: MqConsumerConfig,
    private readonly loggerBase: Logger
  ) {
    this.redisFabric = config.redisFabric;
    this.consumerName = config.consumerName;
    this.consumersGroup = config.consumersGroup;
    this.streamName = config.streamName;
    this.dlqStreamName =
      typeof config.dlqStreamName === 'string'
        ? config.dlqStreamName
        : config.dlqStreamName === true
          ? `${this.streamName}-dlq`
          : undefined;
    this.reclaimOnceCount = config.reclaimOnceCount ?? 2;
    // Set configurable values with sensible defaults
    this.staleMessageTimeoutMs = config.staleMessageTimeoutMs ?? 60000;
    this.reclaimSleepMs = config.reclaimSleepMs ?? 10000; // Sleep for 10 sec if no stale messages found
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, MqConsumer.name);
  }

  async onModuleInit() {
    // we are using dedicated redis clients for each long-running request (they will be busy)
    this.redis = this.redisFabric.create();
    this.reclaimRedis = this.redisFabric.create();
    await this.start();
  }

  async onModuleDestroy() {
    await this.stop();
    if (this.redis) {
      await this.redisFabric.kill(this.redis);
    }
    if (this.reclaimRedis) {
      await this.redisFabric.kill(this.reclaimRedis);
    }
  }

  public setHandler(handler: ProcessMessageFunction, schema: ZodType, name: string): void {
    if (typeof handler !== 'function') {
      throw new Error('Handler must be a function.');
    }
    this.processFunction = { fn: handler, schema, name };
    if (!this.isRunning && this.redis) {
      void this.startConsumptionLoop();
    }
  }

  public async start(): Promise<void> {
    if (this.isRunning) {
      return;
    }
    if (!this.redis || !this.reclaimRedis) {
      throw new Error('Redis clients have not been initialized.');
    }

    await this.createGroupIfNotExists();

    // Start both loops in parallel
    void this.startConsumptionLoop();

    this.isRunning = true;
    this.isReclaiming = true;
  }

  public async stop(): Promise<void> {
    this.isRunning = false;
    this.isReclaiming = false;
  }

  private async createGroupIfNotExists() {
    try {
      await notNull(this.redis).xgroup('CREATE', this.streamName, this.consumersGroup, '0', 'MKSTREAM');
    } catch (error) {
      if (error instanceof Error && error.message.includes('BUSYGROUP')) {
        // The group already exists, which is fine.
      } else {
        throw error;
      }
    }
  }

  private async performClaim(messageId: string, minIdleTime: string | number | Buffer<ArrayBufferLike>) {
    return (await notNull(this.reclaimRedis).xclaim(
      this.streamName,
      this.consumersGroup,
      this.consumerName,
      minIdleTime,
      messageId
    )) as XClaimResult;
  }

  private async deadLetter(messageId: string, error: string, fields?: string[]): Promise<void> {
    // Check if a DLQ is configured for this consumer.
    if (!this.dlqStreamName) {
      this.logger.warn(
        `[${this.consumerName}] DLQ is not configured. Discarding failed message ${messageId}.`
      );
      return;
    }

    const dataPayload = fields ? JSON.stringify(this.convertArrayToObject(fields)) : 'unknown';

    await notNull(this.reclaimRedis).xadd(
      this.dlqStreamName,
      '*',
      'message_id',
      messageId,
      'error',
      error,
      'data',
      dataPayload
    );
  }

  private async acknowledgeReclaim(claimedId: string) {
    await notNull(this.reclaimRedis).xack(this.streamName, this.consumersGroup, claimedId);
  }

  private async acknowledgeStream(streamName: string, messageId: string) {
    await notNull(this.redis).xack(streamName, this.consumersGroup, messageId);
  }

  private async startConsumptionLoop(): Promise<void> {
    if (this.isRunning || !this.processFunction) {
      return;
    }

    void this.startReclaimLoop();

    this.logger.info(
      { consumerName: this.consumerName, group: this.consumersGroup },
      `Starting consumption loop for ${this.processFunction.name}...`
    );
    while (this.isRunning) {
      let messageId: string | null = null;
      try {
        const result = (await notNull(this.redis).xreadgroup(
          'GROUP',
          this.consumersGroup,
          this.consumerName,
          'COUNT',
          1,
          'BLOCK',
          0,
          'STREAMS',
          this.streamName,
          '>'
        )) as XReadGroupResult | null;

        if (!result) {
          continue;
        }

        const [streamName, messages] = result[0];
        for (const [msgId, rawMessage] of messages) {
          messageId = msgId;
          const dataObject = this.convertArrayToObject(rawMessage);

          const validationResult = this.processFunction.schema.safeParse(dataObject);
          if (!validationResult.success) {
            this.logger.error(
              {
                error: treeifyError(validationResult.error),
                consumerName: this.consumerName,
                group: this.consumersGroup,
              },
              `Zod validation failed for message ${messageId}:`
            );
            await this.acknowledgeStream(streamName, messageId);
            continue;
          }

          await this.processWithRetries(validationResult.data as ExtendedJsonValue, messageId);
          await this.acknowledgeStream(streamName, messageId);
        }
      } catch (error) {
        this.logger.error(
          { error },
          `[${this.consumerName}] Processing failed for message ${messageId} after all retries. Leaving for reclaim worker.`
        );
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  private async fetchPending() {
    return (await notNull(this.reclaimRedis).xpending(
      this.streamName,
      this.consumersGroup,
      'IDLE',
      this.staleMessageTimeoutMs,
      '-',
      '+',
      this.reclaimOnceCount // Check up to 10 stale messages at a time
    )) as XPendingResult;
  }

  /**
   * A separate, parallel loop that runs periodically to find and process stale messages.
   */
  private async startReclaimLoop(): Promise<void> {
    if (this.isRunning || !this.processFunction) {
      return;
    }

    this.logger.silent(
      { consumerName: this.consumerName, group: this.consumersGroup },
      `Starting reclaim loop for ${this.processFunction.name}...`
    );
    const maxRetries = 3; // Example max retries for reclaimed messages

    while (this.isReclaiming) {
      try {
        const pendingResult = await this.fetchPending();

        if (!pendingResult?.length) {
          // If no stale messages, sleep for a while before checking again.
          await sleep(this.reclaimSleepMs);
          continue;
        }

        for (const pendingInfo of pendingResult) {
          if (!this.isReclaiming) {
            break;
          } // Check flag before processing each message

          if (pendingInfo.deliveryCount > maxRetries) {
            this.logger.error(
              { consumerName: this.consumerName, group: this.consumersGroup },
              `Message ${pendingInfo.messageId} exceeded max retries. Moving to DLQ.`
            );
            const claimResult = await this.performClaim(pendingInfo.messageId, 0);
            if (claimResult && claimResult.length > 0) {
              const [claimedId, fields] = claimResult[0];
              await this.deadLetter(claimedId, `Exceeded ${maxRetries} retries.`, fields);
              await this.acknowledgeReclaim(claimedId);
            }
            continue;
          }

          this.logger.warn(
            { consumerName: this.consumerName, group: this.consumersGroup },
            `Reclaiming stale message ${pendingInfo.messageId} (delivered ${pendingInfo.deliveryCount} times)...`
          );
          const claimResult = await this.performClaim(pendingInfo.messageId, this.staleMessageTimeoutMs);
          if (claimResult && claimResult.length > 0) {
            const [claimedId, fields] = claimResult[0];
            const dataObject = this.convertArrayToObject(fields);
            const validationResult = notNull(this.processFunction).schema.safeParse(dataObject);

            // On reclaim, we are stricter. If validation or processing fails, it goes to DLQ.
            if (!validationResult.success) {
              await this.deadLetter(claimedId, 'Zod validation failed', fields);
            } else {
              await this.processWithRetries(validationResult.data as ExtendedJsonValue, claimedId);
            }
            await this.acknowledgeReclaim(claimedId);
          }
        }
      } catch (error) {
        this.logger.error(
          { error, consumerName: this.consumerName, group: this.consumersGroup },
          `Error in reclaim loop:`
        );
        await sleep(5000);
      }
    }
  }

  private async processWithRetries(validatedData: ExtendedJsonValue, messageId: string): Promise<void> {
    const ctx = { stopped: false };
    const to = setTimeout(() => {
      ctx.stopped = true;
    }, this.staleMessageTimeoutMs);
    let attempt = 0;
    while (!ctx.stopped) {
      try {
        attempt++;
        await notNull(this.processFunction).fn(validatedData, messageId, ctx);
        clearTimeout(to);
        return; // Success
      } catch (retryError) {
        this.logger.warn(
          { error: retryError, consumerName: this.consumerName, group: this.consumersGroup },
          `Attempt ${attempt} failed for message ${messageId}. Retrying...`
        );
        await sleep(1000 + Math.random() * 2000);
      }
    }
    clearTimeout(to);
    throw new Error(
      `Processing failed for message ${messageId} after ${this.staleMessageTimeoutMs}ms of retries.`
    );
  }

  private convertArrayToObject(arr: string[]): Record<string, string> {
    const obj: Record<string, string> = {};
    for (let i = 0; i < arr.length; i += 2) {
      obj[arr[i]] = arr[i + 1];
    }
    return obj;
  }

  /**
   * Creates a custom NestJS provider for a RedisStreamConsumer instance.
   * @param streamName The name of the Redis stream to consume.
   * @param options The factory options for creating the consumer instance.
   * @returns A NestJS Provider.
   */
  public static provide(streamName: string, options: MqConsumerProviderOptions): FactoryProvider<MqConsumer> {
    const token = `RedisStreamConsumer-${streamName}`;

    return {
      provide: token,
      inject: [Logger, ServiceInfo, ...(options.inject || [])],
      useFactory: (async (loggerBase: Logger, serviceInfo: ServiceInfo, ...args) => {
        const consumerConfig = await options.useFactory(...args);

        if (!consumerConfig.redisFabric) {
          throw new Error(
            `RedisFabric must be provided in the useFactory for stream consumer: ${streamName}`
          );
        }

        const { consumersGroup } = consumerConfig;
        const fullConfig = {
          ...consumerConfig,
          streamName,
          consumersGroup:
            consumersGroup == null
              ? serviceInfo.name
              : typeof consumersGroup === `string`
                ? `${serviceInfo.name}-${consumersGroup}`
                : consumersGroup.fullConsumersGroupName,
        } satisfies MqConsumerConfig;
        return new MqConsumer(fullConfig, loggerBase);
      }) as AnyAnyFunction<Promise<MqConsumer> | MqConsumer>,
    };
  }

  public static provideDefault(
    streamName: string,
    consumersGroup:
      | string /* postfix to service name */
      | {
          /* full name (dangerous - can be shared group because of group names interference */
          fullConsumersGroupName: string;
        }
      | null /* use service name as a group name */,
    redisFabricConfig: string = `default`
  ): FactoryProvider<MqConsumer> {
    return MqConsumer.provide(streamName, {
      inject: [ServiceInfo, RedisModule.getRedisFabricToken(redisFabricConfig)],
      useFactory: ({ clientName: consumerName }: ServiceInfo, redisFabric: RedisFabric) => ({
        redisFabric,
        consumerName,
        consumersGroup,
      }),
    });
  }
}
