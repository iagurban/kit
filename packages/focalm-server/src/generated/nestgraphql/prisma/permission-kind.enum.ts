import { registerEnumType } from '@nestjs/graphql';

export enum PermissionKind {
  read = 'read',
  update = 'update',
  create = 'create',
  'delete' = 'delete',
}

registerEnumType(PermissionKind, { name: 'PermissionKind', description: undefined });
