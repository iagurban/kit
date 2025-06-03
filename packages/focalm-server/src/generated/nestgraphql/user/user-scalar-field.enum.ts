import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
  id = 'id',
  createdAt = 'createdAt',
  email = 'email',
  name = 'name',
  passwordHash = 'passwordHash',
}

registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined });
