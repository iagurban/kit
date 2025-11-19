import { DynamicModule } from '@nestjs/common';
import { ForwardReference } from '@nestjs/common/interfaces/modules/forward-reference.interface';
import { InjectionToken } from '@nestjs/common/interfaces/modules/injection-token.interface';
import { OptionalFactoryDependency } from '@nestjs/common/interfaces/modules/optional-factory-dependency.interface';
import { Type } from '@nestjs/common/interfaces/type.interface';

import { AnyFunction } from '../core';

/**
 * Represents a factory configuration object for creating a dynamic module.
 * Used to construct modules dynamically with flexible importing and dependency injection options.
 *
 * @template T The type of the module or service being created by the factory.
 *
 * @property {Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference>} [imports]
 * Optionally specifies the modules or references to be imported into the dynamic module. These can
 * include other modules, promises resolving to modules, or forward references.
 *
 * @property {AnyFunction<Promise<T> | T>} useFactory
 * A factory function responsible for creating an instance of type `T`.
 * The function can be synchronous or asynchronous (returning a promise).
 *
 * @property {Array<InjectionToken | OptionalFactoryDependency>} [inject]
 * Optionally specifies an array of dependencies to be injected into the factory function. These
 * dependencies are resolved from the dependency injection container.
 *
 * @property {boolean} [global]
 * Optionally marks the dynamic module as global, meaning its providers would be available across
 * the entire application scope.
 */
export type DynamicModuleFabric<T> = {
  imports?: (Type | DynamicModule | Promise<DynamicModule> | ForwardReference)[];
  useFactory: AnyFunction<Promise<T> | T>;
  inject?: (InjectionToken | OptionalFactoryDependency)[];
  global?: boolean;
};
