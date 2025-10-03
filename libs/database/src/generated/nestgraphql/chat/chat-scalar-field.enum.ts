import { registerEnumType } from '@nestjs/graphql';

export enum ChatScalarFieldEnum {
  id = 'id',
  title = 'title',
  bio = 'bio',
  avatar = 'avatar',
}

registerEnumType(ChatScalarFieldEnum, { name: 'ChatScalarFieldEnum', description: undefined });
