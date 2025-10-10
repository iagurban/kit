import { Field, InputType } from '@nestjs/graphql';

import { UserChatPermissionsWhereInput } from './user-chat-permissions-where.input';

@InputType()
export class UserChatPermissionsListRelationFilter {
  @Field(() => UserChatPermissionsWhereInput, { nullable: true })
  every?: UserChatPermissionsWhereInput;

  @Field(() => UserChatPermissionsWhereInput, { nullable: true })
  some?: UserChatPermissionsWhereInput;

  @Field(() => UserChatPermissionsWhereInput, { nullable: true })
  none?: UserChatPermissionsWhereInput;
}
