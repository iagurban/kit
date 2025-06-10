import { registerEnumType } from '@nestjs/graphql';

export enum UserInTaskScalarFieldEnum {
  id = 'id',
  userId = 'userId',
  taskId = 'taskId',
}

registerEnumType(UserInTaskScalarFieldEnum, { name: 'UserInTaskScalarFieldEnum', description: undefined });
