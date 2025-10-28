import { AnyFunction } from '@gurban/kit/utils/types';
import { Abstract, DynamicModule, ForwardReference, Provider, Type } from '@nestjs/common';

export type NestImportable = Type | DynamicModule | ForwardReference | Promise<DynamicModule>;

export type NestExportable =
  | DynamicModule
  | string
  | symbol
  | Provider
  | ForwardReference
  | Abstract<unknown>
  | AnyFunction;
