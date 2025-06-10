import { registerEnumType } from '@nestjs/graphql';

export enum UserInTaskTagScalarFieldEnum {
  userInTaskId = 'userInTaskId',
  tag = 'tag',
}

registerEnumType(UserInTaskTagScalarFieldEnum, {
  name: 'UserInTaskTagScalarFieldEnum',
  description: undefined,
});
