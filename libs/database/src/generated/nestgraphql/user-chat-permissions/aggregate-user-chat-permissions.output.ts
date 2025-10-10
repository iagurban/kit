import { Field, ObjectType } from '@nestjs/graphql';

import { UserChatPermissionsCountAggregate } from './user-chat-permissions-count-aggregate.output';
import { UserChatPermissionsMaxAggregate } from './user-chat-permissions-max-aggregate.output';
import { UserChatPermissionsMinAggregate } from './user-chat-permissions-min-aggregate.output';

@ObjectType()
export class AggregateUserChatPermissions {
  @Field(() => UserChatPermissionsCountAggregate, { nullable: true })
  _count?: UserChatPermissionsCountAggregate;

  @Field(() => UserChatPermissionsMinAggregate, { nullable: true })
  _min?: UserChatPermissionsMinAggregate;

  @Field(() => UserChatPermissionsMaxAggregate, { nullable: true })
  _max?: UserChatPermissionsMaxAggregate;
}
