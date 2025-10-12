import { DynamicModule, ForwardReference, Type } from '@nestjs/common';

export type NestImportable = Type | DynamicModule | ForwardReference | Promise<DynamicModule>;
