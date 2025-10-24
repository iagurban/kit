import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateOrConnectWithoutMembersInput } from './chat-create-or-connect-without-members.input';
import { ChatCreateWithoutMembersInput } from './chat-create-without-members.input';
import { ChatUpdateToOneWithWhereWithoutMembersInput } from './chat-update-to-one-with-where-without-members.input';
import { ChatUpsertWithoutMembersInput } from './chat-upsert-without-members.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUpdateOneRequiredWithoutMembersNestedInput {
  @Field(() => ChatCreateWithoutMembersInput, { nullable: true })
  @Type(() => ChatCreateWithoutMembersInput)
  create?: ChatCreateWithoutMembersInput;

  @Field(() => ChatCreateOrConnectWithoutMembersInput, { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutMembersInput)
  connectOrCreate?: ChatCreateOrConnectWithoutMembersInput;

  @Field(() => ChatUpsertWithoutMembersInput, { nullable: true })
  @Type(() => ChatUpsertWithoutMembersInput)
  upsert?: ChatUpsertWithoutMembersInput;

  @Field(() => ChatWhereUniqueInput, { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatUpdateToOneWithWhereWithoutMembersInput, { nullable: true })
  @Type(() => ChatUpdateToOneWithWhereWithoutMembersInput)
  update?: ChatUpdateToOneWithWhereWithoutMembersInput;
}
