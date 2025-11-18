import { DynamicModule } from '@nestjs/common';
import { ForwardReference } from '@nestjs/common/interfaces/modules/forward-reference.interface';
import { InjectionToken } from '@nestjs/common/interfaces/modules/injection-token.interface';
import { OptionalFactoryDependency } from '@nestjs/common/interfaces/modules/optional-factory-dependency.interface';
import { Type } from '@nestjs/common/interfaces/type.interface';

import { AnyFunction } from '../core/utils/types';

export type DynamicModuleFabric<T> = {
  imports?: (Type | DynamicModule | Promise<DynamicModule> | ForwardReference)[];
  useFactory: AnyFunction<Promise<T> | T>;
  inject?: (InjectionToken | OptionalFactoryDependency)[];
  global?: boolean;
};
