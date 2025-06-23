import { registerEnumType } from '@nestjs/graphql';

export enum PermissionInProject {
  tasks = 'tasks',
  participants = 'participants',
}

registerEnumType(PermissionInProject, { name: 'PermissionInProject', description: undefined });
