import { registerEnumType } from '@nestjs/graphql';

export enum UserInProjectScalarFieldEnum {
  userId = 'userId',
  projectId = 'projectId',
  permission = 'permission',
  kind = 'kind',
}

registerEnumType(UserInProjectScalarFieldEnum, {
  name: 'UserInProjectScalarFieldEnum',
  description: undefined,
});
