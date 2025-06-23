import { registerEnumType } from '@nestjs/graphql';

export enum TaskToTaskRelationTypeScalarFieldEnum {
  id = 'id',
  forward = 'forward',
  inverse = 'inverse',
  projectId = 'projectId',
}

registerEnumType(TaskToTaskRelationTypeScalarFieldEnum, {
  name: 'TaskToTaskRelationTypeScalarFieldEnum',
  description: undefined,
});
