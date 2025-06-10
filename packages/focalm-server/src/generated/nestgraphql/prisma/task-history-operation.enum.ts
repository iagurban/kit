import { registerEnumType } from '@nestjs/graphql';

export enum TaskHistoryOperation {
  Set = 'Set',
  Add = 'Add',
  Remove = 'Remove',
}

registerEnumType(TaskHistoryOperation, { name: 'TaskHistoryOperation', description: undefined });
