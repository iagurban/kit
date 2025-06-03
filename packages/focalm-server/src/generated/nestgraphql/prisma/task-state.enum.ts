import { registerEnumType } from '@nestjs/graphql';

export enum TaskState {
  Pending = 'Pending',
  Active = 'Active',
  Done = 'Done',
}

registerEnumType(TaskState, { name: 'TaskState', description: undefined });
