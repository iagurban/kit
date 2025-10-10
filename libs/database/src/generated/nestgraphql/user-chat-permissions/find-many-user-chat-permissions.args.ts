import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserChatPermissionsOrderByWithRelationInput } from './user-chat-permissions-order-by-with-relation.input';
import { UserChatPermissionsScalarFieldEnum } from './user-chat-permissions-scalar-field.enum';
import { UserChatPermissionsWhereInput } from './user-chat-permissions-where.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@ArgsType()
export class FindManyUserChatPermissionsArgs {
  @Field(() => UserChatPermissionsWhereInput, { nullable: true })
  @Type(() => UserChatPermissionsWhereInput)
  where?: UserChatPermissionsWhereInput;

  @Field(() => [UserChatPermissionsOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UserChatPermissionsOrderByWithRelationInput>;

  @Field(() => UserChatPermissionsWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [UserChatPermissionsScalarFieldEnum], { nullable: true })
  distinct?: Array<`${UserChatPermissionsScalarFieldEnum}`>;
}
