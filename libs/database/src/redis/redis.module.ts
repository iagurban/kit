import { AnyFunction } from '@gurban/kit/utils/types';
import { Abstract, DynamicModule, ForwardReference, Inject, Module, Provider } from '@nestjs/common';
import { InjectionToken } from '@nestjs/common/interfaces/modules/injection-token.interface';
import { OptionalFactoryDependency } from '@nestjs/common/interfaces/modules/optional-factory-dependency.interface';
import { NestImportable } from '@poslah/util/nest-types';

import { RedisFabric, RedisFabricOptions } from './redis-client.factory';
import { RedisScriptManager } from './redis-script-manager';

/** Configuration options for a single Redis instance. */
export type RedisOptions = {
  instance?: InjectionToken;
} & (
  | { useConfig: string }
  | {
      imports?: NestImportable[];
      useFactory: AnyFunction<Promise<RedisFabricOptions> | RedisFabricOptions>;
      inject?: (InjectionToken | OptionalFactoryDependency)[];
    }
);

/** The map of named configurations passed to forRoot. */
export type RedisConfig = Record<string, RedisOptions>;

@Module({})
export class RedisModule {
  // Helper to generate the token for the transient factory (Fabric)
  static readonly getRedisFabricToken = (name: string = `default`) => `REDIS_FABRIC_${name}`;

  public static forRoot(config: RedisConfig, global?: boolean): DynamicModule {
    const providers: Provider[] = [RedisScriptManager];
    const exports: (
      | DynamicModule
      | string
      | symbol
      | Provider
      | ForwardReference
      | Abstract<unknown>
      | AnyFunction
    )[] = [RedisScriptManager];
    const imports: NestImportable[] = [];

    // --- Create a Fabric Provider for each named configuration ---
    for (const name in config) {
      if (!Object.prototype.hasOwnProperty.call(config, name)) {
        continue;
      }

      const options = config[name];
      const fabricToken = RedisModule.getRedisFabricToken(name);

      if ('useFactory' in options) {
        providers.push(RedisFabric.provide(fabricToken, options));
        imports.push(...(options.imports || []));
      } else if ('useConfig' in options) {
        // Handle aliasing
        providers.push({
          provide: fabricToken,
          useExisting: RedisModule.getRedisFabricToken(options.useConfig),
        });
      }
      exports.push(fabricToken);
    }

    // --- Create a Singleton Instance Provider where requested ---
    for (const name in config) {
      if (!Object.prototype.hasOwnProperty.call(config, name)) {
        continue;
      }

      const { instance: instanceToken } = config[name];
      if (instanceToken) {
        const fabricToken = RedisModule.getRedisFabricToken(name);

        const instanceProvider: Provider = {
          provide: instanceToken,
          inject: [fabricToken], // Depends only on its fabric
          useFactory: async (fabric: RedisFabric) => {
            const client = fabric.create();
            // Verify the connection on startup
            await client.ping();
            return client;
          },
        };
        providers.push(instanceProvider);
        exports.push(instanceToken);
      }
    }

    return {
      module: RedisModule,
      providers,
      exports,
      imports,
      global,
    };
  }
}

// Custom decorator for injecting the Redis Fabric
export const InjectRedisFabric = (name: string = `default`) => Inject(RedisModule.getRedisFabricToken(name));
