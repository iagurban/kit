import { registerEnumType } from '@nestjs/graphql';

export enum ChatScalarFieldEnum {
  id = 'id',
  title = 'title',
  bio = 'bio',
  avatar = 'avatar',
  ownerId = 'ownerId',
  defaultRoleId = 'defaultRoleId',
}

registerEnumType(ChatScalarFieldEnum, { name: 'ChatScalarFieldEnum', description: undefined });
