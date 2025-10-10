import { registerEnumType } from '@nestjs/graphql';

export enum ChatRoleScalarFieldEnum {
  id = 'id',
  chatId = 'chatId',
  name = 'name',
  tags = 'tags',
  permissions = 'permissions',
}

registerEnumType(ChatRoleScalarFieldEnum, { name: 'ChatRoleScalarFieldEnum', description: undefined });
