import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatCreateManyOwnerInputEnvelope } from './chat-create-many-owner-input-envelope.input';
import { ChatCreateOrConnectWithoutOwnerInput } from './chat-create-or-connect-without-owner.input';
import { ChatCreateWithoutOwnerInput } from './chat-create-without-owner.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateNestedManyWithoutOwnerInput {
  @Field(() => [ChatCreateWithoutOwnerInput], { nullable: true })
  @Type(() => ChatCreateWithoutOwnerInput)
  create?: Array<ChatCreateWithoutOwnerInput>;

  @Field(() => [ChatCreateOrConnectWithoutOwnerInput], { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutOwnerInput)
  connectOrCreate?: Array<ChatCreateOrConnectWithoutOwnerInput>;

  @Field(() => ChatCreateManyOwnerInputEnvelope, { nullable: true })
  @Type(() => ChatCreateManyOwnerInputEnvelope)
  createMany?: ChatCreateManyOwnerInputEnvelope;

  @Field(() => [ChatWhereUniqueInput], { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ChatWhereUniqueInput, 'id'>>;
}
