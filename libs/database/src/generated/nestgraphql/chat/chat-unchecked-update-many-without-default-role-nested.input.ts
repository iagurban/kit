import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatCreateManyDefaultRoleInputEnvelope } from './chat-create-many-default-role-input-envelope.input';
import { ChatCreateOrConnectWithoutDefaultRoleInput } from './chat-create-or-connect-without-default-role.input';
import { ChatCreateWithoutDefaultRoleInput } from './chat-create-without-default-role.input';
import { ChatScalarWhereInput } from './chat-scalar-where.input';
import { ChatUpdateManyWithWhereWithoutDefaultRoleInput } from './chat-update-many-with-where-without-default-role.input';
import { ChatUpdateWithWhereUniqueWithoutDefaultRoleInput } from './chat-update-with-where-unique-without-default-role.input';
import { ChatUpsertWithWhereUniqueWithoutDefaultRoleInput } from './chat-upsert-with-where-unique-without-default-role.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUncheckedUpdateManyWithoutDefaultRoleNestedInput {
  @Field(() => [ChatCreateWithoutDefaultRoleInput], { nullable: true })
  @Type(() => ChatCreateWithoutDefaultRoleInput)
  create?: Array<ChatCreateWithoutDefaultRoleInput>;

  @Field(() => [ChatCreateOrConnectWithoutDefaultRoleInput], { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutDefaultRoleInput)
  connectOrCreate?: Array<ChatCreateOrConnectWithoutDefaultRoleInput>;

  @Field(() => [ChatUpsertWithWhereUniqueWithoutDefaultRoleInput], { nullable: true })
  @Type(() => ChatUpsertWithWhereUniqueWithoutDefaultRoleInput)
  upsert?: Array<ChatUpsertWithWhereUniqueWithoutDefaultRoleInput>;

  @Field(() => ChatCreateManyDefaultRoleInputEnvelope, { nullable: true })
  @Type(() => ChatCreateManyDefaultRoleInputEnvelope)
  createMany?: ChatCreateManyDefaultRoleInputEnvelope;

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

  @Field(() => [ChatUpdateWithWhereUniqueWithoutDefaultRoleInput], { nullable: true })
  @Type(() => ChatUpdateWithWhereUniqueWithoutDefaultRoleInput)
  update?: Array<ChatUpdateWithWhereUniqueWithoutDefaultRoleInput>;

  @Field(() => [ChatUpdateManyWithWhereWithoutDefaultRoleInput], { nullable: true })
  @Type(() => ChatUpdateManyWithWhereWithoutDefaultRoleInput)
  updateMany?: Array<ChatUpdateManyWithWhereWithoutDefaultRoleInput>;

  @Field(() => [ChatScalarWhereInput], { nullable: true })
  @Type(() => ChatScalarWhereInput)
  deleteMany?: Array<ChatScalarWhereInput>;
}
