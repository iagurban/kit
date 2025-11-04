import { checked, isInteger, isROArray, isString } from '@gurban/kit/core/checks';
import { ExtendedJsonValue } from '@gurban/kit/core/json-type';
import { once } from '@gurban/kit/core/once';
import { createContextualLogger, IBaseLogger } from '@gurban/kit/interfaces/logger-interface';
import { ServiceInfo } from '@gurban/kit/nest/service-info';
import { sleep } from '@gurban/kit/utils/async-utils';
import { notNull } from '@gurban/kit/utils/flow/flow-utils';
import { AnyAnyFunction } from '@gurban/kit/utils/types';
import { FactoryProvider, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectionToken } from '@nestjs/common/interfaces/modules/injection-token.interface';
import { OptionalFactoryDependency } from '@nestjs/common/interfaces/modules/optional-factory-dependency.interface';
import { Redis } from 'ioredis';
import { treeifyError, ZodType } from 'zod/v4';

import { Logger } from '../logger/logger.module';
import { RedisModule } from '../nosql/redis/redis.module';
import { RedisService } from '../nosql/redis/redis.service';
import { RedisFabric } from '../nosql/redis/redis-client.factory';

export type ProcessMessageFunction = (
  data: ExtendedJsonValue,
  messageId: string,
  ctx: { stopped: boolean }
) => Promise<void>;

type ProcessMessageFunctionData = {
  fn: ProcessMessageFunction;
  schema: ZodType;
  name: string;
};

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

type ConsumerConfig = {
  consumerName: string;
  consumersGroup: string;
  streamName: string;
  dlqStreamName: string | undefined;
  staleMessageTimeoutMs: number;
  reclaimSleepMs: number;
  reclaimOnceCount: number;
};

abstract class SomeLoop {
  constructor(
    private readonly redisFabric: RedisFabric,
    protected readonly logger: IBaseLogger,
    protected readonly config: ConsumerConfig
  ) {}

  protected isStarted = false;
  protected isRunning = false;

  abstract loop(): void;

  protected redis?: Redis;

  init() {
    // we are using dedicated redis clients for each long-running request (they will be busy)
    this.redis = this.redisFabric.create();
  }

  async destroy() {
    await this.stop();
    const { redis } = this;
    if (redis) {
      this.redis = undefined;
      await this.redisFabric.kill(redis);
    }
  }

  async start() {
    if (this.isStarted) {
      return;
    }
    this.isStarted = true;
    if (!this.redis) {
      throw new Error('Redis client has not been initialized.');
    }
    void this.loop();
  }

  async stop() {
    this.isStarted = false;
    this.isRunning = false;
    this.redis?.disconnect();
  }

  protected convertArrayToObject(arr: string[]): Record<string, string> {
    const obj: Record<string, string> = {};
    for (let i = 0; i < arr.length; i += 2) {
      obj[arr[i]] = arr[i + 1];
    }
    return obj;
  }

  protected async processWithRetries(
    validatedData: ExtendedJsonValue,
    fn: ProcessMessageFunction,
    messageId: string
  ): Promise<void> {
    const ctx = { stopped: false };
    const to = setTimeout(() => {
      ctx.stopped = true;
    }, this.config.staleMessageTimeoutMs);
    let attempt = 0;
    while (!ctx.stopped) {
      try {
        attempt++;
        await fn(validatedData, messageId, ctx);
        clearTimeout(to);
        return; // Success
      } catch (retryError) {
        this.logger.warn(
          { error: retryError, consumerName: this.config.consumerName, group: this.config.consumersGroup },
          `Attempt ${attempt} failed for message ${messageId}. Retrying...`
        );
        await sleep(1000 + Math.random() * 2000);
      }
    }
    clearTimeout(to);
    throw new Error(
      `Processing failed for message ${messageId} after ${this.config.staleMessageTimeoutMs}ms of retries.`
    );
  }
}

class ConsumptionLoop extends SomeLoop {
  constructor(
    redisFabric: RedisFabric,
    loggerBase: Logger,
    config: ConsumerConfig,
    private readonly processFunction: () => ProcessMessageFunctionData | null
  ) {
    super(redisFabric, createContextualLogger(loggerBase, ConsumptionLoop.name), config);
  }

  private async acknowledgeStream(streamName: string, consumersGroup: string, messageId: string) {
    await notNull(this.redis).xack(streamName, consumersGroup, messageId);
  }

  async loop() {
    const processFunction = this.processFunction();
    if (this.isRunning || !processFunction) {
      return;
    }

    const { consumersGroup, consumerName, streamName: inputStreamName } = this.config;

    this.logger.info(
      { consumerName, group: consumersGroup },
      `Starting consumption loop for ${inputStreamName} with function ${processFunction.name}...`
    );
    this.isRunning = true;
    while (this.isRunning) {
      let messageId: string | null = null;
      try {
        this.logger.debug(`XREADGROUP going to wait for new events`);
        const result = (await notNull(this.redis).xreadgroup(
          'GROUP',
          consumersGroup,
          consumerName,
          'COUNT',
          1,
          'BLOCK',
          0,
          'STREAMS',
          inputStreamName,
          '>'
        )) as XReadGroupResult | null;
        this.logger.debug(`XREADGROUP has exit`);

        if (!result) {
          continue;
        }

        const [streamName, messages] = result[0];
        for (const [msgId, rawMessage] of messages) {
          messageId = msgId;
          const dataObject = this.convertArrayToObject(rawMessage);

          const parsed = JSON.parse(dataObject.data);
          const validationResult = processFunction.schema.safeParse(parsed);
          if (!validationResult.success) {
            this.logger.error(
              {
                error: treeifyError(validationResult.error),
                consumerName,
                group: consumersGroup,
              },
              `Zod validation failed for message ${messageId}:`
            );
            await this.acknowledgeStream(streamName, consumersGroup, messageId);
            continue;
          }

          await this.processWithRetries(
            validationResult.data as ExtendedJsonValue,
            processFunction.fn,
            messageId
          );
          await this.acknowledgeStream(streamName, consumersGroup, messageId);
        }
      } catch (error) {
        // If the loop is stopping, this error is expected.
        if (!this.isRunning) {
          this.logger.info('Consumption loop is stopping.');
          break;
        }
        this.logger.error(
          { error },
          `[${consumerName}] Processing failed for message ${messageId} after all retries. Leaving for reclaim worker.`
        );
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
}

class ReclaimLoop extends SomeLoop {
  constructor(
    redisFabric: RedisFabric,
    loggerBase: Logger,
    config: ConsumerConfig,
    private readonly processFunction: () => ProcessMessageFunctionData | null
  ) {
    super(redisFabric, createContextualLogger(loggerBase, ReclaimLoop.name), config);
  }

  private async acknowledgeReclaim(claimedId: string) {
    await notNull(this.redis).xack(this.config.streamName, this.config.consumersGroup, claimedId);
  }

  private async fetchPending(): Promise<XPendingResult> {
    const result = await notNull(this.redis).xpending(
      this.config.streamName,
      this.config.consumersGroup,
      'IDLE',
      this.config.staleMessageTimeoutMs,
      '-',
      '+',
      this.config.reclaimOnceCount // Check up to 10 stale messages at a time
    );

    return result
      .map(r => checked(r, isROArray, () => `Pending result is not an array`))
      .map(([messageId, consumerName, idleTime, deliveryCount]) => ({
        consumerName: checked(consumerName, isString, () => `Consumer name is not a string`),
        messageId: checked(messageId, isString, () => `Message ID is not a string`),
        deliveryCount: checked(deliveryCount, isInteger, () => `Delivery count is not a string`),
        idleTime: checked(idleTime, isInteger, () => `Idle time is not a string`),
      }));
  }

  private async performClaim(messageId: string, minIdleTime: string | number | Buffer<ArrayBufferLike>) {
    return (await notNull(this.redis).xclaim(
      this.config.streamName,
      this.config.consumersGroup,
      this.config.consumerName,
      minIdleTime,
      messageId
    )) as XClaimResult;
  }

  private async deadLetter(messageId: string, error: string, fields?: string[]): Promise<void> {
    // Check if a DLQ is configured for this consumer.
    if (!this.config.dlqStreamName) {
      this.logger.warn(
        `[${this.config.consumerName}] DLQ is not configured. Discarding failed message ${messageId}.`
      );
      return;
    }

    const dataPayload = fields ? JSON.stringify(this.convertArrayToObject(fields)) : 'unknown';

    await notNull(this.redis).xadd(
      this.config.dlqStreamName,
      '*',
      'message_id',
      messageId,
      'error',
      error,
      'data',
      dataPayload
    );
  }

  async loop(): Promise<void> {
    const processFunction = this.processFunction();
    if (this.isRunning || !processFunction) {
      return;
    }

    const { consumersGroup, consumerName, reclaimSleepMs, staleMessageTimeoutMs } = this.config;
    this.logger.trace(
      { consumerName, group: consumersGroup },
      `Starting reclaim loop for ${processFunction.name}...`
    );
    const maxRetries = 3; // Example max retries for reclaimed messages

    this.isRunning = true;
    while (this.isRunning) {
      try {
        const pendingResult = await this.fetchPending();

        if (!pendingResult?.length) {
          // If no stale messages, sleep for a while before checking again.
          await sleep(reclaimSleepMs);
          continue;
        }

        for (const pendingInfo of pendingResult) {
          if (!this.isRunning) {
            break;
          } // Check flag before processing each message

          if (pendingInfo.deliveryCount > maxRetries) {
            this.logger.error(
              { consumerName, group: consumersGroup },
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
            { consumerName, group: consumersGroup },
            `Reclaiming stale message ${pendingInfo.messageId} (delivered ${pendingInfo.deliveryCount} times)...`
          );
          const claimResult = await this.performClaim(pendingInfo.messageId, staleMessageTimeoutMs);
          if (claimResult && claimResult.length > 0) {
            const [claimedId, fields] = claimResult[0];
            const dataObject = this.convertArrayToObject(fields);
            const parsed = JSON.parse(dataObject.data);
            const validationResult = processFunction.schema.safeParse(parsed);

            // On reclaim, we are stricter. If validation or processing fails, it goes to DLQ.
            if (!validationResult.success) {
              await this.deadLetter(claimedId, 'Zod validation failed', fields);
            } else {
              await this.processWithRetries(
                validationResult.data as ExtendedJsonValue,
                processFunction.fn,
                claimedId
              );
            }
            await this.acknowledgeReclaim(claimedId);
          }
        }
      } catch (error) {
        // If the loop is stopping, this error is expected.
        if (!this.isRunning) {
          this.logger.info('Reclaim loop is stopping.');
          break;
        }
        this.logger.error({ error, consumerName, group: consumersGroup }, `Error in reclaim loop:`);
        await sleep(5000);
      }
    }
  }
}

/**
 * A non-injectable class that encapsulates the logic for consuming messages
 * from a Redis stream. Instances are created and managed via the static `provide` method.
 */
@Injectable()
export class MqConsumer implements OnModuleInit, OnModuleDestroy {
  private processFunction: ProcessMessageFunctionData | null = null;

  private readonly config: ConsumerConfig;

  private readonly consumptionLoop: ConsumptionLoop;
  private readonly reclaimLoop: ReclaimLoop;

  private readonly loops: readonly SomeLoop[];

  constructor(
    config: MqConsumerConfig,
    private readonly redis: RedisService,
    private readonly loggerBase: Logger
  ) {
    this.config = {
      consumerName: config.consumerName,
      consumersGroup: config.consumersGroup,
      streamName: config.streamName,
      dlqStreamName:
        typeof config.dlqStreamName === 'string'
          ? config.dlqStreamName
          : config.dlqStreamName === true
            ? `${config.streamName}-dlq`
            : undefined,
      staleMessageTimeoutMs: config.staleMessageTimeoutMs ?? 60000,
      reclaimSleepMs: config.reclaimSleepMs ?? 10000,
      reclaimOnceCount: config.reclaimOnceCount ?? 2,
    };

    this.consumptionLoop = new ConsumptionLoop(
      config.redisFabric,
      loggerBase,
      this.config,
      () => this.processFunction
    );

    this.reclaimLoop = new ReclaimLoop(
      config.redisFabric,
      loggerBase,
      this.config,
      () => this.processFunction
    );

    this.loops = [this.consumptionLoop, this.reclaimLoop];
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, MqConsumer.name);
  }

  async onModuleInit() {
    this.loops.forEach(loop => loop.init());
    await this.createGroupIfNotExists();
  }

  async onModuleDestroy() {
    await this.stop();
    await Promise.all(this.loops.map(loop => loop.destroy()));
  }

  public setHandler(handler: ProcessMessageFunction, schema: ZodType, name: string): void {
    this.logger.debug({ handler: handler.name }, `setHandler`);
    if (typeof handler !== 'function') {
      throw new Error('Handler must be a function.');
    }
    this.processFunction = { fn: handler, schema, name };
    void this.start();
  }

  public async start(): Promise<void> {
    this.loops.forEach(loop => loop.start());
  }

  public async stop(): Promise<void> {
    await Promise.all(this.loops.map(loop => loop.stop()));
  }

  private async createGroupIfNotExists() {
    try {
      await notNull(this.redis).xgroup(
        'CREATE',
        this.config.streamName,
        this.config.consumersGroup,
        '0',
        'MKSTREAM'
      );
    } catch (error) {
      if (error instanceof Error && error.message.includes('BUSYGROUP')) {
        // The group already exists, which is fine.
      } else {
        throw error;
      }
    }
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
      inject: [Logger, ServiceInfo, RedisService, ...(options.inject || [])],
      useFactory: (async (loggerBase: Logger, serviceInfo: ServiceInfo, redis: RedisService, ...args) => {
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
        return new MqConsumer(fullConfig, redis, loggerBase);
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
