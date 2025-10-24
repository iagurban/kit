import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateManyOwnerInputEnvelope } from './chat-create-many-owner-input-envelope.input';
import { ChatCreateOrConnectWithoutOwnerInput } from './chat-create-or-connect-without-owner.input';
import { ChatCreateWithoutOwnerInput } from './chat-create-without-owner.input';
import { ChatScalarWhereInput } from './chat-scalar-where.input';
import { ChatUpdateManyWithWhereWithoutOwnerInput } from './chat-update-many-with-where-without-owner.input';
import { ChatUpdateWithWhereUniqueWithoutOwnerInput } from './chat-update-with-where-unique-without-owner.input';
import { ChatUpsertWithWhereUniqueWithoutOwnerInput } from './chat-upsert-with-where-unique-without-owner.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUncheckedUpdateManyWithoutOwnerNestedInput {
  @Field(() => [ChatCreateWithoutOwnerInput], { nullable: true })
  @Type(() => ChatCreateWithoutOwnerInput)
  create?: Array<ChatCreateWithoutOwnerInput>;

  @Field(() => [ChatCreateOrConnectWithoutOwnerInput], { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutOwnerInput)
  connectOrCreate?: Array<ChatCreateOrConnectWithoutOwnerInput>;

  @Field(() => [ChatUpsertWithWhereUniqueWithoutOwnerInput], { nullable: true })
  @Type(() => ChatUpsertWithWhereUniqueWithoutOwnerInput)
  upsert?: Array<ChatUpsertWithWhereUniqueWithoutOwnerInput>;

  @Field(() => ChatCreateManyOwnerInputEnvelope, { nullable: true })
  @Type(() => ChatCreateManyOwnerInputEnvelope)
  createMany?: ChatCreateManyOwnerInputEnvelope;

  @Field(() => [ChatWhereUniqueInput], { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  set?: Array<Prisma.AtLeast<ChatWhereUniqueInput, 'id'>>;

  @Field(() => [ChatWhereUniqueInput], { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<ChatWhereUniqueInput, 'id'>>;

  @Field(() => [ChatWhereUniqueInput], { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<ChatWhereUniqueInput, 'id'>>;

  @Field(() => [ChatWhereUniqueInput], { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ChatWhereUniqueInput, 'id'>>;

  @Field(() => [ChatUpdateWithWhereUniqueWithoutOwnerInput], { nullable: true })
  @Type(() => ChatUpdateWithWhereUniqueWithoutOwnerInput)
  update?: Array<ChatUpdateWithWhereUniqueWithoutOwnerInput>;

  @Field(() => [ChatUpdateManyWithWhereWithoutOwnerInput], { nullable: true })
  @Type(() => ChatUpdateManyWithWhereWithoutOwnerInput)
  updateMany?: Array<ChatUpdateManyWithWhereWithoutOwnerInput>;

  @Field(() => [ChatScalarWhereInput], { nullable: true })
  @Type(() => ChatScalarWhereInput)
  deleteMany?: Array<ChatScalarWhereInput>;
}
