import { registerEnumType } from '@nestjs/graphql';

export enum UserInTaskTagScalarFieldEnum {
  userInTaskId = 'userInTaskId',
  roleId = 'roleId',
}

registerEnumType(UserInTaskTagScalarFieldEnum, {
  name: 'UserInTaskTagScalarFieldEnum',
  description: undefined,
});
