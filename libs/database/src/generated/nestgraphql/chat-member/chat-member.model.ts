import { Field, ObjectType } from '@nestjs/graphql';

import { Chat } from '../chat/chat.model';
import { User } from '../user/user.model';

@ObjectType()
export class ChatMember {
  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => Date, { nullable: false })
  joinedAt!: Date;

  @Field(() => User, { nullable: false })
  user?: User;

  @Field(() => Chat, { nullable: false })
  chat?: Chat;
}
