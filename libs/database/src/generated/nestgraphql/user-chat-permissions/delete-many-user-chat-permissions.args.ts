import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserChatPermissionsWhereInput } from './user-chat-permissions-where.input';

@ArgsType()
export class DeleteManyUserChatPermissionsArgs {
  @Field(() => UserChatPermissionsWhereInput, { nullable: true })
  @Type(() => UserChatPermissionsWhereInput)
  where?: UserChatPermissionsWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
