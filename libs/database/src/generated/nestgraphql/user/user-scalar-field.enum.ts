import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
  id = 'id',
  createdAt = 'createdAt',
  email = 'email',
  name = 'name',
  abbrev = 'abbrev',
}

registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined });
