import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
  id = 'id',
  createdAt = 'createdAt',
  email = 'email',
  name = 'name',
  abbrev = 'abbrev',
  passwordHash = 'passwordHash',
  ownProjectId = 'ownProjectId',
}

registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined });
