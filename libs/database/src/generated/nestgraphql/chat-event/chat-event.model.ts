import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { Chat } from '../chat/chat.model';
import { User } from '../user/user.model';

@ObjectType()
export class ChatEvent {
  @Field(() => ID, { nullable: false })
  id!: bigint;

  @Field(() => String, { nullable: false })
  nn!: bigint;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => String, { nullable: false })
  type!: string;

  @Field(() => GraphQLJSON, { nullable: false })
  payload!: any;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Chat, { nullable: false })
  chat?: Chat;

  @Field(() => User, { nullable: false })
  author?: User;
}
