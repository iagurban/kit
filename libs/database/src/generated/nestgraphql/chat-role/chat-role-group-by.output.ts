import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatRoleTag } from '../prisma/chat-role-tag.enum';
import { ChatRoleCountAggregate } from './chat-role-count-aggregate.output';
import { ChatRoleMaxAggregate } from './chat-role-max-aggregate.output';
import { ChatRoleMinAggregate } from './chat-role-min-aggregate.output';

@ObjectType()
export class ChatRoleGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [ChatRoleTag], { nullable: true })
  tags?: Array<`${ChatRoleTag}`>;

  @Field(() => GraphQLJSON, { nullable: false })
  permissions!: any;

  @Field(() => ChatRoleCountAggregate, { nullable: true })
  _count?: ChatRoleCountAggregate;

  @Field(() => ChatRoleMinAggregate, { nullable: true })
  _min?: ChatRoleMinAggregate;

  @Field(() => ChatRoleMaxAggregate, { nullable: true })
  _max?: ChatRoleMaxAggregate;
}
