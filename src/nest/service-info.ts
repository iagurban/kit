import { DynamicModule, Injectable, Module, Provider } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class ServiceInfo {
  public readonly name: string;
  public readonly shortName: string;
  public readonly clientName: string;

  protected constructor(name: string, shortName?: string) {
    this.name = name;
    this.shortName = shortName ?? name;

    const randomId = randomBytes(4).toString('hex');
    this.clientName = `${this.name}-${randomId}`;
  }

  static provide(name: string, shortName?: string): Provider {
    return {
      provide: ServiceInfo,
      useFactory: () => new ServiceInfo(name, shortName),
    };
  }
}

@Module({})
export class ServiceInfoModule {
  static forRootGlobal(name: string, shortName?: string): DynamicModule {
    const serviceInfo = ServiceInfo.provide(name, shortName);
    return {
      module: ServiceInfoModule,
      global: true,
      providers: [serviceInfo],
      exports: [serviceInfo],
    };
  }
}
