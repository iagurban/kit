import { registerEnumType } from '@nestjs/graphql';

export enum TaskToTaskRelationScalarFieldEnum {
  srcId = 'srcId',
  dstId = 'dstId',
  typeId = 'typeId',
}

registerEnumType(TaskToTaskRelationScalarFieldEnum, {
  name: 'TaskToTaskRelationScalarFieldEnum',
  description: undefined,
});
