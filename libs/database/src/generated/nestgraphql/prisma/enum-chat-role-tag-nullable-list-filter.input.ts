import { Field, InputType } from '@nestjs/graphql';

import { ChatRoleTag } from './chat-role-tag.enum';

@InputType()
export class EnumChatRoleTagNullableListFilter {
  @Field(() => [ChatRoleTag], { nullable: true })
  equals?: Array<`${ChatRoleTag}`>;

  @Field(() => ChatRoleTag, { nullable: true })
  has?: `${ChatRoleTag}`;

  @Field(() => [ChatRoleTag], { nullable: true })
  hasEvery?: Array<`${ChatRoleTag}`>;

  @Field(() => [ChatRoleTag], { nullable: true })
  hasSome?: Array<`${ChatRoleTag}`>;

  @Field(() => Boolean, { nullable: true })
  isEmpty?: boolean;
}
