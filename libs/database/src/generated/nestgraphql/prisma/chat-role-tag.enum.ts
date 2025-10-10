import { registerEnumType } from '@nestjs/graphql';

export enum ChatRoleTag {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER',
  BANNED = 'BANNED',
}

registerEnumType(ChatRoleTag, { name: 'ChatRoleTag', description: undefined });
