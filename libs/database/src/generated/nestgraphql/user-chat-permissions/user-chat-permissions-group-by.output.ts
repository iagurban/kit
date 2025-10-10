import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { UserChatPermissionsCountAggregate } from './user-chat-permissions-count-aggregate.output';
import { UserChatPermissionsMaxAggregate } from './user-chat-permissions-max-aggregate.output';
import { UserChatPermissionsMinAggregate } from './user-chat-permissions-min-aggregate.output';

@ObjectType()
export class UserChatPermissionsGroupBy {
  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: true })
  roleId?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;

  @Field(() => UserChatPermissionsCountAggregate, { nullable: true })
  _count?: UserChatPermissionsCountAggregate;

  @Field(() => UserChatPermissionsMinAggregate, { nullable: true })
  _min?: UserChatPermissionsMinAggregate;

  @Field(() => UserChatPermissionsMaxAggregate, { nullable: true })
  _max?: UserChatPermissionsMaxAggregate;
}
