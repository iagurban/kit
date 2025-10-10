import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatRoleCreateOrConnectWithoutUserPermissionsInput } from './chat-role-create-or-connect-without-user-permissions.input';
import { ChatRoleCreateWithoutUserPermissionsInput } from './chat-role-create-without-user-permissions.input';
import { ChatRoleUpdateToOneWithWhereWithoutUserPermissionsInput } from './chat-role-update-to-one-with-where-without-user-permissions.input';
import { ChatRoleUpsertWithoutUserPermissionsInput } from './chat-role-upsert-without-user-permissions.input';
import { ChatRoleWhereInput } from './chat-role-where.input';
import { ChatRoleWhereUniqueInput } from './chat-role-where-unique.input';

@InputType()
export class ChatRoleUpdateOneWithoutUserPermissionsNestedInput {
  @Field(() => ChatRoleCreateWithoutUserPermissionsInput, { nullable: true })
  @Type(() => ChatRoleCreateWithoutUserPermissionsInput)
  create?: ChatRoleCreateWithoutUserPermissionsInput;

  @Field(() => ChatRoleCreateOrConnectWithoutUserPermissionsInput, { nullable: true })
  @Type(() => ChatRoleCreateOrConnectWithoutUserPermissionsInput)
  connectOrCreate?: ChatRoleCreateOrConnectWithoutUserPermissionsInput;

  @Field(() => ChatRoleUpsertWithoutUserPermissionsInput, { nullable: true })
  @Type(() => ChatRoleUpsertWithoutUserPermissionsInput)
  upsert?: ChatRoleUpsertWithoutUserPermissionsInput;

  @Field(() => ChatRoleWhereInput, { nullable: true })
  @Type(() => ChatRoleWhereInput)
  disconnect?: ChatRoleWhereInput;

  @Field(() => ChatRoleWhereInput, { nullable: true })
  @Type(() => ChatRoleWhereInput)
  delete?: ChatRoleWhereInput;

  @Field(() => ChatRoleWhereUniqueInput, { nullable: true })
  @Type(() => ChatRoleWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>;

  @Field(() => ChatRoleUpdateToOneWithWhereWithoutUserPermissionsInput, { nullable: true })
  @Type(() => ChatRoleUpdateToOneWithWhereWithoutUserPermissionsInput)
  update?: ChatRoleUpdateToOneWithWhereWithoutUserPermissionsInput;
}
